
const orgActivityReducer = (state = {
    completedActivities: [],
    upcomingActivities: []
}, action) => {
    switch (action.type) {
        case 'SET_COMPLETED_ACTIVITIES':
            return {
                ...state,
                completedActivities: action.value
            };
        case 'SET_UPCOMING_ACTIVITIES':
            return {
                ...state,
                upcomingActivities: action.value
            };
        case 'CLEAR_ACTIVITIES':
            return {
                completedActivities: [],
                upcomingActivities: []
            }
        default:
            return state;
    };
};

export default orgActivityReducer;