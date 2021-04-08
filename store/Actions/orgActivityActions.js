export function setCompletedActivities(value){
    return {
        type: 'SET_ORG_COMPLETED_ACTIVITIES',
        value
    };
};

export function setUpcomingActivities(value){
    return {
        type: 'SET_ORG_UPCOMING_ACTIVITIES',
        value
    };
};

export function clearActivities(){
    return {
        type: 'CLEAR_ORG_ACTIVITIES',
    };
};
