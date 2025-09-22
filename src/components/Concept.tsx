import { useAppContext } from "../context/AppContext";

const Concept = () => {
  const { activeMenu } = useAppContext();

  if (activeMenu !== 'concept') return null;

  return (
    <div className="concept-floating" aria-label="Concept floating panel">
      <div className="concept-floating__box">
        <div className="concept-floating__left"></div>
        <div className="concept-floating__right"></div>
      </div>
    </div>
  );
};

export default Concept;


