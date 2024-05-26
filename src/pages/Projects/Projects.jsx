import NewProject from "../../components/NewProject/NewProject.jsx";
import ProjectList from "../../components/SearchProject/ProjectList.jsx";
import {useContext} from "react";
import {CurrUserContext} from "../../context/CurrUserContext.jsx";


export default function Projects(){


    return(
        <div className="flex justify-around">
            <NewProject />
            <ProjectList  />
        </div>
    )
}