const SidePanel = () => {
  return (
    <div className="side-panel" aria-label="Side panel">
      <div className="side-panel__header">BLOCK A</div>

      <div className="side-panel__content">
        <div className="side-panel__section">
          <h1 className="side-panel__section-title">
            Office <span className="side-panel__section-suffix">01</span>
          </h1>
        </div>
        <div className="side-panel__levels">
          <button className="side-panel__level">Level 1</button>
          <button className="side-panel__level">Level 2</button>
          <button className="side-panel__level">Level 3</button>
        </div>

        <div className="side-panel__section">
          <h1 className="side-panel__section-title">
            Retails Shop <span className="side-panel__section-suffix">02</span>
          </h1>
        </div>
        <div className="side-panel__levels">
          <button className="side-panel__level">Level 4</button>
          <button className="side-panel__level">Level 5</button>
        </div>
      </div>
      <div className="side-panel__footer">
        <button className="side-panel__back">Back To Master Plan</button>
      </div>
    </div>
  );
};

export default SidePanel;
