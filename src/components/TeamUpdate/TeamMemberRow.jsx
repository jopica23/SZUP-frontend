import React from "react";

export default function TeamMemberRow({member,handleRemove}){
    return (
        <div>
            {member.firstName + " " + member.lastName}
        </div>
    )
}