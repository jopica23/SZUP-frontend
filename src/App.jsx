
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import './index.css';
import {routes} from "./api/paths.js";
import {Route, Routes} from "react-router-dom";
import Projects from "./pages/Projects/Projects.jsx";
function App() {
  return (
    <>
        <Navbar/>

        <Routes>
            <Route path={routes.PROJECT} element={<Projects/>} />
        </Routes>
    </>
  )
}

export default App
