
from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException


# --------------------------------------------------
# 1. DATASET CONFIGURATION
# --------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parents[1]

DATA_FILE = (
    ROOT_DIR
    / "data"
    / "processed"
    / "cleaned_player_stats_2025_26.csv"
)


# --------------------------------------------------
# 2. FASTAPI INITIALIZATION
# --------------------------------------------------

app = FastAPI(
    title="NBA Front Office Intelligence API",
    description="Basketball analytics and player evaluation API",
    version="1.0.0",
)


# Load player statistics
players_df = pd.read_csv(DATA_FILE)


# --------------------------------------------------
# 3. HELPER FUNCTIONS
# --------------------------------------------------

def clean_records(df):
    """
    Converts pandas DataFrame records into JSON-safe dictionaries.
    Replaces missing values (NaN) with None.
    """
    clean_df = df.astype(object).where(pd.notna(df), None)
    return clean_df.to_dict(orient="records")


# --------------------------------------------------
# 4. HOME / HEALTH CHECK
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "NBA Front Office Intelligence API is running"
    }


# --------------------------------------------------
# 5. PLAYER LISTING, SEARCH AND FILTERING
# --------------------------------------------------

@app.get("/players")
def get_players(
    search: str | None = None,
    team: str | None = None,
    limit: int = 50,
):
    df = players_df.copy()

    # Search players by name
    if search:
        df = df[
            df["name"].str.contains(
                search, case=False, na=False
            )
        ]

    # Filter players by team
    if team:
        df = df[
            df["teamabbreviation"].str.upper()
            == team.upper()
        ]

    # Limit number of results
    df = df.head(max(1, min(limit, 500)))

    return clean_records(df)


# --------------------------------------------------
# 6. PLAYER COMPARISON
# --------------------------------------------------

@app.get("/players/compare")
def compare_players(
    player1: str,
    player2: str,
):
    # Find players using exact name matching
    def find_player(name):
        matches = players_df[
            players_df["name"].str.lower() == name.lower()
        ]

        if matches.empty:
            raise HTTPException(
                status_code=404,
                detail=f"Player not found: {name}",
            )

        if len(matches) > 1:
            raise HTTPException(
                status_code=400,
                detail=f"Multiple players found: {name}",
            )

        return matches.iloc[0]

    first = find_player(player1)
    second = find_player(player2)

    # Statistics to compare
    comparison_stats = [
        "points_per_game",
        "rebounds_per_game",
        "assists_per_game",
        "steals_per_game",
        "blocks_per_game",
        "tspct",
        "efgpct",
        "usage",
        "fg3pct",
    ]

    # Convert both players into JSON-safe records
    values = clean_records(
        pd.DataFrame([first, second])
    )

    # Build comparison response
    result = {
        "player1": {
            "name": first["name"],
            "team": first["teamabbreviation"],
        },
        "player2": {
            "name": second["name"],
            "team": second["teamabbreviation"],
        },
        "comparison": {},
    }

    # Add statistics to comparison
    for stat in comparison_stats:
        if stat in players_df.columns:
            result["comparison"][stat] = {
                "player1": values[0][stat],
                "player2": values[1][stat],
            }

    return result


# --------------------------------------------------
# 7. INDIVIDUAL PLAYER LOOKUP
# --------------------------------------------------

@app.get("/players/{player_id}")
def get_player(player_id: int):
    player = players_df[
        players_df["entityid"] == player_id
    ]

    if player.empty:
        raise HTTPException(
            status_code=404,
            detail="Player not found",
        )

    return clean_records(player)[0]


# --------------------------------------------------
# 8. STATISTICAL LEADERBOARDS
# --------------------------------------------------

@app.get("/analytics/leaderboards")
def get_leaderboard(
    category: str = "points_per_game",
    limit: int = 10,
):
    allowed_categories = [
        "points_per_game",
        "rebounds_per_game",
        "assists_per_game",
        "steals_per_game",
        "blocks_per_game",
    ]

    # Validate requested category
    if category not in allowed_categories:
        raise HTTPException(
            status_code=400,
            detail="Invalid leaderboard category",
        )

    # Verify category exists in dataset
    if category not in players_df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"{category} is not available",
        )

    # Sort players by requested statistic
    df = players_df.sort_values(
        category, ascending=False
    ).head(max(1, min(limit, 100)))

    return clean_records(
        df[["name", "teamabbreviation", category]]
    )
