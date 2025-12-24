import React from "react";
import { useNavigate } from "react-router-dom";
import "./Asset.css";

/* ICONS */
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
const ShoppingCartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15" />
  </svg>
);

/* DATA */
const myCreations = [
  { id: 1, title: "ROCK N ROLL", year: 2013, type: "Music", price: 4000, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200" },
  { id: 2, title: "Shadow in Dark", year: 2020, type: "Music", price: 2000, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200" },
  { id: 3, title: "Black Dawns", year: 2011, type: "Music", price: 2000, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
  { id: 4, title: "Piano Dawns", year: 2011, type: "Music", price: 2000, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=200" },
];

const mostPopular = {
  title: "SHADOW IN THE DARK",
  sales: 1500,
  reviews: 20,
  earnings: 43000,
  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200",
};

const trending = [
  { rank: "1st", title: "Black Dawns", sales: 23300, reviews: 900, earnings: 453000, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200" },
  { rank: "2nd", title: "Piano Dawns", sales: 23300, reviews: 900, earnings: 453000, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=200" },
];

const Asset = () => {
  const navigate = useNavigate();

  return (
    <div className="asset-page">

      {/* ADD ASSETS */}
      <div className="add-assets-btn-wrapper">
        <button className="add-assets-btn" onClick={() => navigate("/layout/addasset")}>
          <span className="add-assets-btn__icon"><PlusIcon /></span>
          <span><strong>ADD</strong> assets</span>
        </button>
      </div>

      {/* YOUR CREATIONS */}
      <section className="section">
        <h2 className="section__title">YOUR CREATIONS</h2>
        <div className="creations-list">
          {myCreations.map(a => (
            <div key={a.id} className="creation-item">
              <img src={a.image} alt={a.title} className="creation-item__image" />
              <div>
                <h3>{a.title} - {a.year}</h3>
                <p className="creation-item__type">{a.type}</p>
                <p className="creation-item__price">Rs. {a.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="section">
        <h2 className="section__title"><strong>MOST</strong> popular ✨</h2>

        <div className="popular-content">
          <img src={mostPopular.image} alt="" className="popular-content__image" />
          <div>
            <h3 className="popular-content__title">{mostPopular.title}</h3>

            <div className="popular-content__stats">
              <span className="stat"><ShoppingCartIcon /> {mostPopular.sales} sales</span>
              <span className="stat"><StarIcon /> {mostPopular.reviews} reviews</span>
              <span className="stat"><WalletIcon /> Rs. {mostPopular.earnings}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2 className="trending-header">Trending in market <span className="highlight">🔥</span></h2>

        <div className="trending-list">
          {trending.map(t => (
            <div key={t.rank} className="trending-item">
              <span className="trending-item__rank">{t.rank}</span>
              <img src={t.image} alt="" className="trending-item__image" />

              <div>
                <h3 className="trending-item__title">{t.title}</h3>
                <div className="trending-item__stats">
                  <span>{t.sales} sales</span>
                  <span>{t.reviews} reviews</span>
                  <span>Rs. {t.earnings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <img src="/UTA.png" alt="UTA" className="footer__logo" />
        <p className="footer__copyright">© Copyright 2025 All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Asset;
