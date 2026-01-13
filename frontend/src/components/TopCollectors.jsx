const collectors = [
  { id: 1, name: "0xA92...F3", volume: "124 ETH" },
  { id: 2, name: "0x9B1...22", volume: "98 ETH" },
  { id: 3, name: "0xC33...81", volume: "76 ETH" },
];

export default function TopCollectors() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold">Top Collectors</h2>

      <div className="flex gap-6">
        {collectors.map((c) => (
          <div
            key={c.id}
            className="w-56 rounded-xl bg-[#161616] p-4"
          >
            <div className="mb-3 h-12 w-12 rounded-full bg-white/10" />
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-white/60">{c.volume}</p>
          </div>
        ))}
      </div>
    </section>
  );
}