import { useState, useEffect } from "react";
import axios from "axios"; 
import "./AddAsset.css";

export default function AddAsset() {
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

  const increaseRoyalty = () => {
    if (royalty < 20) setRoyalty((prev) => +(prev + 0.5).toFixed(1));
  };

  const decreaseRoyalty = () => {
    if (royalty > 0) setRoyalty((prev) => +(prev - 0.5).toFixed(1));
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
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", assetFile);         
    formData.append("cover_image", coverImage); 
    formData.append("title", title);
    formData.append("description", description);
    formData.append("private_key", privateKey);
    formData.append("royalty", Math.floor(royalty * 100)); // Basis points (5% = 500)
    formData.append("primary_price", price); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/mint/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Success! Minted Token ID: ${response.data.token_id}`);
      // Optional: Reset form or redirect here
    } catch (error) {
      console.error("Minting Error:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Transaction failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assets-container">
      <div className="assets-header">
        <span className="back-arrow">←</span>
        <h2 className="assets-title">
          <strong>ADDING</strong> <span>assets</span>
        </h2>
      </div>

      <div className="assets-card">
        {/* THUMBNAIL PREVIEW */}
        <div className="asset-image-box">
          <label className="image-placeholder">
            {preview ? <img src={preview} alt="preview" /> : <span>＋</span>}
            <input type="file" hidden accept="image/*" onChange={handleCoverUpload} />
          </label>
          <p>Add Thumbnail / Cover</p>
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
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Private Key</label>
              <input 
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="form-group">
              <label>Upload High-Res Asset</label>
              <input 
                type="file" 
                onChange={(e) => setAssetFile(e.target.files[0])} 
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Wei)</label>
              <input 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="e.g. 1000000000000000000" 
              />
            </div>
            <div className="form-group">
              <label>Resale Royalty Rate</label>
              <div className="royalty-box">
                <button onClick={decreaseRoyalty}>−</button>
                <span>{royalty}%</span>
                <button onClick={increaseRoyalty}>+</button>
              </div>
            </div>
          </div>

          <div className="confirm-row">
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
        </div>
      </div>
    </div>
  );
}