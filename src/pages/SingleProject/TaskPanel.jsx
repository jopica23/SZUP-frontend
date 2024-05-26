import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUserTasksForProject, taskRUDPath} from "../../api/backendPaths.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskModal from "./TaskModal.jsx";
import TaskTable from "./TaskTable.jsx";


export default function TaskPanel({projectId, userId}) {
    const [createdTasks, setCreatedTasks] = useState([])
    const [myTasks, setMyTasks] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [updateTaskId, setUpdateTaskId] = useState(null)
    const [updateTask, setUpdateTask] = useState(null)

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
    const closeModal = () => {
        setIsModalActive(false)
        setUpdateTaskId(null)
        setUpdateTask(null)
    }

    const deleteHandle = (id) => {
        axios.delete(taskRUDPath(id)).then(
            () => {
                setCreatedTasks(oldCreatedTasks => {
                    return oldCreatedTasks.filter(task => task.id !== id)
                })
            }
        )


    }

    useEffect(() => {
        if (updateTaskId) {
            axios.get(taskRUDPath(updateTaskId))
                .then(res => res.data)
                .then(data => {
                    setUpdateTask(data)
                    setIsModalActive(true)
                })
        }
    }, [updateTaskId]);

    return (
        <div className>
            <div className="ml-4 mt-4">
                <button
                    onClick={openModal}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <TaskTable tasks={createdTasks} setUpdateTask={setUpdateTaskId}
                               deleteHandle={deleteHandle}></TaskTable>
                </div>
                <div>
                    <TaskTable tasks={myTasks} setUpdateTask={null} deleteHandle={null}/>
                </div>
            </div>

            {isModalActive &&
                <TaskModal isUpdate={updateTask != null} task={updateTask} closeModal={closeModal}
                           projectId={projectId} userId={userId} setCreatedTasks={setCreatedTasks}/>}
        </div>
    );
}
