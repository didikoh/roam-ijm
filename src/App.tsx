import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";
import RightPopup from "./components/RightPopup";
import Concept from "./components/Concept";

const App = () => {

  return (
    <div className="app">
      <Loading />
      <Logo />
      <BottomMenu />
      <MyScene />
      <Amenities />
      <Concept />
      <RightPopup />
    </div>
  );
};

export default App;
