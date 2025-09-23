import amenityAll from "@assets/amenities/amenity_all.webp";
import amenityCommercial from "@assets/amenities/amenity_commercial.webp";
import amenityEducation from "@assets/amenities/amenity_education.webp";
import amenityMedical from "@assets/amenities/amenity_medical.webp";
import amenityTransport from "@assets/amenities/amenity_transport.webp";
import { useAppContext } from "../context/AppContext";

type AmenityType =
  | "all"
  | "commercial"
  | "medical"
  | "education"
  | "transport"
  | "distance"
  | null;

interface AmenityButton {
  id: AmenityType;
  label: string;
  image: string;
  alt: string;
}

const amenityButtons: AmenityButton[] = [
  {
    id: "commercial",
    label: "COMMERCIAL",
    image: amenityCommercial,
    alt: "commercial",
  },
  {
    id: "medical",
    label: "MEDICAL",
    image: amenityMedical,
    alt: "medical",
  },
  {
    id: "education",
    label: "EDUCATION",
    image: amenityEducation,
    alt: "education",
  },
  {
    id: "transport",
    label: "TRANSPORT",
    image: amenityTransport,
    alt: "transport",
  },
  {
    id: "all",
    label: "SHOW ALL",
    image: amenityAll,
    alt: "show-all",
  }
];

const Amenities = () => {
  const { isFocused,activeAmenity,setActiveAmenity } = useAppContext();

  const handleAmenityClick = (amenity: AmenityType) => {
    if (activeAmenity === amenity) {
      setActiveAmenity(null)
    } else {
     setActiveAmenity(amenity)
    }
  };

  return (
    <>
      {!isFocused && (
        <div className="amenities">
          <div className="amenities__container">
            {amenityButtons.map((button) => (
              <button
                key={button.id}
                className={`amenity ${activeAmenity === button.id ? "active" : ""
                  }`}
                onClick={() => handleAmenityClick(button.id)}
              >
                <img src={button.image} alt={button.alt} />
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Amenities;
