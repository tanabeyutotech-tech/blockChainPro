export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-[1800px] px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600" />
          <span className="text-xl font-semibold">NFT Marketplace</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-sm text-white/70">
          <span className="hover:text-white cursor-pointer">Explore</span>
          <span className="hover:text-white cursor-pointer">Collections</span>
          <span className="hover:text-white cursor-pointer">Create</span>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <input
            placeholder="Search NFTs"
            className="hidden sm:block rounded-lg bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/40"
          />

          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium hover:bg-indigo-500 transition">
            Connect Wallet
          </button>
        </div>

      </div>
    </header>
  );
}