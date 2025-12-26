import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { FiArrowLeft, FiLock, FiShoppingBag } from "react-icons/fi";

export default function BuyingAsset() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This is the listing object passed from the Carousel in Asset.jsx
  const listing = location.state?.listing; 
  const artwork = listing?.artwork_details;

  // --- STATE ---
  const [privateKey, setPrivateKey] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [buyChecked, setBuyChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    
    // Get current user role
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (!listing) {
        navigate("/layout/asset");
    }
    return () => document.body.classList.remove("has-transparent-navbar");
  }, [listing, navigate]);

  const handlePurchase = async () => {
    if (!buyChecked) {
      alert("Please confirm the purchase checkbox.");
      return;
    }
    if (!privateKey) {
      alert("Private Key is required to sign the transaction.");
      return;
    }

    setLoading(true);

    // Determine Endpoint and Payload based on Role
    const isDistributor = user?.role === "distributor";
    const endpoint = isDistributor 
      ? "http://127.0.0.1:8000/api/primary-buy/" 
      : "http://127.0.0.1:8000/api/buy/";


    const calculatedPrice = listing?.price_wei 
    ? listing.price_wei.toString() 
    : (BigInt(Math.round(parseFloat(listing?.price || 0) * 1e18))).toString();
  
  console.log("SENDING WEI:", calculatedPrice);

  const payload = {
    token_id: artwork?.token_id,
    private_key: privateKey,
    // Fix: Use BigInt or ensure we aren't losing a zero in the conversion
    price: listing?.price_wei 
      ? listing.price_wei.toString() 
      : (BigInt(Math.round(parseFloat(listing?.price || 0) * 1e18))).toString(),
  };

    // Primary buy needs the distributor address specifically
    if (isDistributor) {
      payload.distributor_address = user.wallet;
    }

    try {
      const response = await axios.post(endpoint, payload);
      alert(`Success! ${response.data.status}. TX: ${response.data.tx_hash}`);
      navigate("/layout/asset"); 
    } catch (error) {
      console.error("Purchase Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Transaction failed"));
    } finally {
      setLoading(false);
    }
  };

  const displayPriceNpr = Math.round(parseFloat(listing?.price || 0) * 500000);

  return (  
    <div className="assets-container">
      <div className="assets-header">
        <Link to="/layout/asset" className="no-underline">
          <FiArrowLeft className="back-arrow" size={24} />
        </Link>
        <h2 className="assets-title">
          <strong>PURCHASE</strong> <span>asset</span>
        </h2>
      </div>

      <div className="assets-card">
        <div className="asset-image-box">
          <div className="image-placeholder">
            <img src={artwork?.cover_url || "/placeholder.png"} alt="preview" />
          </div>
        </div>

        <div className="asset-form">
          <h3>Checkout Information</h3>

          <div className="form-row">
            <div className="form-group full">
              <label>Asset Title</label>
              <input value={artwork?.title || ""} disabled className="disabled-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Rs)</label>
              <input value={`Rs. ${displayPriceNpr.toLocaleString()}`} disabled className="disabled-input" />
            </div>
            <div className="form-group">
              <label>Seller</label>
              <input value={listing?.seller_name || "Unknown"} disabled className="disabled-input" />
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
                placeholder="Enter your private key to sign and pay"
                className="security-input"
              />
              <small className="input-hint">This is required to authorize the ETH transfer from your wallet.</small>
            </div>
          </div>

          <div className="confirm-row">
            <input 
                type="checkbox" 
                checked={buyChecked} 
                onChange={(e) => setBuyChecked(e.target.checked)} 
            />
            <span>I confirm I want to buy this asset for Rs. {displayPriceNpr.toLocaleString()}</span>
          </div>

          <button 
            className="confirm-btn buy-btn" 
            onClick={handlePurchase} 
            disabled={loading}
          >
            <FiShoppingBag style={{marginRight: '8px'}} />
            {loading ? "PROCESSING..." : "CONFIRM PURCHASE"}
          </button>
        </div>
      </div>
    </div>
  );
}
