"use client";

import { useEffect, useState } from "react";

type Player = {
  entityid: number;
  name: string;
  teamabbreviation: string;
  gamesplayed: number;
  minutes_per_game: number;
  points_per_game: number;
  rebounds_per_game: number;
  assists_per_game: number;
  steals_per_game: number;
  blocks_per_game: number;
  turnovers_per_game: number;
  tspct: number;
  efgpct: number;
  fg3pct: number;
  usage: number;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlayers() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          limit: "500",
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (team.trim()) {
          params.set("team", team.trim());
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/players?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data: Player[] = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load players"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPlayers();
  }, [search, team]);

  return (
    <main className="min-h-screen bg-[#0a1020] text-slate-200">
      <header className="border-b border-white/[0.07] bg-[#0d1627] px-6 py-5">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs text-slate-500">
            NBA ANALYTICS / WORKSPACE
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            Player Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Search, explore, and evaluate NBA players.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] space-y-6 p-6 lg:p-9">
        <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
          <h2 className="font-semibold text-white">
            Player Database
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Search and filter the available player dataset.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Search player name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-white/[0.08] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Filter by team (e.g. LAL, BOS, OKC)"
              value={team}
              onChange={(e) => setTeam(e.target.value.toUpperCase())}
              className="rounded-lg border border-white/[0.08] bg-[#0a1020] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {loading ? "Loading players..." : `${players.length} players found`}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setTeam("");
              }}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111b2c]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-b border-white/[0.07] bg-white/[0.02]">
                <tr className="text-xs text-slate-500">
                  <th className="px-5 py-4 font-medium">PLAYER</th>
                  <th className="px-5 py-4 font-medium">TEAM</th>
                  <th className="px-5 py-4 font-medium">GP</th>
                  <th className="px-5 py-4 font-medium">PPG</th>
                  <th className="px-5 py-4 font-medium">RPG</th>
                  <th className="px-5 py-4 font-medium">APG</th>
                  <th className="px-5 py-4 font-medium">TS%</th>
                  <th className="px-5 py-4 font-medium">USG%</th>
                </tr>
              </thead>

              <tbody>
                {players.map((player) => (
                  <tr
                    key={player.entityid}
                    className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4">
  <a
    href={`/players/${player.entityid}`}
    className="font-medium text-white hover:text-blue-400 transition-colors"
  >
    {player.name}
  </a>
</td>
                    <td className="px-5 py-4 text-slate-400">
                      {player.teamabbreviation}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {player.gamesplayed}
                    </td>
                    <td className="px-5 py-4 font-semibold text-blue-400">
                      {player.points_per_game?.toFixed(1)}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {player.rebounds_per_game?.toFixed(1)}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {player.assists_per_game?.toFixed(1)}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {player.tspct?.toFixed(1)}%
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {player.usage?.toFixed(1)}%
                    </td>
                  </tr>
                ))}

                {!loading && players.length === 0 && !error && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-slate-500">
                      No players found.
                    </td>
                  </tr>
                )}

                {loading && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-slate-500">
                      Loading player database...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
