import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserTasksForProject} from "../../api/backendPaths.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskModal from "./TaskModal.jsx";


export default function TaskPanel({projectId, userId}) {
    const [createdTasks, setCreatedTasks] = useState([])
    const [myTasks, setMyTasks] = useState([])
    const [isModalActive, setIsModalActive] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = getUserTasksForProject(projectId, userId)
                const response = await axios.get(url);
                const data = response.data
                setCreatedTasks(data.taskOwner)
                setMyTasks(data.taskToSolve)
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        if (userId) {
            fetchTasks();
        }
    }, []);

    const openModal = () => {
        setIsModalActive(true)
    }

    return (
        <div>
            <div className="relative min-h-screen">
                <button
                    onClick={openModal}
                    className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            {isModalActive && <TaskModal setModal={setIsModalActive} projectId={projectId} userId={userId}/>}
        </div>
    );
}
