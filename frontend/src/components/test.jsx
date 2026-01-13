export default function Home({ walletOpen, onClose }) {
  return (
    <>
      {/* all your sections here */}

      {walletOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[360px] rounded-xl bg-[#12172a] p-6 space-y-4">
            <h3 className="text-lg font-semibold">Connect Wallet</h3>

            <button className="w-full py-3 bg-indigo-600 rounded-lg">
              MetaMask
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}