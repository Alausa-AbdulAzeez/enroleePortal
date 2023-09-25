import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Benefits from "./pages/Benefits";
import Hospitals from "./pages/Hospitals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={NotFound} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/profile" Component={Profile} />
        <Route path="/benefits" Component={Benefits} />
        <Route path="/hospitals" Component={Hospitals} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

