import { X, Wallet  } from "lucide-react";

export default function WalletModal({ onClose, onConnect }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f1324] p-6 shadow-xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wallet options */}
        <div className="space-y-3">
          {/* MetaMask */}
          <button
            onClick={onConnect}
            className="flex items-center justify-between w-full p-4 transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="MetaMask"
                className="w-8 h-8"
              />
              <span className="font-medium">MetaMask</span>
            </div>
            <span className="text-sm text-white/40">Browser Wallet</span>
          </button>

          {/* WalletConnect */}
          <button
            className="flex items-center justify-between w-full p-4 transition border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://avatars.githubusercontent.com/u/37784886"
                alt="WalletConnect"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">WalletConnect</span>
            </div>
            <span className="text-sm text-white/40">Mobile Wallet</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-white/40">
          By connecting a wallet, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}