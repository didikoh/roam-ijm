import UnitDetail from "@components/UnitDetail";
import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import ChatBot from "./components/ChatBot";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";
import RightPopup from "./components/RightPopup";
import { useAppContext } from "@context/AppContext";

const App = () => {
  const { selectedUnit } = useAppContext();
  return (
    <div className="app">
      <Loading />
      <Logo />
      <BottomMenu />
      <MyScene />
      <Amenities />
      <ChatBot />
      <RightPopup />
      {selectedUnit && <UnitDetail />}
    </div>
  );
};

export default App;
