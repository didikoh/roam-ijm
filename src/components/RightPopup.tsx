const RightPopup = () => {
  return (
    <div className="right-popup" aria-label="Right side popup">
      <div className="right-popup__header">BLOCK A</div>

      <div className="right-popup__content">
        <div className="right-popup__section">
          <h1 className="right-popup__section-title">
            Office <span className="right-popup__section-suffix">01</span>
          </h1>
        </div>
        <div className="right-popup__levels">
          <button className="right-popup__level">Level 1</button>
          <button className="right-popup__level">Level 2</button>
          <button className="right-popup__level">Level 3</button>
        </div>

        <div className="right-popup__section">
          <h1 className="right-popup__section-title">
            Retails Shop <span className="right-popup__section-suffix">02</span>
          </h1>
        </div>
        <div className="right-popup__levels">
          <button className="right-popup__level">Level 4</button>
          <button className="right-popup__level">Level 5</button>
        </div>
      </div>
      <div className="right-popup__footer">
        <button className="right-popup__back">Back To Master Plan</button>
      </div>
    </div>
  );
};

export default RightPopup;
