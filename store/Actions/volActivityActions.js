export function setCompletedActivities(value){
    return {
        type: 'SET_VOL_COMPLETED_ACTIVITIES',
        value
    };
};

export function setUpcomingActivities(value){
    return {
        type: 'SET_VOL_UPCOMING_ACTIVITIES',
        value
    };
};

export function clearActivities(){
    return {
        type: 'CLEAR_VOL_ACTIVITIES',
    };
};
