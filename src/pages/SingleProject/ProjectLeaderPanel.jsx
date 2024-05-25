import React, {useEffect, useState} from "react";
import TeamCard from "../../components/TeamUpdate/TeamCard.jsx";
import {backendPaths, getPathForNewTeamCreation} from "../../api/backendPaths.js";
import axios from "axios";

export default function ProjectLeaderPanel({setProject, teams, projectName, projectId}) {
    const [selectedMember, setSelectedMember] = useState("");
    const [teamName, setTeamName] = useState("");
    const [users, setAllUsers] = useState([]);
    const handleInputChange = (e) => {
        const value = e.target.value
        setTeamName(value)
    }
    const handleAddTeam = async () => {
        const teamLeaderId = Number(selectedMember);
        const newTeamData = {
            teamLeaderId,
            teamName
        }

        try {
            const url = getPathForNewTeamCreation(projectId)
            const response = await axios.post(url, newTeamData);
            setProject(oldProject => {
                const newTeams = [...oldProject.teams]
                newTeams.push(response.data)
                return {
                    ...oldProject,
                    teams: newTeams
                }
            })
        } catch (e) {
            console.log("Error occurred:", e)
        }

    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(backendPaths.ALL_USERS);
                setAllUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-xl font-bold mb-4">{projectName}</div>
            <div className="grid grid-cols-3 gap-4">
                {teams && teams.map(team => (
                    <TeamCard key={team.id} team={team} projectId={projectId} userId={null} canDeleteTeam={true}
                              setProject={setProject}/>
                ))}

                <div className="flex-col justify-center max-w-sm m-2 rounded overflow-hidden shadow-xl">
                    <div
                        className="flex flex-col border-t-2 border-neutral-100 px-6 py-3 dark:border-white/10 text-surface/75 dark:text-neutral-300">
                        <div>
                            <label htmlFor="first_name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime
                                tima</label>
                            <input
                                type="text"
                                id="first_name"
                                value={teamName}
                                onChange={(e) => handleInputChange(e)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Ime tima"
                                required
                            />
                        </div>

                        <label htmlFor="countries"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Odaberi
                            novog člana ekipe</label>
                        <div className="flex">
                            <select
                                value={selectedMember}
                                onChange={(e) => setSelectedMember(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled>Odaberi</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName + " " + user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddTeam}
                            className="mt-5 ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                            Dodaj
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
