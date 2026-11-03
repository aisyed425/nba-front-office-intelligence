
from pathlib import Path
import pandas as pd

ROOT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT_DIR / "data" / "processed"

DATA_URL = (
    "https://raw.githubusercontent.com/"
    "suren504/surennba_stats/main/data/player_stats/"
    "2025-26NBA_RegularSeason_Player_stats.csv"
)

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Downloading NBA player statistics...")

    players = pd.read_csv(DATA_URL)

    output_file = OUTPUT_DIR / "player_stats_2025_26.csv"
    players.to_csv(output_file, index=False)

    print("\nDownload successful!")
    print(f"Players/rows: {len(players)}")
    print(f"Columns: {len(players.columns)}")
    print(f"Saved to: {output_file}")

    print("\nAvailable columns:")
    print(players.columns.tolist())

    print("\nFirst 5 rows:")
    print(players.head().to_string(index=False))


if __name__ == "__main__":
    main()
