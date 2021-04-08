export function setType( value ) {
	return {
		type: 'SET_SEARCH_TYPE',
		value
	}
}

export function setLocation( address, longitude, latitude ) {
	return {
		type: 'SET_SEARCH_LOCATION',
		address,
		longitude,
		latitude
	}
}

export function setStartDate( startDate ) {
	return {
		type: 'SET_SEARCH_START_DATE',
		startDate
	}
}

export function setEndDate( endDate ) {
	return {
		type: 'SET_SEARCH_END_DATE',
		endDate
	}
}

export function addActivities( activities ){
    return {
        type: "ADD_SEARCH_ACTIVITIES",
        activities
    }
}