import {useState} from "react";
import axios from 'axios';
import {backendPaths} from "../../api/backendPaths.js";
import NewTeam from "./NewTeam.jsx";

// eslint-disable-next-line react/prop-types
export default function NewProject({projectLeader}) {
    const [projectName, setProjectName] = useState('');
    const [teams, setTeams] = useState([
        {
            teamName: '',
            teamLeaderId: 1
        }
    ]);

    const handleProjectNameChange = (e) => setProjectName(e.target.value);

    const handleTeamNameChange = (index, value) => {
        const newTeams = [...teams];
        newTeams[index].teamName = value;
        setTeams(newTeams);
    };

    const handleTeamLeaderChange = (index, value) => {
        const newTeams = [...teams];
        newTeams[index].teamLeaderId = value
        setTeams(newTeams);
    };

    const addTeam = () => {
        setTeams([...teams, { teamName: '', teamLeaderId: '' }]);
    };

    const removeTeam = (index) => {
        const newTeams = teams.filter((_, i) => i !== index);
        setTeams(newTeams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {projectName:projectName, createdById: projectLeader, teams: teams};
        console.log(payload)
        try {
            const response = await axios.post(backendPaths.NEW_PROJECT, payload);
            console.log('Project created successfully:', response.data);
        } catch (error) {
            console.error('Error creating project:', error);
        }
        setProjectName('')
        setTeams([
            {
                teamName: '',
                teamLeaderId: 1
            }
        ])
    };

    return (
        <div className="w-1/3">
            <h1>STVORI NOVI PROJEKT</h1>
            <form onSubmit={handleSubmit} className="flex flex-col  border-4">
                <div className="flex">
                    <label className="font-bold">Naziv projekta:</label>
                    <input
                        className="border-2 border-gray-700 w-72 ml-2"
                        type="text"
                        value={projectName}
                        onChange={handleProjectNameChange}
                        required
                    />
                </div>

                {teams.map((team, index) => (
                    <NewTeam
                        key={index}
                        index={index}
                        team={team}
                        handleTeamNameChange={(value) => handleTeamNameChange(index, value)}
                        handleTeamLeaderChange={(value) => handleTeamLeaderChange(index, value)}
                        removeTeam={() => removeTeam(index)}
                    />
                ))}

                <button type="button" className="bg-blue-300" onClick={addTeam}> + Dodaj tim</button>
                <button type="submit" className="bg-amber-500"> Spremi projekt</button>
            </form>
        </div>

    );
}
