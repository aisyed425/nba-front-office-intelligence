
from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException

ROOT_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = (
    ROOT_DIR
    / "data"
    / "processed"
    / "cleaned_player_stats_2025_26.csv"
)

app = FastAPI(
    title="NBA Front Office Intelligence API",
    description="Basketball analytics and player evaluation API",
    version="1.0.0",
)

players_df = pd.read_csv(DATA_FILE)

def clean_records(df):
    clean_df = df.astype(object).where(pd.notna(df), None)
    return clean_df.to_dict(orient="records")


@app.get("/")
def home():
    return {
        "message": "NBA Front Office Intelligence API is running"
    }


@app.get("/players")
def get_players(
    search: str | None = None,
    team: str | None = None,
    limit: int = 50,
):
    df = players_df.copy()

    if search:
        df = df[
            df["name"].str.contains(
                search, case=False, na=False
            )
        ]

    if team:
        df = df[
            df["teamabbreviation"].str.upper()
            == team.upper()
        ]

    df = df.head(max(1, min(limit, 500)))

    return clean_records(df)


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

    return player.iloc[0].to_dict()


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

    if category not in allowed_categories:
        raise HTTPException(
            status_code=400,
            detail="Invalid leaderboard category",
        )

    if category not in players_df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"{category} is not available",
        )

    df = players_df.sort_values(
        category, ascending=False
    ).head(max(1, min(limit, 100)))

    return df[
        ["name", "teamabbreviation", category]
    ].to_dict(orient="records")

