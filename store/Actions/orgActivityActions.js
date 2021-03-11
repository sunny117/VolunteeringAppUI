export function setCompletedActivities(value){
    return {
        type: 'SET_COMPLETED_ACTIVITIES',
        value
    };
};

export function setUpcomingActivities(value){
    return {
        type: 'SET_UPCOMING_ACTIVITIES',
        value
    };
};

export function clearActivities(){
    return {
        type: 'CLEAR_ACTIVITIES',
    };
};
