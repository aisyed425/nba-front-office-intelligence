
const players = [
  { rank: 1, name: "Luka Dončić", team: "LAL", ppg: 33.5, rpg: 7.7, apg: 8.3, ts: "61.6%" },
  { rank: 2, name: "Shai Gilgeous-Alexander", team: "OKC", ppg: 31.1, rpg: 4.3, apg: 6.6, ts: "66.4%" },
  { rank: 3, name: "Giannis Antetokounmpo", team: "MIL", ppg: 30.4, rpg: 11.9, apg: 6.5, ts: "64.2%" },
  { rank: 4, name: "Nikola Jokić", team: "DEN", ppg: 29.6, rpg: 12.8, apg: 10.2, ts: "66.8%" },
  { rank: 5, name: "Jayson Tatum", team: "BOS", ppg: 27.8, rpg: 8.7, apg: 5.6, ts: "60.1%" },
];

const navItems = [
  { icon: "▦", label: "Overview", active: true },
  { icon: "◎", label: "Player Analytics" },
  { icon: "⇄", label: "Player Comparison" },
  { icon: "⌖", label: "Shot Charts" },
  { icon: "◇", label: "Player Similarity" },
  { icon: "⌁", label: "Predictions" },
];

function MetricCard({
  label,
  value,
  change,
  description,
}: {
  label: string;
  value: string;
  change: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-2">
        <h3 className="text-3xl font-semibold tracking-tight text-white">{value}</h3>
        <span className="rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400">
          {change}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1020] text-slate-200">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] bg-[#0d1627] p-5 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white">
              NF
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-white">FRONT OFFICE</h1>
              <p className="text-xs text-slate-500">INTELLIGENCE</p>
            </div>
          </div>

          <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.2em] text-slate-500">
            WORKSPACE
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                  item.active
                    ? "bg-blue-500/15 font-medium text-blue-400"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-lg">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/[0.07] bg-[#111b2c] p-4">
            <p className="text-xs font-semibold text-white">NBA FRONT OFFICE AI</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Data-driven basketball intelligence for smarter decisions.
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-2/3 rounded-full bg-blue-500" />
            </div>
            <p className="mt-2 text-[10px] text-slate-500">
              Platform development in progress
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-5 lg:px-9">
            <div>
              <p className="text-xs text-slate-500">NBA ANALYTICS / WORKSPACE</p>
              <h2 className="mt-1 text-xl font-semibold text-white">League Overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg border border-white/[0.08] bg-[#111b2c] px-3 py-2 text-xs text-slate-400">
                2025–26 Season
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-300">
                NF
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-6 lg:p-9">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-blue-400">DASHBOARD</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                  League Intelligence
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  A data-driven view of the NBA landscape.
                </p>
              </div>
              <span className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-300">
                Preview · Sample UI data
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Players Tracked" value="500" change="Dataset" description="Players in the current dataset" />
              <MetricCard label="League Leader · PPG" value="33.5" change="Luka Dončić" description="Points per game" />
              <MetricCard label="League Leader · RPG" value="12.8" change="Nikola Jokić" description="Rebounds per game" />
              <MetricCard label="League Leader · APG" value="10.2" change="Nikola Jokić" description="Assists per game" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">Top Scorers</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      League leaders by points per game
                    </p>
                  </div>
                  <span className="rounded-md bg-white/[0.05] px-3 py-2 text-xs text-slate-400">
                    Regular Season
                  </span>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[570px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.07] text-xs text-slate-500">
                        <th className="pb-3 font-medium">RANK</th>
                        <th className="pb-3 font-medium">PLAYER</th>
                        <th className="pb-3 font-medium">PPG</th>
                        <th className="pb-3 font-medium">RPG</th>
                        <th className="pb-3 font-medium">APG</th>
                        <th className="pb-3 font-medium">TS%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player) => (
                        <tr key={player.rank} className="border-b border-white/[0.05] last:border-0">
                          <td className="py-4 text-slate-500">#{player.rank}</td>
                          <td className="py-4">
                            <div className="font-medium text-white">{player.name}</div>
                            <div className="mt-1 text-xs text-slate-500">{player.team}</div>
                          </td>
                          <td className="py-4 font-semibold text-blue-400">{player.ppg.toFixed(1)}</td>
                          <td className="py-4 text-slate-300">{player.rpg.toFixed(1)}</td>
                          <td className="py-4 text-slate-300">{player.apg.toFixed(1)}</td>
                          <td className="py-4 text-slate-300">{player.ts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
                <h3 className="font-semibold text-white">Scoring Distribution</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Illustrative points-per-game comparison
                </p>
                <div className="mt-7 space-y-5">
                  {players.map((player) => (
                    <div key={player.rank}>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-300">{player.name}</span>
                        <span className="font-semibold text-white">{player.ppg.toFixed(1)}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700/70">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${(player.ppg / 35) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
                <h3 className="font-semibold text-white">Platform Modules</h3>
                <p className="mt-1 text-xs text-slate-500">Planned analytics capabilities</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Player Analytics", "Advanced player statistics and profiles"],
                    ["Player Comparison", "Compare performance across players"],
                    ["Player Similarity", "Discover statistically similar players"],
                    ["Predictive Models", "Explore player performance projections"],
                  ].map(([title, description]) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{title}</p>
                        <p className="mt-1 text-xs text-slate-500">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-[#111b2c] p-5">
                <h3 className="font-semibold text-white">System Status</h3>
                <p className="mt-1 text-xs text-slate-500">Development environment</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["FastAPI Backend", "Operational"],
                    ["Player Dataset", "Loaded"],
                    ["Data Processing", "Complete"],
                    ["Frontend Integration", "In progress"],
                  ].map(([name, status]) => (
                    <div key={name} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-300">{name}</span>
                      <span className="text-xs text-emerald-400">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="border-t border-white/[0.07] pt-5 text-xs text-slate-600">
              NBA Front Office Intelligence · Analytics platform development preview
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
