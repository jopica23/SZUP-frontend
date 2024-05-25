import {useEffect, useState} from "react";
import axios from "axios";
import {backendPaths, getAddMemberPath, getRemoveMemberPath} from "../../api/backendPaths.js";


export default function Team({team, canModify, projectId, userId}) {
    const {id: teamId, teamName, teamMembers} = team
    const leader = teamMembers.find((u) => u.isLeader === true);
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


    const handleAddingMembers = async (memberId) => {
        const parsedMemberId = Number(memberId);

        try {
            const url = getAddMemberPath(projectId, teamId, parsedMemberId, userId)
            const response = await axios.post(url);
            const newMember = response.data.teamMembers[response.data.teamMembers.length - 1]
            let updateMembers = [...teamMembersState, newMember]
            setTeamMembers(updateMembers)
            console.log('Member added successfully:');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    const handleRemoveMember = async (memberId) => {
        const parsedMemberId = Number(memberId);

        try {
            const url = getRemoveMemberPath(projectId, teamId, parsedMemberId, userId);
            await axios.delete(url);
            let updatedMembers = teamMembersState.filter(m => m.id !== parsedMemberId);
            setTeamMembers(updatedMembers);
        } catch (error) {
            console.error('Error removing member:', error);
        }
    };

    return (
        <div className="border border-orange-300">
            <p>Naziv tima: <span>{teamName}</span></p>
            <p>Voditelj tima: <span>{leader.firstName + " " + leader.lastName}</span></p>
            <div className="flex flex-row mb-2">
                <label>Dodaj člana: </label>
                <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="border-2 border-gray-700 w-72 ml-2"
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
                    className="ml-2 px-4 py-2 bg-blue-500 text-white"
                >
                    Dodaj
                </button>
            </div>


            <div className="flex flex-col ml-24">
                {teamMembersState.map(m => (
                    <li key={m.id} className="mb-2 flex justify-between items-center">
                        {m.firstName + " " + m.lastName}
                        <button
                            onClick={() => handleRemoveMember(m.id)}
                            className="ml-4 px-2 py-1 bg-red-500 text-white"
                        >
                            x
                        </button>
                    </li>
                ))}
            </div>

        </div>
    )
}