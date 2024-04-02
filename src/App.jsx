import "./App.css";
import background from "./assets/background_template/underwater.mp4";
import background_light from "./assets/background_template/studio_day.mp4";
import Background from "./components/background_player/Background";

function App() {
  return (
    <div className="App">
      {/* Background */}
      <Background background={background} />
    </div>
  );
}

export default App;
