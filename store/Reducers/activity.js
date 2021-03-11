const activityReducer = (
	state = {
		heading: '',
		type: '',
		address: '',
		longitude: '',
		latitude: '',
		startDate: '',
		endDate: '',
		description: ''
	},
	action
) => {
	switch (action.type) {
		case "SET_HEADING":
			return {
				...state, heading: action.heading
			}

		case "SET_TYPE":
			return {
				...state, type: action.value
			}

		case "SET_LOCATION":
			return {
				...state, address: action.address, longitude: action.longitude, latitude: action.latitude
			}

		case "SET_START_DATE":
			return {
				...state, startDate: action.startDate
			}

		case "SET_END_DATE":
			return {
				...state, endDate: action.endDate
			}

		case "SET_DESCRIPTION":
			return {
				...state, description: action.description
			}

        default:
            return state
	}
}

export default activityReducer