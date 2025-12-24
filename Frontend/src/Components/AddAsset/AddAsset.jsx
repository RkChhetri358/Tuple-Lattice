

import { useState,useEffect } from "react";
import "./AddAsset.css";

export default function AddAsset() {

useEffect(() => {
  document.body.classList.add("has-transparent-navbar");
  return () => {
    document.body.classList.remove("has-transparent-navbar");
  };
}, []);



  const [royalty, setRoyalty] = useState(5.0);
   const [preview, setPreview] = useState(null);
 
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
             {preview ? (
               <img src={preview} alt="preview" />
             ) : (
               <span>＋</span>
             )}
             <input type="file" hidden onChange={handleImageUpload} />
           </label>
           <p>Add a photo</p>
         </div>
 
         {/* FORM */}
         <div className="asset-form">
           <h3>General Information</h3>
 
           <div className="form-row">
             <div className="form-group">
               <label>Name your asset</label>
               <input placeholder="Name your asset" />
             </div>
 
             <div className="form-group">
               <label>Asset Type</label>
               <select>
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
               <input placeholder="DD/MM/YYYY" />
             </div>
 
             <div className="form-group">
               <label>Upload Asset</label>
               <input type="file" />
             </div>
           </div>
 
           <div className="form-row">
             <div className="form-group full">
               <label>Description</label>
               <textarea placeholder="Describe your asset..." />
             </div>
 
             <div className="form-group">
               <label>Price</label>
               <input placeholder="Rs.1200" />
             </div>
           </div>
 
           {/* ROYALTY */}
           <div className="royalty">
             <label>Resale Royalty Rate</label>
             <div className="royalty-box">
               <button onClick={decreaseRoyalty}>−</button>
               <span>{royalty}%</span>
               <button onClick={increaseRoyalty}>+</button>
             </div>
           </div>
 
           <div className="confirm-row">
             <input type="checkbox" />
             <span>I confirm I own the rights to this work</span>
           </div>
 
           <button className="confirm-btn">CONFIRM</button>
         </div>
       </div>
 
       {/* FOOTER */}
       <div className="assets-footer">
         <img src="/UTA.png" alt="UTA" />
         <p>© Copyright 2025 &nbsp; All rights reserved.</p>
       </div>
     </div>
   );
 }
 
 