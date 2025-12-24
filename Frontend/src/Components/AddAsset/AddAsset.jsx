import { useState, useEffect } from "react";
import axios from "axios";
import "./AddAsset.css";

export default function AddAsset() {
  const [royalty, setRoyalty] = useState(5.0);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "Image",
    creationYear: "",
    assetFile: null,
    description: "",
    price: "",
    confirmRights: false,
  });

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    return () => {
      document.body.classList.remove("has-transparent-navbar");
    };
  }, []);

  const increaseRoyalty = () => {
    if (royalty < 20) setRoyalty((prev) => +(prev + 0.5).toFixed(1));
  };

  const decreaseRoyalty = () => {
    if (royalty > 0) setRoyalty((prev) => +(prev - 0.5).toFixed(1));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, assetFile: file });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.confirmRights) {
      alert("Please confirm you own the rights to this work.");
      return;
    }

    try {
      const data = new FormData();
      data.append("assetName", formData.assetName);
      data.append("assetType", formData.assetType);
      data.append("creationYear", formData.creationYear);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("royalty", royalty);
      if (formData.assetFile) data.append("assetFile", formData.assetFile);

      const response = await axios.post(
        "http://localhost:8000/api/assets/", // replace with your backend endpoint
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Asset uploaded successfully!");
        setFormData({
          assetName: "",
          assetType: "Image",
          creationYear: "",
          assetFile: null,
          description: "",
          price: "",
          confirmRights: false,
        });
        setPreview(null);
        setRoyalty(5.0);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading asset. Please try again.");
    }
  };

  return (
    <div className="assets-container">
      {/* HEADER */}
      <div className="assets-header">
        <span className="back-arrow">←</span>
        <h2 className="assets-title">
          <strong>ADDING</strong> <span>assets</span>
        </h2>
      </div>

      {/* MAIN CARD */}
      <div className="assets-card">
        {/* IMAGE UPLOAD */}
        <div className="asset-image-box">
          <label className="image-placeholder">
            {preview ? <img src={preview} alt="preview" /> : <span>＋</span>}
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
          <p>Add a photo</p>
        </div>

        {/* FORM */}
        <form className="asset-form" onSubmit={handleSubmit}>
          <h3>General Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Name your asset</label>
              <input
                name="assetName"
                value={formData.assetName}
                placeholder="Name your asset"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Asset Type</label>
              <select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
              >
                <option>Image</option>
                <option>Video</option>
                <option>Audio</option>
                <option>3D</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Creation Year</label>
              <input
                name="creationYear"
                value={formData.creationYear}
                placeholder="DD/MM/YYYY"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Upload Asset</label>
              <input type="file" name="assetFile" onChange={handleImageUpload} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Describe your asset..."
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                name="price"
                value={formData.price}
                placeholder="Rs.1200"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ROYALTY */}
          <div className="royalty">
            <label>Resale Royalty Rate</label>
            <div className="royalty-box">
              <button type="button" onClick={decreaseRoyalty}>
                −
              </button>
              <span>{royalty}%</span>
              <button type="button" onClick={increaseRoyalty}>
                +
              </button>
            </div>
          </div>

          <div className="confirm-row">
            <input
              type="checkbox"
              name="confirmRights"
              checked={formData.confirmRights}
              onChange={handleChange}
            />
            <span>I confirm I own the rights to this work</span>
          </div>

          <button className="confirm-btn" type="submit">
            CONFIRM
          </button>
        </form>
      </div>

      {/* FOOTER */}
      <div className="assets-footer">
        <img src="/UTA.png" alt="UTA" />
        <p>© Copyright 2025 &nbsp; All rights reserved.</p>
      </div>
    </div>
  );
}
