import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


export default function TaskTable({tasks, setUpdateTask, deleteHandle}) {
    return (
        <div className="p-4">
            <p>Stvoreni zadatci</p>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                    <span className="text-lg">{task.taskName}</span>
                    <div className="flex items-center space-x-4">
                        {setUpdateTask &&
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="cursor-pointer text-blue-500 hover:text-blue-700"
                                onClick={() => setUpdateTask(task.id)}
                            />
                        }
                        {deleteHandle &&
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="cursor-pointer text-red-500 hover:text-red-700"
                                onClick={() => deleteHandle(task.id)}
                            />
                        }
                    </div>
                </div>
            ))}
        </div>
    );

}