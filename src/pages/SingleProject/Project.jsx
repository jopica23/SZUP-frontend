import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import TeamCard from "../../components/TeamUpdate/TeamCard.jsx";
import {backendPaths} from "../../api/backendPaths.js";
import Tab from "../../components/Tab/Tab.jsx";
import ProjectLeaderPanel from "./ProjectLeaderPanel.jsx";
import TeamLeaderPanel from "./TeamLeaderPanel.jsx";
import TaskPanel from "./TaskPanel.jsx";

export default function Project() {
    const {id} = useParams(); // This hook gives you access to the `id` parameter from the URL
    const [currUser, setCurrUser] = useState(undefined);
    const [project, setProject] = useState(undefined);
    const [userRights, setUserRights] = useState(undefined)
    const [active, setActive] = useState(2)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currUser) {
            setCurrUser(storedUser);
        } else {
            setCurrUser(1)
        }
    }, []);


    useEffect(() => {

        const fetchProject = async () => {
            try {
                const response = await axios.get(`${backendPaths.PROJECT}/${id}/user/${currUser}`);
                const project = response.data
                const userRights = project.userRightsResponseDTO
                setProject(project);
                setUserRights(userRights)
                if (userRights.canModifyProject){
                    setActive(0)
                }else if (userRights.canModifyTeam){
                    setActive(1)
                }else {
                    setActive(2)
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        if (currUser) {
            fetchProject();
        }

    }, [currUser, id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <Tab active={active} setActive={setActive} userRights={userRights}/>
            </div>
            <div>
                {active === 0 && userRights.canModifyProject && <ProjectLeaderPanel teams={project.teams} projectName={project.projectName}/>}
                {active === 1 && userRights.canModifyTeam &&
                    <TeamLeaderPanel
                        myTeam={project.teamLeaderOf}
                        projectId={project.id}
                        currUser={currUser}
                    />
                }
                {active === 2 && <TaskPanel/>}
            </div>
        </div>
    );
}
