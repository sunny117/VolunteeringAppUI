export function setHeading( heading ) {
	return {
		type: 'SET_HEADING',
		heading
	}
}

export function setType( value ) {
	return {
		type: 'SET_TYPE',
		value
	}
}

export function setLocation( address, longitude, latitude ) {
	return {
		type: 'SET_LOCATION',
		address,
		longitude,
		latitude
	}
}

export function setStartDate( startDate ) {
	return {
		type: 'SET_START_DATE',
		startDate
	}
}

export function setEndDate( endDate ) {
	return {
		type: 'SET_END_DATE',
		endDate
	}
}

export function setDescription( description ) {
	return {
		type: 'SET_DESCRIPTION',
		description
	}
}

export function resetState() {
    return {
        type: "RESET_STATE"
    }
}