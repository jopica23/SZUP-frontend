import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Team from "../../components/TeamUpdate/Team.jsx";
import {backendPaths} from "../../api/backendPaths.js";

export default function Project() {
    const {id} = useParams(); // This hook gives you access to the `id` parameter from the URL
    const [currUser, setCurrUser] = useState(undefined);
    const [project, setProject] = useState(undefined);
    const [userRights, setUserRights] = useState(undefined)

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
                console.log(response.data);
                setProject(response.data);
                setUserRights(response.data.userRightsResponseDTO)
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
        <div className="flex">
            <div className="wrapper">
                <h1 className="text-3xl font-bold uppercase">{project.projectName}</h1>
                {/* <p className="text-2xl">Voditelj projekta: <span>{project.projectLeader}</span></p> */}
                <br/>
                <br/>
                {
                    userRights.canModifyTeam ? (
                        <div>
                            <h1 className="text-2xl uppercase">Timovi: </h1>
                            <Team key={project.teamLeaderOf.teamName} team={project.teamLeaderOf} canModify={true}
                                  projectId={id} userId={currUser}/>
                        </div>
                    ) : (
                        <p>You do not have permission to modify the team.</p>
                    )
                }
            </div>
        </div>
    );
}
