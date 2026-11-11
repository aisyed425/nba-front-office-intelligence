
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

function formatNumber(value: number | undefined, decimals = 1) {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return "N/A";
  }

  return value.toFixed(decimals);
}

function formatPercent(value: number | undefined) {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return "N/A";
  }

  return `${(value <= 1 ? value * 100 : value).toFixed(1)}%`;
}

function PlayerProfileContent() {
  const params = useParams();
  const playerId = params.playerId as string;

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPlayer() {
      setLoading(true);
      setError("");
      setPlayer(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/players/${playerId}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Could not find this player."
              : "Unable to retrieve player data."
          );
        }

        const data: Player = await response.json();

        if (!data || !data.entityid || !data.name) {
          throw new Error("Invalid player data received.");
        }

        if (!cancelled) {
          setPlayer(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (playerId) {
      fetchPlayer();
    } else {
      setError("Invalid player ID.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [playerId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1020] p-8 text-white">
        <p className="text-slate-400">Loading player profile...</p>
      </main>
    );
  }

  if (error || !player) {
    return (
      <main className="min-h-screen bg-[#0a1020] p-8 text-white">
        <p className="text-red-400">
          {error || "Player not found."}
        </p>

        <a
          href="/players"
          className="mt-4 inline-block text-blue-400 hover:text-blue-300"
        >
          ← Back to Player Analytics
        </a>
      </main>
    );
  }

  const stats = [
    { label: "Points", value: formatNumber(player.points_per_game) },
    { label: "Rebounds", value: formatNumber(player.rebounds_per_game) },
    { label: "Assists", value: formatNumber(player.assists_per_game) },
    { label: "Steals", value: formatNumber(player.steals_per_game) },
    { label: "Blocks", value: formatNumber(player.blocks_per_game) },
    { label: "Turnovers", value: formatNumber(player.turnovers_per_game) },
  ];

  const shootingStats = [
    { label: "True Shooting %", value: formatPercent(player.tspct) },
    { label: "Effective FG %", value: formatPercent(player.efgpct) },
    { label: "3-Point %", value: formatPercent(player.fg3pct) },
    { label: "Usage Rate", value: formatPercent(player.usage) },
  ];

  return (
    <main className="min-h-screen bg-[#0a1020] p-6 text-white md:p-10">
      <div className="mx-auto max-w-6xl">
        <a
          href="/players"
          className="mb-8 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to Player Analytics
        </a>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-[#111b2c] p-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-400">
            Player Profile
          </p>

          <h1 className="text-4xl font-bold">{player.name}</h1>

          <p className="mt-2 text-lg text-slate-400">
            {player.teamabbreviation}
          </p>

          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-slate-400">Games Played</p>
              <p className="text-2xl font-semibold">
                {player.gamesplayed}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Minutes Per Game</p>
              <p className="text-2xl font-semibold">
                {formatNumber(player.minutes_per_game)}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">
            Per-Game Statistics
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-[#111b2c] p-5"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">
            Shooting and Advanced Statistics
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shootingStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-[#111b2c] p-5"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
export default function PlayerProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0a1020] p-8 text-white">
          Loading player profile...
        </main>
      }
    >
      <PlayerProfileContent />
    </Suspense>
  );
}
