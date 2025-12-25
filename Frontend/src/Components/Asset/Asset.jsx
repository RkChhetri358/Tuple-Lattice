import React from "react";
import { useNavigate } from "react-router-dom";
import "./Asset.css";

export default function Asset() {
  const navigate = useNavigate();

  return (
    <div className="assets-page">
      {/* ADD ASSETS BUTTON */}
      <div className="add-assets-wrapper">
        <button className="add-assets-btn">
          <span className="plus">+</span> ADD assets
        </button>
      </div>

      {/* YOUR CREATIONS */}
      <section className="section">
        <h2 className="section-title">YOUR CREATIONS</h2>

        <div className="grid-2">
          <AssetCard title="ROCK N ROLL - 2013" price="Rs. 4000" />
          <AssetCard title="Shadow in Dark - 2020" price="Rs. 2000" />
          <AssetCard title="Black Dawns - 2011" price="Rs. 2000" />
          <AssetCard title="Piano Dawns - 2011" price="Rs. 2000" />
        </div>
      </section>

      {/* ASSETS FOR SALE */}
      <section className="section">
        <h2 className="section-title">Assets for Sale</h2>

        <div className="grid-4">
          <SmallAsset title="ROCK N ROLL 2013 - Music" price="Rs. 4000" />
          <SmallAsset title="Shadow in Dark 2020 - Art" price="Rs. 2000" />
          <SmallAsset title="Black Dawns 2011 - Music" price="Rs. 2000" />
          <SmallAsset title="Black Dawns 2011 - Music" price="Rs. 2000" />
        </div>
      </section>

      {/* ARTISTS */}
      <section className="section">
        <h2 className="section-title">ARTISTS</h2>

        <div className="artist-row">
          <Artist name="Sabria Mana" assets="12 assets" />
          <Artist name="Wnchu Kia" assets="9 assets" />
          <Artist name="Kruna Maga" assets="12 assets" />
          <Artist name="Taklle Bhau" assets="12 assets" />
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="section">
        <h2 className="section-title right">
          MOST <span className="red">popular</span>
        </h2>

        <div className="popular-card">
          <div className="popular-img" />
          <div>
            <h3>SHADOW IN THE DARK</h3>
            <p className="meta">
              4500 sales · 200 reviews · Rs. 43,000
            </p>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2 className="section-title">
          <span className="red">Trending</span> in market
        </h2>

        <Trending rank="1st" title="Black Dawns" />
        <Trending rank="2nd" title="Piano Dawns" />
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © Copyright 2025 All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

const AssetCard = ({ title, price }) => (
  <div className="asset-card">
    <div className="asset-img" />
    <div className="asset-info">
      <h4>{title}</h4>
      <span className="price">{price}</span>
    </div>
  </div>
);

const SmallAsset = ({ title, price }) => (
  <div className="small-asset">
    <div className="small-img" />
    <h5>{title}</h5>
    <span className="price">{price}</span>
  </div>
);

const Artist = ({ name, assets }) => (
  <div className="artist">
    <div className="artist-img" />
    <h5>{name}</h5>
    <span>{assets}</span>
  </div>
);

const Trending = ({ rank, title }) => (
  <div className="trending-row">
    <div className="rank">{rank}</div>
    <div className="trend-img" />
    <div>
      <h4>{title}</h4>
      <p className="meta">
        23300 sales · 900 reviews · Rs. 453,000
      </p>
    </div>
  </div>
);
