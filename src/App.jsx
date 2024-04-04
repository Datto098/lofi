import "./App.css";
import background from "./assets/background_template/underwater.mp4";
import Background from "./components/background_player/Background";
import Navbar from "./components/controller/Navbar";

function App() {
  return (
    <div className="App">
      {/* Background */}
      <Background background={background} />
      {/* Navbar */}
      <Navbar />
    </div>
  );
}

export default App;
