export default function NFTCard({
  image,
  title,
  creator,
  price,
  likes,
  badge,
}) {
  return (
    <div className="group rounded-2xl bg-white/5 p-4 transition hover:bg-white/10">
      {/* Image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-black/30">
        {badge && (
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs">
            {badge}
          </span>
        )}

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className="text-xs text-white/40 truncate">{creator}</p>
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-blue-400">{price} ETH</span>
        <span className="text-white/40">❤️ {likes}k</span>
      </div>
    </div>
  );
}