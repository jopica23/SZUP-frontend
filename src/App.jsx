
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import './index.css';
import {routes} from "./api/paths.js";
import {Route, Routes} from "react-router-dom";
import Projects from "./pages/Projects/Projects.jsx";
import Project from "./pages/SingleProject/Project.jsx";
function App() {
  return (
    <>
        <Navbar/>

        <Routes>
            <Route path={routes.HOME} element={<Projects/>} />
            <Route path={`${routes.PROJECT}/:id`} element={<Project/>} />
        </Routes>
    </>
  )
}

export default App
