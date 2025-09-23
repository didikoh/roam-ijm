import { useAppContext } from "@context/AppContext";
import { useEffect, useState } from "react";
import { sitePlan } from "../util/blockData";
import { IoCloseCircleOutline } from "react-icons/io5";

const RightPopup = () => {
  const { selectedBlock, selectedUnit, selectedLevel, setSelectedLevel
    , selectedType, setSelectedType, selectedSQFT, setSelectedSQFT,
    resetFilter, setSelectedBlock
  } = useAppContext();
  const [blockInfo, setBlockInfo] = useState<any>(null);
  const allowedValues = [1100, 1200, 1500, 1800];

  useEffect(() => {
    const blockData = sitePlan.buildings.find(b => b.id === selectedBlock);
    console.log('block data', blockData);
    selectedBlock && setBlockInfo(sitePlan.buildings.find(b => b.id === selectedBlock));
  }, [selectedBlock])

  useEffect(() => {
    setSelectedLevel(null);
    setSelectedSQFT(null);
  }, [selectedType])

  const renderLevels = (floors: any[], filterType?: string) => {
    const filteredFloors = filterType
      ? floors.filter(floor => floor.use === filterType)
      : floors;
    return (
      <div className="right-popup__section">
        <h1 className="right-popup__section-title">Levels</h1>
        <div className="right-popup__filter">
          {filteredFloors.map((floor: any) => (
            <button
              key={"Level " + floor.level}
              className={
                "right-popup__filter-button" +
                (selectedLevel === floor.level
                  ? " right-popup__filter-button--active"
                  : "")
              }
              onClick={() => setSelectedLevel(selectedLevel === floor.level ? null : floor.level)}
            >
              Level {floor.label ? floor.label : floor.level}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleCLoseThis = () => {
    resetFilter();
    setSelectedBlock(null);
  }


  return (
    <>
      {selectedBlock && !selectedUnit &&
        <div className="right-popup" aria-label="Right side popup">
          <div className="right-popup__header">{selectedBlock.toUpperCase()}
            <button className="right-popup__close-button" onClick={() => { handleCLoseThis(); }}
              aria-label="Close popup">
              <IoCloseCircleOutline />
            </button>
          </div>
          <div className="right-popup__content">

            {blockInfo && blockInfo.types && blockInfo.types.length > 0 && (
              <div className="right-popup__section">
                <h1 className="right-popup__section-title">Types</h1>
                <div className="right-popup__filter" >
                  {blockInfo.types.map((type: any) => (
                    <button key={type}
                      className={"right-popup__filter-button" + (selectedType === type ? " right-popup__filter-button--active" : "")}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="right-popup__seperator" />
            {blockInfo && blockInfo.floors && blockInfo.floors.length > 0 &&
              renderLevels(blockInfo.floors, selectedType)
            }
            <div className="right-popup__seperator" />
            <div className="right-popup__section">
              <h1 className="right-popup__section-title">Size</h1>
              <div className="right-popup__size" >
                <input
                  type="range"
                  min={0}
                  max={allowedValues.length - 1}
                  step={1}
                  defaultValue={1}
                  value={allowedValues.indexOf(selectedSQFT ?? allowedValues[1])}
                  className="right-popup__range"
                  onChange={e => {
                    setSelectedSQFT(allowedValues[Number(e.target.value)]);
                  }}
                />
                <div className="right-popup__size-labels">
                  <span>{selectedSQFT?.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          </div>
        </div >
      }
    </>
  );
};

export default RightPopup;
