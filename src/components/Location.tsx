import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const Location = () => {
  const { activatedMenu, setActivatedMenu } = useAppContext();
  const [selectedLocation, setSelectedLocation] = useState("map");

  if (activatedMenu !== "location") return null;

  return (
    <section className="location">
      <button
        className="location-close"
        onClick={() => setActivatedMenu("")}
        aria-label="Close location panel"
      >
        X
      </button>
      <div className="location-container">
        <div className="location-left">
          <div className="location-left__logoWrap">
            <img
              src="/ROAM Logo color version-03.png"
              alt="ROAM Logo"
              className="location-left__logo"
            />
          </div>
          <div className="location-left__divider" />
          <div className="location-left__nav">
            <button
              className={`location-nav-item ${
                selectedLocation === "map" ? "active" : ""
              }`}
              onClick={() => setSelectedLocation("map")}
            >
              <span className="location-nav-text">Map</span>
              <span className="location-nav-number">01</span>
            </button>
            <button
              className={`location-nav-item ${
                selectedLocation === "location" ? "active" : ""
              }`}
              onClick={() => setSelectedLocation("location")}
            >
              <span className="location-nav-text">Location</span>
              <span className="location-nav-number">02</span>
            </button>
            <button
              className={`location-nav-item ${
                selectedLocation === "360 Location" ? "active" : ""
              }`}
              onClick={() => setSelectedLocation("360 Location")}
            >
              <span className="location-nav-text">360 Location</span>
              <span className="location-nav-number">03</span>
            </button>
          </div>
        </div>

        <div className="location-right">
          {selectedLocation === "map" && (
            <>
              <div className="location-right__main">
                <img
                  src="/roam-map 1.png"
                  alt="Map"
                  className="location-right__map"
                />
                <div className="location-right__content">
                  <h2 className="location-right__title">Masterplan</h2>
                  <div className="location-right__text">
                    <p>
                      IJM Rimbayu is a premier township development where
                      sustainability and progress come together.
                    </p>
                    <p>
                      It blends residential, commercial and industrial spaces
                      with modern infrastructure, recreational and parkland
                      components nestled in tranquil green surroundings, and
                      lifestyle amenities — creating a vibrant yet balanced hub
                      for living and business.
                    </p>
                    <p>
                      Take your business to new heights, where work and leisure
                      coexist effortlessly.
                    </p>
                  </div>
                <div className="location-right__gallery">
                  <img src="/image 15.png" alt="Completed" />
                  <img src="/image 16.png" alt="Under construction" />
                  <img src="/image 17.png" alt="New launch" />
                </div>
                </div>
              </div>
            </>
          )}
          {selectedLocation === "location" && (
            <div className="location-right__main">
              <img
                src="/location-statistic.png"
                alt="Location"
                className="location-right__statistic"
              />
              <div className="location-right__content">
                <h2 className="location-right__title">Location</h2>
                <div className="location-right__text">
                  <p>
                  ROAM consists of four blocks that integrate retail, office, and lifestyle spaces, designed for flexibility and modern urban living. It is surrounded by well-established commercial centres (Blossom Square and Blossom Drive) and strategically located near residential areas and future light industry zones, offering professionals and families a convenient workplace and commute. 
                  </p>
                  <p>
                  Every detail at ROAM is designed as an ecosystem, where each element enhances your lifestyle and supports your ambitions. Be a smart investor, a savvy business owner.
                  </p>
                  <p>
                  Be in your own comfortable space where you call all the shots and create your identity. Be right at the entrance of a thriving, modern township, with prime visibility and exposure.
                  </p>
                  <p>
                  Be the first, to own this unprecedented commercial property in IJM Rimbayu – a once-in-a-lifetime opportunity not to be missed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Location;
