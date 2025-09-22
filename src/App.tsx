import Amenities from "./components/Amenities";
import BottomMenu from "./components/BottomMenu";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import MyScene from "./components/MyScene";

const App = () => {

  return (
    <div className="app">
      <Loading />
      <Logo />
      <BottomMenu />
      <MyScene />
      <Amenities />
    </div>
  );
};

export default App;
