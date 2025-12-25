import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Asset.css";

export default function Asset() {
  const navigate = useNavigate();

  // --- STATE ---
  const [creations, setCreations] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchData = async () => {
      if (!storedUser || !storedUser.wallet) {
        setLoading(false);
        return;
      }

      try {
        // 1. Fetch Marketplace with Role Filter
        const listingsRes = await axios.get(
          `http://127.0.0.1:8000/api/active-listings/?role=${storedUser.role}`
        );
        setActiveListings(listingsRes.data);

        // 2. Fetch Wallet Activity
        const walletRes = await axios.get(
          `http://127.0.0.1:8000/api/wallet-activity/${storedUser.wallet}/`
        );
        setCreations(walletRes.data.artworks);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => document.body.classList.remove("has-transparent-navbar");
  }, []);

  const handleAddasset = () => navigate("/addasset");

  if (loading) return <div className="loading-screen">Loading Assets...</div>;

  return (
    <div className="assets-page">
      {/* MINT BUTTON FOR ARTISTS */}
      {user?.role === "artist" && (
        <div className="add-assets-wrapper">
          <button className="add-assets-btn" onClick={handleAddasset}>
            <span className="plus"><FontAwesomeIcon icon={faPlus} /></span>{" "}
            ADD assets
          </button>
        </div>
      )}

      {/* SECTION: YOUR INVENTORY */}
      <section className="section">
        <h2 className="section-title">YOUR CREATIONS & COLLECTION</h2>
        <div className="grid-3">
          {creations.length > 0 ? (
            creations.map((art) => (
              <AssetCard 
                key={art.token_id}
                title={art.title} 
                ownerName={art.owner_name}
                price={art.artist_name === user?.username ? "Created" : "Collected"}
                imageUrl={art.cover_url} 
                onClick={() => navigate("/layout/sellingasset", { state: { artwork: art } })}
              />
            ))
          ) : (
            <p className="no-data">No assets found for this wallet.</p>
          )}
        </div>
      </section>

      {/* SECTION: MARKETPLACE */}
      <section className="section">
        <h2 className="section-title">Assets for Sale</h2>
        {activeListings.length > 0 ? (
          <Carousel>
            {activeListings.map((listing) => (
              <SmallAsset 
                key={listing.id}
                title={listing.artwork_details.title} 
                price={`Rs. ${Math.round(parseFloat(listing.price) * 500000).toLocaleString()}`} 
                imageUrl={listing.artwork_details.cover_url} 
                sellerName={listing.seller_name}
                // Identification only, no disabling
                isOwnListing={listing.seller_name === user?.username}
                // Navigation to Buying page for everyone
                onClick={() => navigate("/layout/buyingasset", { state: { listing: listing } })}
              />
            ))}
          </Carousel>
        ) : (
          <p className="no-data">No listings available for your role.</p>
        )}
      </section>

      <footer className="footer">© Copyright 2025 All rights reserved.</footer>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

const AssetCard = ({ title, ownerName, price, imageUrl, onClick }) => (
  <div className="asset-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="asset-img">
      <img src={imageUrl || "/placeholder.png"} alt={title} />
    </div>
    <div className="asset-info">
      <h4>{title}</h4>
      <p className="owner-name" style={{ color: "#888", fontSize: "0.85rem", margin: "4px 0" }}>
        Owner: {ownerName}
      </p>
      <span className="price" style={{ fontWeight: "bold", color: "#e63946" }}>
        {price}
      </span>
    </div>
  </div>
);

const SmallAsset = ({ title, price, imageUrl, sellerName, onClick, isOwnListing }) => (
  <div 
    className="small-asset-card" 
    onClick={onClick} 
    style={{ cursor: "pointer" }}
  >
    <div className="small-img">
      <img src={imageUrl || "/placeholder.png"} alt={title} />
      {isOwnListing && <div className="own-badge">Your Listing</div>}
    </div>
    <div className="small-asset-info">
        <h5>{title}</h5>
        <p className="seller-hint" style={{ fontSize: "0.75rem", color: "#666" }}>Seller: {sellerName}</p>
        <span className="price">{price}</span>
    </div>
  </div>
);

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-wrappers">
      <button className="carousel-btn left" onClick={() => scroll("left")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="carousel-container" ref={scrollRef}>
        {children}
      </div>
      <button className="carousel-btn right" onClick={() => scroll("right")}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};
