import {useEffect, useState} from "react";
import axios from "axios";
import {backendPaths, getAddMemberPath, getPathForTeamRemoval, getRemoveMemberPath} from "../../api/backendPaths.js";
import TeamMemberRow from "./TeamMemberRow.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function TeamCard({team, projectId, userId, setProject}) {
    const [users, setAllUsers] = useState([]);
    const [selectedMember, setSelectedMember] = useState("");
    const [teamMembersState, setTeamMembers] = useState(team.teamMembers)
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

    const handleDeleteTeam = async (teamId) => {
        console.log(projectId)
        const url = getPathForTeamRemoval(projectId, teamId)
        try{
            await axios.delete(url)
            setProject(oldProject => {
                const filteredTeams = oldProject.teams.filter(t => t.id !== teamId);
                const newProject = {
                    ...oldProject,
                    teams: filteredTeams
                };
                console.log(newProject);
                return newProject;
            });
        }catch (e){
            console.log("Error while deleting project")
        }

    }

    const handleAddingMembers = async (memberId) => {
        const parsedMemberId = Number(memberId);

        try {
            const url = getAddMemberPath(projectId, team.id, parsedMemberId, userId)
            const response = await axios.post(url);
            console.log(response)
            console.log(response.data.teamMembers)
            setTeamMembers(response.data.teamMembers)
            setSelectedMember("")
            console.log('Member added successfully:');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const handleRemoveMember = async (memberId) => {
        const parsedMemberId = Number(memberId);

        try {
            const url = getRemoveMemberPath(projectId, team.id, parsedMemberId, userId);
            await axios.delete(url);
            setTeamMembers(oldMembers => {
                const copy = [...oldMembers]
                return copy.filter(m => m.id !== parsedMemberId)
            });
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };
    return (
        <div className="max-w-sm m-2 rounded overflow-hidden shadow-xl">
            <div className="block rounded-lg text-center shadow-secondary-1 text-surface">
                <div className="border-b-2 border-neutral-100 px-6 py-3 flex justify-between items-center relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        {team.teamName}
                    </div>
                    {setProject &&
                    <div className="ml-auto">
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="cursor-pointer"
                            onClick={() => handleDeleteTeam(team.id)}
                        />
                    </div>
                    }
                </div>
                <div className="p-6">
                    {teamMembersState && teamMembersState.length > 0 &&
                        teamMembersState.map(member => <TeamMemberRow key={member.id} member={member}
                                                                      handleRemove={projectId && userId ? handleRemoveMember : null}/>)

                    }
                </div>
                {projectId && userId &&
                    <div
                        className="flex flex-col border-t-2 border-neutral-100 px-6 py-3 dark:border-white/10 text-surface/75 dark:text-neutral-300">
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

                            <button
                                onClick={() => handleAddingMembers(selectedMember)}
                                className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}