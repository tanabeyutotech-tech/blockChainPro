export default function NFTCard() {
  return (
    <div className="bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition">
      <img
        src="https://placehold.co/400x400"
        alt="NFT"
        className="object-cover w-full h-64"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">NFT Name</h2>
        <p className="text-sm text-gray-400">Price: 0.05 ETH</p>

        <button className="w-full py-2 mt-3 bg-purple-600 rounded-lg hover:bg-purple-700">
          Buy
        </button>
      </div>
    </div>
  );
}