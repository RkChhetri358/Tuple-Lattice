import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Asset.css";

export default function Asset() {
  const navigate = useNavigate();

  return (
    <div className="assets-page">
      {/* ADD ASSETS BUTTON */}
      <div className="add-assets-wrapper">
        <button className="add-assets-btn">
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

      {/* MOST POPULAR & TRENDING (Kept as is) */}
      <section className="section">
        <h2 className="section-title right">MOST <span className="red">popular</span></h2>
        <div className="popular-card">
          <div className="popular-img"><img src="/2.png" alt="popular" /></div>
          <div>
            <h3>SHADOW IN THE DARK</h3>
            <p className="meta">4500 sales · 200 reviews · Rs. 43,000</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title"><span className="red">Trending</span> in market</h2>
        <Trending rank="1st" title="Black Dawns" imageUrl="/3.png" />
        <Trending rank="2nd" title="Piano Dawns" imageUrl="/4.png" />
      </section>

      <footer className="footer">© Copyright 2025 All rights reserved.</footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

const Carousel = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      const contentWidth = scrollWidth / 3; // Each set takes 1/3 of total width (we have 3 copies)

      if (direction === "left") {
        const newScrollLeft = scrollLeft - scrollAmount;
        
        scrollRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });

        // If we've scrolled too far left, jump to equivalent position in middle set
        setTimeout(() => {
          if (scrollRef.current && scrollRef.current.scrollLeft < contentWidth * 0.5) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + contentWidth;
          }
        }, 300);
      } else {
        const newScrollLeft = scrollLeft + scrollAmount;
        
        scrollRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });

        // If we've scrolled too far right, jump to equivalent position in middle set
        setTimeout(() => {
          if (scrollRef.current && scrollRef.current.scrollLeft > contentWidth * 1.5) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - contentWidth;
          }
        }, 300);
      }
    }
  };

  // Start at the middle set on mount
  React.useEffect(() => {
    if (scrollRef.current) {
      const contentWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = contentWidth;
    }
  }, []);

  return (
    <div className="carousel-wrappers">
      <button 
        className="carousel-btn left" 
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <div className="carousel-container" ref={scrollRef}>
        {children}
        {children}
        {children}
      </div>

      <button 
        className="carousel-btn right" 
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
      >
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