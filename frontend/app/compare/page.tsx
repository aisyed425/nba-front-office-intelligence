
"use client";

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
  <p className="mt-4 text-center text-green-400">
    Successfully compared {comparison.player1.name} and {comparison.player2.name}!
  </p>
)}
          </>
        )}
      </div>
    </main>
  );
}
