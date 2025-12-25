import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Asset.css";

export default function Asset() {
  const navigate = useNavigate();

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
        <h2 className="section-title">YOUR CREATIONS</h2>
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
      </section>

      <footer className="footer">© Copyright 2025 All rights reserved.</footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

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
    }
  };

  return (
    <div className="carousel-wrappers">
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
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
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