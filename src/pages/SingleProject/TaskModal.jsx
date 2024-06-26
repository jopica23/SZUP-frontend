import React, {useEffect, useState} from "react";

import axios from "axios";
import Modal from "../../components/Modal/Modal.jsx";
import {
    backendPaths,
    createTaskPath,
    getMembersForATeam,
    getTeamsForProject,
    taskRUDPath, updateSolverPath
} from "../../api/backendPaths.js";

// eslint-disable-next-line react/prop-types
export default function TaskModal({task, closeModal, projectId, userId, isUpdate, setCreatedTasks}) {
    const [taskName, setTaskName] = useState(task ? task.taskName : "");
    const [taskEndDate, setTaskEndDate] = useState(task ? task.taskEndDate : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [taskSolverId, setTaskSolverId] = useState(task ? task.taskSolver.id : 0);
    const [taskPriorityId, setTaskPriorityId] = useState(task ? task.priority.id : 0);
    const [statusId, setStatusId] = useState(task ? task.currentStatus.id : 0);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(task ? task.solverTeamId : null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        axios.get(getTeamsForProject(projectId)).then((response) => {
            setTeams(response.data);
        });

        axios.get(backendPaths.GET_PRIORITIES).then((response) => {
            setPriorities(response.data);
        });

        axios.get(backendPaths.GET_STATUSES).then((response) => {
            setStatuses(response.data);
        });

    }, []);

    useEffect(() => {
        if (selectedTeam) {
            axios.get(getMembersForATeam(selectedTeam)).then((response) => {
                setTeamMembers(response.data);
            });
        }
    }, [selectedTeam]);

    const handleSubmit = async () => {
        if (!isUpdate) {
            const finalTaskEndDate = taskEndDate === '' ? null : taskEndDate
            const newTask = {
                taskName,
                taskEndDate: finalTaskEndDate,
                description,
                numberOfHours: 0,
                taskOwnerId: userId,
                taskSolverId,
                taskPriorityId
            };

            try {
                axios.post(createTaskPath(projectId, selectedTeam), newTask)
                    .then(res => res.data)
                    .then(data => {
                        closeModal()
                        console.log(data)
                        setCreatedTasks(old => [...old, data])
                    })
            } catch (e) {
                console.log(e)
            }
        } else {
            let finalTaskEndDate = null
            if(taskEndDate && taskEndDate !== '' && !taskEndDate.includes('T')){
                let split = taskEndDate.split(" ")
                finalTaskEndDate = split[0] + 'T' + split[1]
            }
            const updateData = {
                taskName,
                taskEndDate: finalTaskEndDate,
                description,
                priorityId: taskPriorityId
            }


            await axios.put(taskRUDPath(task.id), updateData)

            if (task.currentStatus.id !== statusId) {
                const statusUpdateData = {
                        taskId: task.id,
                        updatedByUserId: userId,
                        newTaskStatusId: statusId
                    }
                await axios.put(backendPaths.UPDATE_STATUS, statusUpdateData)
            }

            if (taskSolverId !== task.taskSolver.id){
                const statusUpdateData = {
                    newTeamId: selectedTeam,
                    newTaskSolverId: taskSolverId,
                    changedById: userId
                }
                await axios.put(updateSolverPath(projectId, task.id), statusUpdateData)
            }

            closeModal()
        }

    }


return (
    <Modal>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Novi zadatak
            </h3>
            <button type="button"
                    onClick={() => closeModal()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
            <div className="p-4 md:p-5 space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
                        Naslov zadatka
                    </label>
                    <input
                        id="taskName"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskEndDate">
                        Krajnji rok
                    </label>
                    <input
                        id="taskEndDate"
                        type="datetime-local"
                        value={taskEndDate}
                        onChange={(e) => setTaskEndDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Opis
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskPriorityId">
                        Prioritet
                    </label>
                    <select
                        id="taskPriorityId"
                        value={taskPriorityId}
                        onChange={(e) => setTaskPriorityId(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Odaberite prioritet</option>
                        {priorities && priorities.map(p => <option key={p.id}
                                                                   value={p.id}>{p.priorityName}</option>)}
                    </select>
                </div>
                {isUpdate &&
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskPriorityId">
                            Status
                        </label>
                        <select
                            id="taskPriorityId"
                            value={statusId}
                            onChange={(e) => setStatusId(Number(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Odaberite status</option>
                            {statuses && statuses.map(s => <option key={s.id} value={s.id}>{s.statusName}</option>)}
                        </select>
                    </div>
                }
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedTeam">
                        Tim
                    </label>
                    <select
                        id="selectedTeam"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Team</option>
                        {teams.map((team) => (
                            <option selected={selectedTeam == team.id} key={team.id} value={team.id}>
                                {team.teamName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskSolverId">
                        Izvršitelj zadatka
                    </label>
                    <select
                        id="taskSolverId"
                        value={taskSolverId}
                        onChange={(e) => setTaskSolverId(Number(e.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Solver</option>
                        {teamMembers.map((member) => (
                            <option selected={taskSolverId == member.id} key={member.id} value={member.id}>
                                {member.firstName + " " + member.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSubmit}
            >
                {isUpdate ? 'Spremi' : 'Stvori'}
            </button>
        </div>
    </Modal>
);
}
