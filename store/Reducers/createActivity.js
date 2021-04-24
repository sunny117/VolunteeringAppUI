const activityReducer = (
    state = {
        heading: '',
        type: '',
        address: 'xyz',
        longitude: '10',
        latitude: '10',
        startDate: '',
        endDate: '',
        slots: [
            {
                name: "Sunday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Monday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Tuesday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Wednesday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Thursday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Friday",
                isVisible: false,
                isAvailable: false,
                values: []
            },
            {
                name: "Saturday",
                isVisible: false,
                isAvailable: false,
                values: []
            }
        ],
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

        case "SET_CREATE_VISIBLE":
            let temp = state.slots
            temp.forEach(element => {
                element.name == action.filter ? element.isVisible = action.payload : null
            })
            return {
                ...state, slots: temp
            }

        case "SET_CREATE_AVAILABLE":
            temp = state.slots
            temp[action.filter].isAvailable = action.payload
            return {
                ...state, slots: temp
            }

        case "SET_CREATE_SLOT":
            temp = state.slots
            temp.forEach(element => {
                element.name == action.filter ? element.values.push(action.payload) : null
            })
            return {
                ...state, slots: temp
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
                address: 'xyz',
                longitude: '10',
                latitude: '10',
                startDate: '',
                endDate: '',
                slots: [
                    {
                        name: "Sunday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Monday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Tuesday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Wednesday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Thursday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Friday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    },
                    {
                        name: "Saturday",
                        isVisible: false,
                        isAvailable: false,
                        values: []
                    }
                ],
                description: ''
            }

        default:
            return state
    }
}

export default activityReducer