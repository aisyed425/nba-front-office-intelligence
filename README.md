# NBA Front Office Intelligence

**AI-powered NBA analytics platform for player evaluation, performance prediction, game simulation, and basketball intelligence.**

Work in progress.

## Overview

A full-stack NBA analytics platform that combines statistical analysis, machine learning, and artificial intelligence to explore player performance, identify trends, and support data-driven basketball decisions.

### Planned Features

- **Player Performance Prediction**
  - Predict player statistics and performance using historical data.
  - Analyze trends and changes in player production.
  - Evaluate model accuracy against actual player performance.

- **Player Analytics**
  - Analyze traditional and advanced NBA statistics.
  - Compare players across multiple statistical categories.
  - Evaluate shooting efficiency, usage, and player tendencies.
  - Generate player profiles and statistical breakdowns.

- **Shot Chart Analysis**
  - Visualize player shooting locations and tendencies.
  - Analyze shooting efficiency across different areas of the court.
  - Identify strengths and weaknesses in shot selection.

- **Game Simulation**
  - Simulate NBA matchups using probabilistic models.
  - Estimate game outcomes based on team and player statistics.
  - Explore different scenarios and potential outcomes.

- **Player Similarity and Archetype Discovery**
  - Identify statistically similar players.
  - Apply machine learning to discover player archetypes.
  - Use clustering and statistical feature engineering to analyze playing styles.

- **AI Scouting Assistant**
  - Answer natural-language questions about NBA players and teams.
  - Generate data-grounded player comparisons and scouting reports.
  - Identify players matching specific statistical profiles.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

### Backend
- Python
- FastAPI
- PostgreSQL

### Machine Learning and Data Science
- PyTorch
- Pandas
- NumPy
- Scikit-learn

### Data Visualization
- Matplotlib
- Plotly
- Recharts

### AI Integration
- OpenAI API

## Data Sources

- [NBA Stats API](https://github.com/swar/nba_api)
- Basketball Reference datasets
- Kaggle NBA datasets
- Historical NBA player and team statistics

## Development Progress

### Completed
- [x] NBA player statistics ingestion.
- [x] Data cleaning and preprocessing.
- [x] FastAPI backend setup.
- [x] Player search and filtering.
- [x] Individual player lookup.
- [x] Statistical leaderboard endpoints.

### Upcoming
- [ ] Player comparison API.
- [ ] Advanced player analytics.
- [ ] Interactive frontend dashboard.
- [ ] Shot chart visualization.
- [ ] Player performance prediction models.
- [ ] Player similarity and archetype models.
- [ ] NBA game simulation.
- [ ] AI-powered scouting assistant.

## Project Structure

```text
nba-front-office-intelligence/
├── backend/
│   ├── main.py
│   ├── prepare_data.py
│   └── requirements.txt
├── scripts/
│   └── ingest_nba.py
├── data/
│   └── processed/
└── README.md
```

## Getting Started

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/nba-front-office-intelligence.git

cd nba-front-office-intelligence

python -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Launch the API:

```bash
uvicorn backend.main:app --reload
```

Access the interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

**Status:** Active development
