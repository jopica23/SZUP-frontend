import {useEffect, useState} from "react";
import axios from "axios";
import {backendPaths} from "../../api/backendPaths.js";

// eslint-disable-next-line react/prop-types
export default function NewTeam({ index, team, handleTeamNameChange, handleTeamLeaderChange, removeTeam }) {
    const [users, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(backendPaths.ALL_USERS);
                setAllUsers(response.data);
                console.log('Users fetched successfully');
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    //console.log(users)

    return (
        <div className="flex flex-col border p-2 my-2">
            <div className="flex flex-row mb-2">
                <label className="mr-3">Naziv tima: </label>
                <input
                    type="text"
                    value={team.teamName}
                    onChange={(e) => handleTeamNameChange(e.target.value)}
                    required
                    className="border-2 border-gray-700 w-72 ml-2"
                />
            </div>
            <div className="flex flex-row mb-2">
                <label>Voditelj tima: </label>
                <select
                    value={team.teamLeader}
                    onChange={(e) => handleTeamLeaderChange(e.target.value)}
                    required
                    className="border-2 border-gray-700 w-72 ml-2"
                >
                    <option value="" disabled>Odaberi</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstName + " " + user.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <button type="button" className="bg-red-500" onClick={removeTeam}>
                Ukloni tim
            </button>
        </div>
    );
};



