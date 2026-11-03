
import requests

url = "https://stats.nba.com/stats/leaguedashplayerstats"

headers = {
    "Host": "stats.nba.com",
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.nba.com/",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://www.nba.com",
}

params = {
    "LeagueID": "00",
    "Season": "2025-26",
    "SeasonType": "Regular Season",
    "MeasureType": "Base",
    "PerMode": "PerGame",
}

try:
    response = requests.get(
        url,
        headers=headers,
        params=params,
        timeout=30
    )
    print("Status:", response.status_code)
    print("Response:", response.text[:500])
except requests.exceptions.RequestException as error:
    print("Connection failed:", error)
