const searchActivity = (state = {
    type: '',
    address: '',
    longitude: '',
    latitude: '',
    startDate: '',
    endDate: '',
    activities: []
}, action) => {
    switch (action.type) {

        case "SET_SEARCH_TYPE":
            return {
                ...state, type: action.value
            }

        case "SET_SEARCH_LOCATION":
            return {
                ...state, address: action.address, longitude: action.longitude, latitude: action.latitude
            }

        case "SET_SEARCH_START_DATE":
            return {
                ...state, startDate: action.startDate
            }

        case "SET_SEARCH_END_DATE":
            return {
                ...state, endDate: action.endDate
            }

        case "ADD_SEARCH_ACTIVITIES":
			return {
				...state, activities: action.activities
			}

        default:
            return state
    }
};

export default searchActivity;