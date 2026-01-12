import { useState } from "react";

export default function NFTCard({
  image,
  title,
  creator,
  price,
  likes,
  badge,
}) {
  // const [sortOrder, setSortOrder] = useState("desc");
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative p-4 transition group rounded-2xl bg-white/5 hover:bg-white/10">
      
      {/* Image */}
      <div className="relative mb-4 overflow-hidden aspect-square rounded-xl bg-black/30">
        {badge && (
          <span className="absolute z-10 px-3 py-1 text-xs rounded-full right-2 top-2 bg-black/70">
            {badge}
          </span>
        )}

       <img
          src={image}
          alt={title}
          onLoad={() => setLoaded(true)}
          className={`h-48 w-full rounded-lg object-cover ${
            loaded ? "block" : "hidden"
          }`}
      />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition opacity-0 bg-black/60 group-hover:opacity-100">
          <button className="px-6 py-2 text-sm font-semibold bg-blue-600 rounded-full hover:bg-blue-500">
            Place Bid
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className="text-xs truncate text-white/40">{creator}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between mt-3 text-sm">
        <span className="text-blue-400">{price} ETH</span>

        <button className="flex items-center gap-1 transition text-white/40 hover:text-red-400">
          ❤️ {likes}k
        </button>
      </div>
    </div>
  );
}