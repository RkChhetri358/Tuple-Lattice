import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { FiArrowLeft, FiLock } from "react-icons/fi";

export default function SellingAsset() {
  const location = useLocation();
  const navigate = useNavigate();
  const artwork = location.state?.artwork; 

  // --- STATE ---
  const [privateKey, setPrivateKey] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [npr, setNpr] = useState("");
  const [priceWei, setPriceWei] = useState("");
  const [sellChecked, setSellChecked] = useState(false);

  const ETH_PRICE_NPR = 500000;

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    if (!artwork) {
        navigate("/layout/asset");
    }
    return () => document.body.classList.remove("has-transparent-navbar");
  }, [artwork, navigate]);

  const handlePriceChange = (e) => {
    const nprValue = e.target.value;
    setNpr(nprValue);
    if (!nprValue) {
      setPriceWei("");
      return;
    }
    const eth = nprValue / ETH_PRICE_NPR;
    const wei = BigInt(Math.floor(eth * 1e18));
    setPriceWei(wei.toString());
  };

  // Logic to calculate what the seller actually keeps
  const calculateNetEarnings = () => {
    if (!npr || isNaN(npr)) return 0;
    const royaltyBasisPoints = artwork?.royalty_percentage || 0;
    const royaltyDecimal = royaltyBasisPoints / 10000; // e.g., 500 -> 0.05
    const net = npr - (npr * royaltyDecimal);
    return Math.round(net);
  };

  const handleResaleListing = async () => {
    if (!sellChecked) {
      alert("Please confirm the listing checkbox.");
      return;
    }
    if (!priceWei) {
      alert("Please enter a price.");
      return;
    }
    if (!privateKey) {
      alert("Private Key is required to sign the transaction.");
      return;
    }

    setLoading(true);

    const payload = {
      token_id: artwork.token_id,
      private_key: privateKey, 
      price: priceWei 
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/list/", 
        payload
      );

      alert(`Success! Asset listed. TX: ${response.data.tx_hash}`);
      navigate("/layout/asset"); 
    } catch (error) {
      console.error("Resale Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Transaction failed"));
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="assets-container">
      <div className="assets-header">
        <Link to="/layout/asset" className="no-underline">
          <FiArrowLeft className="back-arrow" size={24} />
        </Link>
        <h2 className="assets-title">
          <strong>LIST</strong> <span>asset</span>
        </h2>
      </div>

      <div className="assets-card">
        <div className="asset-image-box">
          <div className="image-placeholder">
            <img src={artwork?.cover_url || "/placeholder.png"} alt="preview" />
          </div>
        </div>

        <div className="asset-form">
          <h3>Marketplace Listing</h3>

          <div className="form-row">
            <div className="form-group full">
              <label>Asset Title</label>
              <input value={artwork?.title || ""} disabled className="disabled-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Resale Price (Rs)</label>
              <input
                type="number"
                value={npr}
                onChange={handlePriceChange}
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label>Artist Royalty</label>
              <input 
                value={artwork?.royalty_percentage ? `${artwork.royalty_percentage / 100}%` : "0%"} 
                disabled 
                className="disabled-input" 
              />
            </div>
          </div>

          {/* PRIVATE KEY FIELD */}
          <div className="form-row">
            <div className="form-group full">
              <label><FiLock size={12} /> Your Private Key</label>
              <input 
                type="password" 
                value={privateKey} 
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key to sign"
                className="security-input"
              />
              <small className="input-hint">Required to authorize the blockchain transaction.</small>
            </div>
          </div>

          {/* NET EARNINGS DISPLAY */}
          <div className="earnings-preview">
             <span>You will receive approx:</span>
             <strong>Rs. {calculateNetEarnings().toLocaleString()}</strong>
          </div>

          <div className="confirm-row">
            <input 
                type="checkbox" 
                checked={sellChecked} 
                onChange={(e) => setSellChecked(e.target.checked)} 
            />
            <span>I confirm I want to list this asset.</span>
          </div>

          <button 
            className="confirm-btn" 
            onClick={handleResaleListing} 
            disabled={loading}
          >
            {loading ? "LISTING ON BLOCKCHAIN..." : "CONFIRM LISTING"}
          </button>
        </div>
      </div>
    </div>
  );
}
