import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import Milks from "./pages/Milks";

function App() {
  return (
    <div>
      <HashRouter>
        <Header />
        <div className="bg-dark" style={{ width: "100vw", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/order" element={<Order />} />
            <Route path="/milks" element={<Milks />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
