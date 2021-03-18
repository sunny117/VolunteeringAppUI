
const volActivityReducer = (state = {
    completedActivities: [],
    upcomingActivities: []
}, action) => {
    switch (action.type) {
        case 'SET_VOL_COMPLETED_ACTIVITIES':
            return {
                ...state,
                completedActivities: action.value
            };
        case 'SET_VOL_UPCOMING_ACTIVITIES':
            return {
                ...state,
                upcomingActivities: action.value
            };
        case 'CLEAR_VOL_ACTIVITIES':
            return {
                completedActivities: [],
                upcomingActivities: []
            }
        default:
            return state;
    };
};

export default volActivityReducer;