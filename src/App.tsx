import UnitDetail from "@components/UnitDetail";
import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import ChatBot from "./components/ChatBot";
import Gallery from "./components/Gallery";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";
import RightPopup from "./components/RightPopup";
import { useAppContext } from "@context/AppContext";
import Concept from "./components/Concept";
import Location from "./components/Location";

const App = () => {
  const { selectedUnit } = useAppContext();
  return (
    <div className="app">
      <Loading />
      <Logo />
      <BottomMenu />
      <MyScene />
      <Amenities />
      <Concept />
      <Location />
      <ChatBot />
      <RightPopup />
      <Gallery />
      {selectedUnit && <UnitDetail />}
    </div>
  );
};

export default App;
