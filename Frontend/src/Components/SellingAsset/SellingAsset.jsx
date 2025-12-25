import { useState, useEffect } from "react";
import axios from "axios"; 
<<<<<<< HEAD

import { Link } from "react-router-dom";
import { FiArrowLeft, FiUploadCloud, FiPlus, FiMinus } from "react-icons/fi"; // Correct import

export default function SellingAsset() {

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

  const [sellChecked, setSellChecked] = useState(false);
=======
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
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024

  const handlePriceChange = (e) => {
    const nprValue = e.target.value;
    setNpr(nprValue);
<<<<<<< HEAD

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
    if (!sellChecked) {
      alert("Please confirm you want to sell this asset.");
      return;
    }

    if (!assetFile || !coverImage || !privateKey || !price || !title) {
      alert("Please fill in all fields (Title, Price, Key, and both Files).");
=======
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
      alert("Please confirm the resale checkbox.");
      return;
    }
    if (!priceWei) {
      alert("Please enter a price.");
      return;
    }
    if (!privateKey) {
      alert("Private Key is required to sign the transaction.");
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
      return;
    }

    setLoading(true);

<<<<<<< HEAD
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
=======
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
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
      alert("Error: " + (error.response?.data?.error || "Transaction failed"));
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="assets-container">
<<<<<<< HEAD

=======
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
      <div className="assets-header">
        <Link to="/layout/asset" className="no-underline">
          <FiArrowLeft className="back-arrow" size={24} />
        </Link>
<<<<<<< HEAD

        <h2 className="assets-title">
          <strong>SELLING</strong> <span>assets</span>
=======
        <h2 className="assets-title">
          <strong>RESALE</strong> <span>asset</span>
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
        </h2>
      </div>

      <div className="assets-card">
<<<<<<< HEAD

        {/* THUMBNAIL PREVIEW */}
        <div className="asset-image-box">
          <label className="image-placeholder">
            {preview ? <img src={preview} alt="preview" /> : <FiPlus size={40} />}
            <input type="file" hidden accept="image/*" onChange={handleCoverUpload} />
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
              />
=======
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
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
<<<<<<< HEAD
              <label>Private Key</label>
              <input 
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
              />
            </div>

            <div className="form-group">
              <label>Upload Asset</label>
              <input 
                type="file" 
                onChange={(e) => setAssetFile(e.target.files[0]) }
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
              />
            </div>

            <div className="form-group">
              <label>Price (Rs)</label>
=======
              <label>Resale Price (Rs)</label>
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
              <input
                type="number"
                value={npr}
                onChange={handlePriceChange}
<<<<<<< HEAD
                placeholder="Rs"
=======
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label>Artist Royalty</label>
              <input 
                value={artwork?.royalty_percentage ? `${artwork.royalty_percentage / 100}%` : "0%"} 
                disabled 
                className="disabled-input" 
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
              />
            </div>
          </div>

<<<<<<< HEAD
          <div className="form-row">
            <div className="form-group">
              <label>Resale Royalty Rate</label>
              <div className="royalty-box">
                <button onClick={decreaseRoyalty}><FiMinus /></button>
                <span>{royalty}%</span>
                <button onClick={increaseRoyalty}><FiPlus /></button>
              </div>
           
           
            </div>
           
          </div>

          <div className="confirm-row">
            <input type="checkbox" />
            <span>Do you want to sell this Asset?</span>
=======
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
            <span>I confirm I want to list this asset for resale.</span>
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
          </div>

          <button 
            className="confirm-btn" 
<<<<<<< HEAD
            onClick={handleMint} 
            disabled={loading}
          >
            {loading ? "MINTING ON BLOCKCHAIN..." : "CONFIRM & MINT"}
=======
            onClick={handleResaleListing} 
            disabled={loading}
          >
            {loading ? "LISTING ON BLOCKCHAIN..." : "CONFIRM RESALE"}
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
