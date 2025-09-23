import { useAppContext } from "@context/AppContext";
import { useEffect, useState } from "react";

const block = [
  { name: "Block A", offices: ["Level 1", "Level 2", "Level 3"], retails: ["Level 4", "Level 5"] },
  { name: "Block B" },
  { name: "Block C", offices: ["Level 1", "Level 2", "Level 3"], retails: ["Level 4", "Level 5"] },
  { name: "Block D" }
]

const RightPopup = () => {
  const { selectedBlock, selectedUnit, selectedLevel, setSelectedLevel } = useAppContext();
  const [blockInfo, setBlockInfo] = useState<any>(null);

  useEffect(() => {
    selectedBlock && setBlockInfo(block.find(b => b.name === selectedBlock));
  }, [selectedBlock])

  useEffect(() => {
    console.log('blocked info', blockInfo);
  }, [blockInfo])
  

  return (
    <>
      {selectedBlock && !selectedUnit &&
        <div className="right-popup" aria-label="Right side popup">
          <div className="right-popup__header">{selectedBlock.toUpperCase()}</div>

          <div className="right-popup__content">
            <div className="right-popup__section">
              <h1 className="right-popup__section-title">
                Office
              </h1>
            </div>
            <div className="right-popup__levels">
              <button className="right-popup__level">Level 1</button>
              <button className="right-popup__level">Level 2</button>
              <button className="right-popup__level">Level 3</button>
            </div>

            <div className="right-popup__section">
              <h1 className="right-popup__section-title">
                Retails Shop
              </h1>
            </div>
            <div className="right-popup__levels">
              <button className="right-popup__level">Level 4</button>
              <button className="right-popup__level">Level 5</button>
            </div>

            {blockInfo && blockInfo.maps((section: any, index: number) => (
              <div key={index} className="right-popup__section">
                <h1 className="right-popup__section-title">
                  {section.name}
                </h1>
                <div className="right-popup__levels">
                  {section.levels.map((level: string, idx: number) => (
                    <button
                      key={idx}
                      className={`right-popup__level ${selectedLevel === level ? 'right-popup__level--active' : ''}`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          </div>
          <div className="right-popup__footer">
            <button className="right-popup__back">Back To Master Plan</button>
          </div>
        </div>
      }
    </>
  );
};

export default RightPopup;
