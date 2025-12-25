import { useState, useEffect } from "react";
import axios from "axios"; 
<<<<<<< HEAD
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
=======
import "./AddAsset.css";
import { Link } from "react-router-dom";

export default function BuyingAsset() {

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    return () => {
      document.body.classList.remove("has-transparent-navbar");
    };
  }, []);

  // --- STATE ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); 
  const [royalty, setRoyalty] = useState(5.0);
  const [privateKey, setPrivateKey] = useState("");

  const [assetFile, setAssetFile] = useState(null); 
  const [coverImage, setCoverImage] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [loading, setLoading] = useState(false);

  const [npr, setNpr] = useState("");     
  const ETH_PRICE_NPR = 500000; 

  const handlePriceChange = (e) => {
    const nprValue = e.target.value;
    setNpr(nprValue);

    if (!nprValue) {
      setPrice("");
      return;
    }

    const eth = nprValue / ETH_PRICE_NPR;
    const wei = BigInt(Math.floor(eth * 1e18));

    setPrice(wei.toString());
  };

  const increaseRoyalty = () => {
    if (royalty < 20) setRoyalty((prev) => +(prev + 1).toFixed(1));
  };

  const decreaseRoyalty = () => {
    if (royalty > 0) setRoyalty((prev) => +(prev - 1).toFixed(1));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleMint = async () => {
    if (!assetFile || !coverImage || !privateKey || !price || !title) {
      alert("Please fill in all fields (Title, Price, Key, and both Files).");
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
      return;
    }

    setLoading(true);

<<<<<<< HEAD
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
=======
    const formData = new FormData();
    formData.append("file", assetFile);         
    formData.append("cover_image", coverImage); 
    formData.append("title", title);
    formData.append("description", description);
    formData.append("private_key", privateKey);
    formData.append("royalty", Math.floor(royalty * 100)); 
    formData.append("primary_price", price); 

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/mint/", 
        formData, 
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(`Success! Minted Token ID: ${response.data.token_id}`);
    } catch (error) {
      console.error("Minting Error:", error.response?.data || error.message);
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
      alert("Error: " + (error.response?.data?.error || "Transaction failed"));
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const displayPriceNpr = Math.round(parseFloat(listing?.price || 0) * 500000);

=======
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
  return (  
    <div className="assets-container">
      <div className="assets-header">
        <Link to="/layout/asset" className="no-underline">
<<<<<<< HEAD
          <FiArrowLeft className="back-arrow" size={24} />
        </Link>
        <h2 className="assets-title">
          <strong>PURCHASE</strong> <span>asset</span>
=======
          <span className="back-arrow">←</span>
        </Link>

        <h2 className="assets-title">
          <strong>BUYING</strong> <span>assets</span>
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
        </h2>
      </div>

      <div className="assets-card">
<<<<<<< HEAD
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
=======

        {/* THUMBNAIL PREVIEW */}
        <div className="asset-image-box">
          <label className="image-placeholder">
            {preview ? <img src={preview} alt="preview" /> : <span>＋</span>}
            <input type="file" hidden accept="image/*" readOnly={true} onChange={handleCoverUpload} />
          </label>
        </div>

        <div className="asset-form">
          <h3>General Information</h3>

          <div className="form-row">
            <div className="form-group full">
              <label>Name your asset</label>
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title of the artwork"
                readOnly={true}
              />
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
<<<<<<< HEAD
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
=======
              <label>Private Key</label>
              <input 
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
                readOnly={true}
              />
            </div>

            <div className="form-group">
              <label>Upload Asset</label>
              <input 
                type="file" 
                onChange={(e) => setAssetFile(e.target.files[0]) } 
                readOnly={true}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe your asset..." 
                readOnly={true}
              />
            </div>

            <div className="form-group">
              <label>Price (Rs)</label>
              <input
                type="number"
                value={npr}
                onChange={handlePriceChange}
                placeholder="Rs"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Resale Royalty Rate</label>
              <div className="royalty-box">
                <button onClick={decreaseRoyalty}>−</button>
                <span>{royalty}%</span>
                <button onClick={increaseRoyalty}>+</button>
              </div>
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
            </div>
          </div>

          <div className="confirm-row">
<<<<<<< HEAD
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
=======
            <input type="checkbox" />
            <span>I confirm I own the rights to this work</span>
          </div>

          <button 
            className="confirm-btn" 
            onClick={handleMint} 
            disabled={loading}
          >
            {loading ? "MINTING ON BLOCKCHAIN..." : "CONFIRM & MINT"}
          </button>

>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
