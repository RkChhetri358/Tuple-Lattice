<<<<<<< HEAD
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
=======
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
import "./Asset.css";

export default function Asset() {
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleAddasset = () => {
    navigate("/addasset");
  };

  return (
    <div className="assets-page">
      {/* ADD ASSETS BUTTON */}
      <div className="add-assets-wrapper">
        <button className="add-assets-btn" onClick={handleAddasset}>
          <span className="plus">
            <FontAwesomeIcon icon={faPlus} />
          </span>{" "}
          ADD assets
        </button>
      </div>

      {/* YOUR CREATIONS */}
      <section className="section">
        <h2 className="section-title">YOUR ASSETS</h2>
        <div className="grid-3">
          <AssetCard title="ROCK N ROLL - 2013" description="Music" price="Rs. 4000" imageUrl="/1.png" />
          <AssetCard title="Shadow in Dark - 2020" description="Art" price="Rs. 2000" imageUrl="/2.png" />
          <AssetCard title="Black Dawns - 2011" description="Music" price="Rs. 2000" imageUrl="/3.png" />
          <AssetCard title="Piano Dawns - 2011" description="Music" price="Rs. 2000" imageUrl="/4.png" />
          <AssetCard title="Black Dawns - 2011" description="Art" price="Rs. 2000" imageUrl="/5.png" />
          <AssetCard title="Piano Dawns - 2011" description="Music" price="Rs. 2000" imageUrl="/6.png" />
        </div>
      </section>

      {/* ASSETS FOR SALE (Carousel) */}
      <section className="section">
        <h2 className="section-title">Assets for Sale</h2>
        <Carousel>
          <SmallAsset title="ROCK N ROLL 2013" price="Rs. 4000" imageUrl="/1.png" />
          <SmallAsset title="Shadow in Dark 2020" price="Rs. 2000" imageUrl="/2.png" />
          <SmallAsset title="Black Dawns 2011" price="Rs. 2000" imageUrl="/3.png" />
          <SmallAsset title="Piano Dawns 2011" price="Rs. 2000" imageUrl="/4.png" />
          <SmallAsset title="Metal Waves 2022" price="Rs. 5000" imageUrl="/5.png" />
          <SmallAsset title="Jazz Night 2019" price="Rs. 3000" imageUrl="/6.png" />
        </Carousel>
      </section>

      {/* ARTISTS (Carousel) */}
      <section className="section">
        <h2 className="section-title">ARTISTS</h2>
        <Carousel>
          <Artist name="Sabria Mana" assets="12 assets" imageUrl="/1.png" />
          <Artist name="Wnchu Kia" assets="9 assets" imageUrl="/2.png" />
          <Artist name="Kruna Maga" assets="12 assets" imageUrl="/3.png" />
          <Artist name="Taklle Bhau" assets="12 assets" imageUrl="/4.png" />
          <Artist name="John Doe" assets="5 assets" imageUrl="/5.png" />
          <Artist name="Jane Smith" assets="22 assets" imageUrl="/6.png" />
        </Carousel>
      </section>

      {/* MOST POPULAR & TRENDING */}
      <section className="section">
        <h2 className="section-title-large right">
          MOST <span className="red-most">popular</span>
        </h2>
        <div className="popular-card">
          <div className="popular-img"><img src="/2.png" alt="popular" /></div>
          <div>
            <h3>SHADOW IN THE DARK</h3>
            <p className="meta">4500 sales · 200 reviews · Rs. 43,000</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title-large">
          <span className="red-most">Trending</span> in market
        </h2>
        <Trending rank="1st" title="Black Dawns" imageUrl="/3.png" />
        <Trending rank="2nd" title="Piano Dawns" imageUrl="/4.png" />
=======
  // --- STATE ---
  const [creations, setCreations] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");

    // 1. Get Logged in User info from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchData = async () => {
      if (!storedUser || !storedUser.wallet) {
        setLoading(false);
        return;
      }

      try {
        // 2. Fetch Active Listings (Marketplace) with ROLE FILTERING
        // This ensures Distributors see Artists and Users see Distributors
        const listingsRes = await axios.get(
          `http://127.0.0.1:8000/api/active-listings/?role=${storedUser.role}`
        );
        setActiveListings(listingsRes.data);

        // 3. Fetch Wallet Activity (Your Creations & Collection)
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
      {/* 4. Only show "ADD ASSETS" if user is an Artist */}
      {user?.role === "artist" && (
        <div className="add-assets-wrapper">
          <button className="add-assets-btn" onClick={handleAddasset}>
            <span className="plus">
              <FontAwesomeIcon icon={faPlus} />
            </span>{" "}
            ADD assets
          </button>
        </div>
      )}

      {/* YOUR CREATIONS & COLLECTION Section */}
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

      {/* ASSETS FOR SALE (Filtered Marketplace) */}
      <section className="section">
        <h2 className="section-title">Assets for Sale</h2>
        {activeListings.length > 0 ? (
          <Carousel>
            {activeListings.map((listing) => (
              <SmallAsset 
                key={listing.id}
                title={listing.artwork_details.title} 
                // ETH to NPR conversion logic (Assuming 1 ETH = 500,000 NPR)
                price={`Rs. ${Math.round(parseFloat(listing.price) * 500000).toLocaleString()}`} 
                imageUrl={listing.artwork_details.cover_url} 
                sellerName={listing.seller_name}
              />
            ))}
          </Carousel>
        ) : (
          <p className="no-data">No listings available for your role.</p>
        )}
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
      </section>

      <footer className="footer">© Copyright 2025 All rights reserved.</footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

<<<<<<< HEAD
const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const trackRef = React.useRef(null);
  
  const totalItems = React.Children.count(children);
  const itemsPerPage = 4;
  const scrollAmount = 3; // Moves 3 items at a time on one click

  React.useEffect(() => {
    setCurrentIndex(totalItems);
  }, [totalItems]);

  const handleScroll = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (direction === "right") {
      setCurrentIndex((prev) => prev + scrollAmount);
    } else {
      setCurrentIndex((prev) => prev - scrollAmount);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Seamless jump logic
    if (currentIndex >= totalItems * 2) {
      setCurrentIndex(currentIndex - totalItems);
    } else if (currentIndex < totalItems) {
      setCurrentIndex(currentIndex + totalItems);
=======
const AssetCard = ({ title, ownerName, price, imageUrl, onClick }) => (
  <div className="asset-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="asset-img">
      <img src={imageUrl || "/placeholder.png"} alt={title} />
    </div>
    <div className="asset-info">
      <h4>{title}</h4>
      <p className="owner-name" style={{ color: "#888", fontSize: "0.9rem", margin: "5px 0" }}>
        Owner: {ownerName}
      </p>
      <span className="price" style={{ fontWeight: "bold", color: "#e63946" }}>
        {price}
      </span>
    </div>
  </div>
);

const SmallAsset = ({ title, price, imageUrl, sellerName }) => (
  <div className="small-asset-card">
    <div className="small-img">
      <img src={imageUrl || "/placeholder.png"} alt={title} />
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
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
    }
  };

  return (
    <div className="carousel-wrappers">
<<<<<<< HEAD
      <button className="carousel-btn left" onClick={() => handleScroll("left")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="carousel-infinite-window">
        <div
          ref={trackRef}
          className="carousel-infinite-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            transition: isTransitioning ? "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
            cursor: "default" /* Dragging removed */
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {React.Children.map(children, (child) => (
            <div className="carousel-item-fixed">{child}</div>
          ))}
          {React.Children.map(children, (child) => (
            <div className="carousel-item-fixed">{child}</div>
          ))}
          {React.Children.map(children, (child) => (
            <div className="carousel-item-fixed">{child}</div>
          ))}
        </div>
      </div>

      <button className="carousel-btn right" onClick={() => handleScroll("right")}>
=======
      <button className="carousel-btn left" onClick={() => scroll("left")} aria-label="Scroll Left">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <div className="carousel-container" ref={scrollRef}>
        {children}
      </div>

      <button className="carousel-btn right" onClick={() => scroll("right")} aria-label="Scroll Right">
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
<<<<<<< HEAD
};

const AssetCard = ({ title, description, price, imageUrl }) => (
  <div className="asset-card">
    <div className="asset-img"><img src={imageUrl} alt={title} /></div>
    <div className="asset-info">
      <h4>{title}</h4>
      <p className="description">{description}</p>
      <span className="price">{price}</span>
    </div>
  </div>
);

const SmallAsset = ({ title, price, imageUrl }) => (
  <div className="small-asset-card">
    <div className="small-img"><img src={imageUrl} alt={title} /></div>
    <h5>{title}</h5>
    <span className="price">{price}</span>
  </div>
);

const Artist = ({ name, assets, imageUrl }) => (
  <div className="artist">
    <div className="artist-img">
      <img src={imageUrl} alt={name} />
    </div>
    <h5>{name}</h5>
    <span>{assets}</span>
  </div>
);

const Trending = ({ rank, title, imageUrl }) => (
  <div className="trending-row">
    <div className="rank">{rank}</div>
    <div className="trend-img"><img src={imageUrl} alt={title} /></div>
    <div>
      <h4>{title}</h4>
      <p className="meta">23300 sales · 900 reviews · Rs. 453,000</p>
    </div>
  </div>
);
=======
};
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
