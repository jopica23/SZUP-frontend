import React from "react";


export default function Tab({active, setActive, userRights}) {
    const activeClass =
        "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active ";
    const ordinaryClass =
        "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ";

    return (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
                {userRights.canModifyProject &&
                    <li onClick={() => setActive(0)} className="mr-2 cursor-pointer">
                        <p className={active !== 0 ? ordinaryClass : activeClass}>Svi timovi</p>
                    </li>
                }
                {userRights.canModifyTeam &&
                    <li onClick={() => setActive(1)} className="cursor-pointer">
                        <p className={active !== 1 ? ordinaryClass : activeClass}>
                            Moj tim
                        </p>
                    </li>
                }
                <li onClick={() => setActive(2)} className="mr-2 cursor-pointer">
                    <p className={active !== 2 ? ordinaryClass : activeClass}>
                        Moji zadatci
                    </p>
                </li>
            </ul>
        </div>
    );
}
