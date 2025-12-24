import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

export default function Marketplace() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch(`${API_URL}/assets/listed/`);
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const buyAsset = async (assetId) => {
    setBuying(assetId);
    try {
      const token = localStorage.getItem("access_token");
      
      const response = await fetch(`${API_URL}/assets/${assetId}/buy/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Purchase failed");
      }

      alert(`Purchase successful! Transaction: ${result.tx_hash}`);
      fetchAssets();
    } catch (error) {
      alert(error.message);
    } finally {
      setBuying(null);
    }
  };

  const filteredAssets = filter === "all" 
    ? assets 
    : assets.filter(a => a.asset_type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading marketplace...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-5xl font-bold mb-4">
          UTA <span className="text-blue-400">Marketplace</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Discover and purchase unique digital assets with automatic royalties
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-4">
        {["all", "image", "video", "audio", "3d", "mixed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* ASSET GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            {/* Image */}
            <div className="aspect-square bg-gray-700 relative">
              {asset.preview_image ? (
                <img
                  src={asset.preview_image}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl">
                  🎨
                </div>
              )}
              <div className="absolute top-2 right-2 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                {asset.asset_type}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <h3 className="text-xl font-bold truncate">{asset.name}</h3>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Artist: {asset.artist_name}</span>
                <span>{asset.royalty_percent}% royalty</span>
              </div>

              <p className="text-gray-300 text-sm line-clamp-2">
                {asset.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div>
                  <div className="text-xs text-gray-400">Price</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {asset.price} ETH
                  </div>
                </div>
                
                <button
                  onClick={() => buyAsset(asset.id)}
                  disabled={buying === asset.id}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {buying === asset.id ? "Buying..." : "Buy Now"}
                </button>
              </div>

              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>Sales: {asset.total_sales}</span>
                <span>Year: {asset.creation_year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold mb-2">No assets found</h2>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}