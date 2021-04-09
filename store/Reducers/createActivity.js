const activityReducer = (
    state = {
        heading: '',
        type: '',
        address: '',
        longitude: '',
        latitude: '',
        startDate: '',
        endDate: '',
        slots: [],
        description: ''
    },
    action
) => {
    switch (action.type) {
        case "SET_CREATE_HEADING":
            return {
                ...state, heading: action.heading
            }

        case "SET_CREATE_TYPE":
            return {
                ...state, type: action.value
            }

        case "SET_CREATE_LOCATION":
            return {
                ...state, address: action.address, longitude: action.longitude, latitude: action.latitude
            }

        case "SET_CREATE_START_DATE":
            return {
                ...state, startDate: action.startDate
            }

        case "SET_CREATE_END_DATE":
            return {
                ...state, endDate: action.endDate
            }

        case "SET_CREATE_SLOTS":
            return {
                ...state, slots: action.slots
            }

        case "SET_CREATE_DESCRIPTION":
            return {
                ...state, description: action.description
            }

        case "RESET_CREATE_STATE":
            return {
                heading: '',
                type: '',
                address: '',
                longitude: '',
                latitude: '',
                startDate: '',
                endDate: '',
                description: ''
            }

        default:
            return state
    }
}

export default activityReducer