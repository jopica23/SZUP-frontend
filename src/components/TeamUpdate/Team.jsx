import {useEffect, useState} from "react";
import axios from "axios";
import {backendPaths, getAddMemberPath, getRemoveMemberPath} from "../../api/backendPaths.js";
import TeamMemberRow from "./TeamMemberRow.jsx";


export default function Team({team, projectId, userId}) {
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
        <div className="m-2">
            <div className="block rounded-lg text-center shadow-secondary-1 text-surface">
                <div className="border-b-2 border-neutral-100 px-6 py-3">
                    {team.teamName}
                </div>
                <div className="p-6">
                    {team.teamMembers && team.teamMembers.length > 0 &&
                        team.teamMembers.map(member => <TeamMemberRow member={member} handleRemove={handleRemoveMember}/>)

                    }
                </div>
                <div
                    className="border-t-2 border-neutral-100 px-6 py-3 dark:border-white/10 text-surface/75 dark:text-neutral-300">

                </div>
            </div>
        </div>
    )
}