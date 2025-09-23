import { useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";
import { unitData } from "../util/unitData";
import { IoCloseCircleOutline } from "react-icons/io5";

const UnitDeatil = () => {
    const { selectedUnit, setSelectedUnit } = useAppContext();
    const [plotData, setPlotData] = useState<any>(null)

    if (!selectedUnit) return null; // 如果没有选中的商店，则不渲染组件

    // Get plot data based on selectedStore unit

    useEffect(() => {
        const data = unitData.filter((unit) => unit.id === selectedUnit)[0];
        console.log("Selected Unit Data:", data);
        if (data) {
            setPlotData(data);
        }
    }, [selectedUnit])

    return (
        <div className="store-details-overlay">
            <div className="store-details-panel">
                {/* Header */}
                <div className="store-details-header">
                    <h2 className="store-details-title">{plotData ? plotData.id : ""}</h2>
                    <button className="store-details-close" onClick={() => setSelectedUnit(null)}>
                        <IoCloseCircleOutline />
                    </button>
                </div>

                {/* Content */}
                <div className="store-details-content">
                    <div className="store-details-section">
                        <h3 className="section-title">Details</h3>

                        <div className="detail-item">
                            <span className="detail-label">Size (Sqft)</span>
                            <span className="detail-value">{plotData ? plotData.sqft : ""}</span>
                        </div>
                    </div>

                    <div className="store-details__seperator" />

                    {/* Floor Plans */}
                    <div className="store-details-section">
                        <div className="floor-plan-header">
                            <h3 className="section-title">Floor Plan</h3>
                        </div>

                        <div className="floor-plan-container">
                            <div className="floor-plan-image">
                                <img
                                    src=""
                                    alt="Floor Plan"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Book Button */}
                <div className="store-details-footer">
                    <button className="book-button" onClick={() => console.log('Book unit:', selectedUnit)}>
                        BOOK NOW
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UnitDeatil