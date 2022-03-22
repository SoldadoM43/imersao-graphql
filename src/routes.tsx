import { Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Home from "./pages/Home";
import Locations from "./pages/Locations";

const App: React.FC = () => {
return  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="characters" element={<Characters />} />
    <Route path="locations" element={<Locations />} />
    <Route path="episodes" element={<Episodes />} />
  </Routes>
}

export default App;