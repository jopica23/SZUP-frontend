const BASE = "http://localhost:8080/api";

export const backendPaths = {
    PROJECT: `${BASE}/project`,
    ALL_PROJECTS: `${BASE}/project/all-projects/user`,
    NEW_PROJECT: `${BASE}/project/create`,
    ALL_USERS: `${BASE}/users/all-users`,
    REMOVE_MEMBER: `${BASE}/project/{projectId}/team/{teamId}/remove-member/{memberId}/{removedBy}`,
    ADD_MEMBER: `${BASE}/project/{projectId}/team/{teamId}/add-member/{memberId}/{addedById}`
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
