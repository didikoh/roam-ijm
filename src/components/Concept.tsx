import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const Concept = () => {
  const { activatedMenu, setActivatedMenu } = useAppContext();
  const [selectedConcept, setSelectedConcept] = useState("introduction");

  if (activatedMenu !== "concept") return null;

  return (
    <section className="concept">
      <button
        className="concept-close"
        onClick={() => setActivatedMenu("")}
        aria-label="Close concept panel"
      >
        x
      </button>
      <div className="concept-container">
        <div className="concept-left">
          <div className="concept-left__logoWrap">
            <img
              src="/ROAM Logo color version-03.png"
              alt="ROAM Logo"
              className="concept-left__logo"
            />
          </div>
          <div className="concept-left__divider" />
          <div className="concept-left__nav">
            <button
              className={`concept-nav-item ${
                selectedConcept === "introduction" ? "active" : ""
              }`}
              onClick={() => setSelectedConcept("introduction")}
            >
              <span className="concept-nav-text">Introduction</span>
              <span className="concept-nav-number">01</span>
            </button>
            <button
              className={`concept-nav-item ${
                selectedConcept === "connect" ? "active" : ""
              }`}
              onClick={() => setSelectedConcept("connect")}
            >
              <span className="concept-nav-text">Connect</span>
              <span className="concept-nav-number">02</span>
            </button>
            <button
              className={`concept-nav-item ${
                selectedConcept === "explore" ? "active" : ""
              }`}
              onClick={() => setSelectedConcept("explore")}
            >
              <span className="concept-nav-text">Explore</span>
              <span className="concept-nav-number">03</span>
            </button>
            <button
              className={`concept-nav-item ${
                selectedConcept === "belong" ? "active" : ""
              }`}
              onClick={() => setSelectedConcept("belong")}
            >
              <span className="concept-nav-text">Belong</span>
              <span className="concept-nav-number">04</span>
            </button>
          </div>
        </div>

        <div className="concept-right">
          {selectedConcept === "introduction" && (
            <>
              <img
                src="/brochure 1.png"
                alt="Brochure"
                className="concept-right__brochure"
              />
              <div className="concept-right__content">
                <h2 className="concept-right__title">Step up your game.</h2>
                <div className="concept-right__text">
                  <p>The first of its kind in IJM Rimbayu, ROAM is poised to become a dynamic commercial destination, designed to cater to the entrepreneurial spirit of the township.</p>
                  <p>At ROAM, you're not just investing in a unit - you're stepping into a future-ready commercial environment designed to ignite ambition, foster creativity, and fuel long-term growth.</p>
                  <p>From stylish storefronts to smart office layouts, every element is tailored to meet the evolving demands of modern businesses. So go ahead - update your dreams, refine your ambitions, and elevate your business model. ROAM at IJM Rimbayu is where your entrepreneurial journey begins.</p>
                </div>
              </div>
            </>
          )}
          {selectedConcept === "connect" && (
            <>
              <img
                src="/brochure 2.png"
                alt="Brochure"
                className="concept-right__brochure"
              />
              <div className="concept-right__content">
                <h2 className="concept-right__title">Step out & Be you.</h2>
                <div className="concept-right__text">
                  <p>Finally, a catalyst to bring your entrepreneurial dream to life, where passion and expertise bring in returns. </p>
                  <p>A dynamic commercial hun with likeminded peers and partners, inspiring stories, modern facilities, and ready market catchment.</p>
                  <p>Here, work sparks creativity, business drives innovation, play fuels connection, and sustainable living comes to life in a vibrant, ever-evolving environment.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Concept;
