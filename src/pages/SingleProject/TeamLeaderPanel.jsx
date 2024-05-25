import React from "react";
import TeamCard from "../../components/TeamUpdate/TeamCard.jsx";


export default function TeamLeaderPanel({myTeam, projectId, currUser}) {
    console.log(myTeam)
    return (
        <div className="flex w-full justify-center">
            <div className="wrapper">
                <div>
                    <TeamCard key={myTeam.teamName}
                          team={myTeam}
                          projectId={projectId}
                          userId={currUser}
                    />
                </div>
            </div>
        </div>
    );
}
