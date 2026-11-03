
from pathlib import Path
import pandas as pd

ROOT_DIR = Path(__file__).resolve().parents[1]

INPUT_FILE = ROOT_DIR / "data" / "processed" / "player_stats_2025_26.csv"
OUTPUT_FILE = ROOT_DIR / "data" / "processed" / "cleaned_player_stats_2025_26.csv"


def main():
    print("Loading NBA dataset...")

    df = pd.read_csv(INPUT_FILE)

    # Keep the columns needed for our initial analytics platform.
    columns = [
        "entityid",
        "name",
        "teamabbreviation",
        "gamesplayed",
        "minutes",
        "points",
        "rebounds",
        "offrebounds",
        "defrebounds",
        "assists",
        "steals",
        "blocks",
        "turnovers",
        "fg3m",
        "fg3a",
        "fta",
        "tspct",
        "efgpct",
        "fg3pct",
        "usage",
        "onoffrtg",
        "ondefrtg",
        "assisted3spct",
        "atrimfrequency",
        "corner3frequency",
        "arc3frequency",
    ]

    df = df[columns].copy()

    # Remove records without meaningful playing time.
    df = df[df["gamesplayed"] > 0]
    df = df[df["minutes"] > 0]

    # Calculate per-game statistics.
    per_game_columns = [
        "points",
        "rebounds",
        "offrebounds",
        "defrebounds",
        "assists",
        "steals",
        "blocks",
        "turnovers",
        "minutes",
    ]

    for column in per_game_columns:
        df[f"{column}_per_game"] = (
            df[column] / df["gamesplayed"]
        )

    # Convert percentage-style metrics to readable percentages.
    percentage_columns = [
        "tspct",
        "efgpct",
        "fg3pct",
        "usage",
        "assisted3spct",
        "atrimfrequency",
        "corner3frequency",
        "arc3frequency",
    ]

    for column in percentage_columns:
        df[column] = df[column] * 100

    df = df.drop_duplicates(subset=["entityid"])

    df = df.sort_values(
        by="points_per_game",
        ascending=False
    )

    df.to_csv(OUTPUT_FILE, index=False)

    print("\nDataset preparation successful!")
    print(f"Players: {len(df)}")
    print(f"Columns: {len(df.columns)}")
    print(f"Saved to: {OUTPUT_FILE}")

    print("\nTop 10 scorers:")
    print(
        df[["name", "teamabbreviation", "points_per_game",
            "rebounds_per_game", "assists_per_game"]]
        .head(10)
        .to_string(index=False)
    )


if __name__ == "__main__":
    main()
