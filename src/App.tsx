import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import ChatBot from "./components/ChatBot";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";
import RightPopup from "./components/RightPopup";

const App = () => {

  return (
    <div className="app">
      <Loading />
      <Logo />
      <BottomMenu />
      <MyScene />
      <Amenities />
      <ChatBot />
      <RightPopup />
    </div>
  );
};

export default App;
