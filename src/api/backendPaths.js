const BASE = "http://localhost:8080/api";

export const backendPaths = {
    PROJECT: `${BASE}/project`,
    ALL_PROJECTS: `${BASE}/project/all-projects/user`,
    NEW_PROJECT: `${BASE}/project/create`,
    ALL_USERS: `${BASE}/users/all-users`,
    REMOVE_MEMBER: `${BASE}/project/{projectId}/team/{teamId}/remove-member/{memberId}/{removedBy}`,
    ADD_MEMBER: `${BASE}/project/{projectId}/team/{teamId}/add-member/{memberId}/{addedById}`,
    ADD_TEAM_TO_PROJECT: `${BASE}/project/{projectId}/team`,
    REMOVE_TEAM_FROM_PROJECT: `${BASE}/project/{projectId}/team/{teamId}`,
    GET_USER_TASKS_FOR_PROJECT: `${BASE}/project/{projectId}/task/all-tasks/user/{userId}`,
    CREATE_TASK: `${BASE}/project/{projectId}/team/{teamId}/task/create-task`,
    TASK_RUD: `${BASE}/task/{taskId}`,
    UPDATE_STATUS: `${BASE}/task/update-status`,
    CHANGE_SOLVER_PATH: `${BASE}/project/{projectId}/task/{taskId}`,
    GET_TEAMS_FOR_PROJECT_PATH: `${BASE}/project/{projectId}/teams`,
    GET_TEAM_MEMBERS_PATH: `${BASE}/team/{teamId}`,
    GET_PRIORITIES: `${BASE}/priority/all-priorities`,
    GET_STATUSES: `${BASE}/status/all-statuses`
}

export function getRemoveMemberPath(projectId, teamId, memberId, removedBy) {
    return backendPaths.REMOVE_MEMBER
        .replace('{projectId}', projectId)
        .replace('{teamId}', teamId)
        .replace('{memberId}', memberId)
        .replace('{removedBy}', removedBy);
}

export function getAddMemberPath(projectId, teamId, memberId, addedBy) {
    return backendPaths.ADD_MEMBER
        .replace('{projectId}', projectId)
        .replace('{teamId}', teamId)
        .replace('{memberId}', memberId)
        .replace('{addedById}', addedBy);
}

export function getPathForNewTeamCreation(projectId) {
    return backendPaths.ADD_TEAM_TO_PROJECT.replace('{projectId}', projectId)
}

export function getPathForTeamRemoval(projectId, teamId) {
    return backendPaths.REMOVE_TEAM_FROM_PROJECT
        .replace('{projectId}', projectId)
        .replace('{teamId}', teamId)
}

export function getUserTasksForProject(projectId, userId) {
    return backendPaths.GET_USER_TASKS_FOR_PROJECT
        .replace('{projectId}', projectId)
        .replace('{userId}', userId)
}

export function createTaskPath(projectId, teamId) {
    return backendPaths.CREATE_TASK
        .replace('{projectId}', projectId)
        .replace('{teamId}', teamId)
}
export function updateSolverPath(projectId, taskId) {
    return backendPaths.CHANGE_SOLVER_PATH
        .replace('{projectId}', projectId)
        .replace('{taskId}', taskId)
}

export function taskRUDPath(taskId) {
    return backendPaths.TASK_RUD.replace('{taskId}', taskId)
}

export function getTeamsForProject(projectId) {
    return backendPaths.GET_TEAMS_FOR_PROJECT_PATH
        .replace('{projectId}', projectId)
}

export function getMembersForATeam(teamId) {
    return backendPaths.GET_TEAM_MEMBERS_PATH
        .replace('{teamId}', teamId)
}




