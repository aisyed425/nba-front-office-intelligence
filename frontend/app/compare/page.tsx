
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Player = {
  entityid: number;
  name: string;
  teamabbreviation: string;
};

type ComparisonResponse = {
  player1: {
    name: string;
    team: string;
  };
  player2: {
    name: string;
    team: string;
  };
  comparison: {
    [key: string]: {
      player1: number;
      player2: number;
    };
  };
};

function formatStat(value: number, isPercentage = false) {
  if (isPercentage) {
    const percentage = value > 1 ? value : value * 100;
    return `${percentage.toFixed(1)}%`;
  }

  return value.toFixed(1);
}

export default function ComparePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [search1, setSearch1] = useState("");
const [search2, setSearch2] = useState("");

const [showSuggestions1, setShowSuggestions1] = useState(false);
const [showSuggestions2, setShowSuggestions2] = useState(false);

const [comparison, setComparison] = useState<ComparisonResponse | null>(null);
const [comparing, setComparing] = useState(false);
const [compareError, setCompareError] = useState("");

const statGroups = [
  {
    title: "Per-Game Production",
    stats: [
      { key: "points_per_game", label: "Points Per Game", percentage: false },
      { key: "rebounds_per_game", label: "Rebounds Per Game", percentage: false },
      { key: "assists_per_game", label: "Assists Per Game", percentage: false },
      { key: "steals_per_game", label: "Steals Per Game", percentage: false },
      { key: "blocks_per_game", label: "Blocks Per Game", percentage: false },
    ],
  },
  {
    title: "Shooting Efficiency",
    stats: [
      { key: "fg3pct", label: "Three-Point Percentage", percentage: true },
      { key: "efgpct", label: "Effective Field Goal Percentage", percentage: true },
      { key: "tspct", label: "True Shooting Percentage", percentage: true },
    ],
  },
  {
    title: "Advanced Statistics",
    stats: [
      { key: "usage", label: "Usage Rate", percentage: true },
    ],
  },
];

const filteredPlayers1 = players.filter((player) =>
  player.name.toLowerCase().includes(search1.toLowerCase())
);

const filteredPlayers2 = players.filter((player) =>
  player.name.toLowerCase().includes(search2.toLowerCase())
);

async function handleCompare() {
  if (!player1 || !player2) {
    setCompareError("Please select both players.");
    return;
  }

  if (player1 === player2) {
    setCompareError("Please select two different players.");
    return;
  }

  setComparing(true);
  setCompareError("");
  setComparison(null);

  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/players/compare`
    );

    url.searchParams.set("player1", player1);
    url.searchParams.set("player2", player2);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Unable to compare players.");
    }

    const data: ComparisonResponse = await response.json();

    setComparison(data);
  } catch (err) {
    setCompareError(
      err instanceof Error ? err.message : "Something went wrong."
    );
  } finally {
    setComparing(false);
  }
}

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/players?limit=500`
        );

        if (!response.ok) {
          throw new Error("Unable to load players.");
        }

        const data: Player[] = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  
  return (
    <main className="min-h-screen bg-[#0a1020] p-6 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-400">
            NBA Analytics
          </p>

          <h1 className="text-3xl font-bold">
            Player Comparison
          </h1>

          <p className="mt-2 text-slate-400">
            Compare NBA players across production, shooting, and performance.
          </p>

          <nav className="mt-5 flex flex-wrap gap-3">
  <Link
    href="/"
    className="rounded-lg px-4 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
  >
    Overview
  </Link>

  <Link
    href="/players"
    className="rounded-lg px-4 py-2 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
  >
    Player Analytics
  </Link>

  <Link
    href="/compare"
    className="rounded-lg bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-400"
  >
    Player Comparison
  </Link>
</nav>
        </div>

        {loading && (
          <p className="text-slate-400">Loading players...</p>
        )}

        {error && (
          <p className="text-red-400">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Player 1 Selection */}
              <div className="rounded-xl border border-slate-800 bg-[#111b2c] p-6">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
                  Player 1
                </p>

                <div className="relative">
                  <input
                    type="text"
                    value={search1}
                    onChange={(e) => {
                      setSearch1(e.target.value);
                      setPlayer1("");
                      setShowSuggestions1(true);
                    }}
                    onFocus={() => setShowSuggestions1(true)}
                    placeholder="Search for a player..."
                    className="w-full rounded-lg border border-slate-700 bg-[#0a1020] p-3 text-white outline-none focus:border-blue-500"
                  />

                  {showSuggestions1 && search1 && (
                    <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-700 bg-[#111b2c] shadow-xl">
                      {filteredPlayers1.length > 0 ? (
                        filteredPlayers1.map((player) => (
                          <button
                            key={player.entityid}
                            type="button"
                            onClick={() => {
                              setPlayer1(player.name);
                              setSearch1(`${player.name} (${player.teamabbreviation})`);
                              setShowSuggestions1(false);
                            }}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white hover:bg-slate-800"
                          >
                            <span>{player.name}</span>
                            <span className="text-slate-400">
                              {player.teamabbreviation}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-slate-400">
                          No players found.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {player1 && (
                  <p className="mt-3 text-sm text-green-400">
                    Selected: {player1}
                  </p>
                )}
              </div>

              {/* Player 2 Selection */}
              <div className="rounded-xl border border-slate-800 bg-[#111b2c] p-6">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
                  Player 2
                </p>

                <div className="relative">
                  <input
                    type="text"
                    value={search2}
                    onChange={(e) => {
                      setSearch2(e.target.value);
                      setPlayer2("");
                      setShowSuggestions2(true);
                    }}
                    onFocus={() => setShowSuggestions2(true)}
                    placeholder="Search for a player..."
                    className="w-full rounded-lg border border-slate-700 bg-[#0a1020] p-3 text-white outline-none focus:border-blue-500"
                  />

                  {showSuggestions2 && search2 && (
                    <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-700 bg-[#111b2c] shadow-xl">
                      {filteredPlayers2.length > 0 ? (
                        filteredPlayers2.map((player) => (
                          <button
                            key={player.entityid}
                            type="button"
                            onClick={() => {
                              setPlayer2(player.name);
                              setSearch2(`${player.name} (${player.teamabbreviation})`);
                              setShowSuggestions2(false);
                            }}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white hover:bg-slate-800"
                          >
                            <span>{player.name}</span>
                            <span className="text-slate-400">
                              {player.teamabbreviation}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-slate-400">
                          No players found.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {player2 && (
                  <p className="mt-3 text-sm text-green-400">
                    Selected: {player2}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCompare}
                disabled={comparing || !player1 || !player2}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {comparing ? "Comparing..." : "Compare Players"}
              </button>
            </div>

            {compareError && (
              <p className="mt-4 text-center text-red-400">
                {compareError}
              </p>
            )}
            {comparison && (
  <div className="mt-12 space-y-8">
    {/* Player Headers */}
    <div className="grid grid-cols-2 gap-6">
      <div className="rounded-xl border border-blue-500/30 bg-[#111b2c] p-6 text-center">
        <p className="text-sm text-blue-400">
          {comparison.player1.team}
        </p>
        <h2 className="mt-2 text-xl font-bold">
          {comparison.player1.name}
        </h2>
      </div>

      <div className="rounded-xl border border-slate-700 bg-[#111b2c] p-6 text-center">
        <p className="text-sm text-slate-400">
          {comparison.player2.team}
        </p>
        <h2 className="mt-2 text-xl font-bold">
          {comparison.player2.name}
        </h2>
      </div>
    </div>

    {/* Statistical Comparisons */}
    {statGroups.map((group) => (
      <section
        key={group.title}
        className="rounded-xl border border-slate-800 bg-[#111b2c] p-6"
      >
        <h3 className="mb-6 text-lg font-semibold">
          {group.title}
        </h3>

        <div className="space-y-6">
          {group.stats.map((stat) => {
            const values = comparison.comparison[stat.key];

            if (!values) return null;

            const firstLeads = values.player1 > values.player2;
            const secondLeads = values.player2 > values.player1;

            return (
              <div key={stat.key}>
                <p className="mb-2 text-center text-sm text-slate-400">
                  {stat.label}
                </p>

                <div className="grid grid-cols-3 items-center gap-4">
                  <p
                    className={`text-right text-lg font-bold ${
                      firstLeads ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {formatStat(values.player1, stat.percentage)}
                  </p>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${
                          Math.max(values.player1, values.player2) > 0
                            ? (values.player1 /
                                Math.max(values.player1, values.player2)) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>

                  <p
                    className={`text-lg font-bold ${
                      secondLeads ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {formatStat(values.player2, stat.percentage)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    ))}
  </div>
)}
          </>
        )}
      </div>
    </main>
  );
}
