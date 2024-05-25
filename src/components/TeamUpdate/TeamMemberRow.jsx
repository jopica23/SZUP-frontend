import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUserMinus
} from "@fortawesome/free-solid-svg-icons";

export default function TeamMemberRow({member, handleRemove}) {
    return (
        <div className="flex justify-between items-center">
            <div>
                {member.firstName + " " + member.lastName}
            </div>
            <div className="ml-4">
                {handleRemove &&
                    <FontAwesomeIcon icon={faUserMinus} className="cursor-pointer"
                                     onClick={() => handleRemove(member.id)}/>
                }
            </div>
        </div>

    )
}