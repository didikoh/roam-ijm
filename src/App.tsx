import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import ChatBot from "./components/ChatBot";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";
import SidePanel from "./components/RightPopup";
import Concept from "./components/Concept";
import Location from "./components/Location";

const App = () => {

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
      <SidePanel />
    </div>
  );
};

export default App;
