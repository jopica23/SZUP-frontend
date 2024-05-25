import NewProject from "../../components/NewProject/NewProject.jsx";
import ProjectList from "../../components/SearchProject/ProjectList.jsx";
import {useEffect, useState} from "react";


export default function Projects(){

    const [currUser, setCurrUser]  = useState(1)

    useEffect(() => {
        const currUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currUser){
            setCurrUser(currUser);
        }
    }, []);

    return(
        <div className="flex justify-around">
            <NewProject projectLeader={currUser}/>
            <ProjectList currUserId={currUser} />
        </div>
    )
}