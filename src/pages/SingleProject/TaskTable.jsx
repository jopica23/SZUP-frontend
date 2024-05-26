import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


// eslint-disable-next-line react/prop-types
export default function TaskTable({tasks, setUpdateTask, deleteHandle}) {
    return (
        <div className="p-4">
            {setUpdateTask === null ? <p>Zadaci za mene </p> :  <p>Stvoreni zadaci</p> }
            {/* eslint-disable-next-line react/prop-types */}
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