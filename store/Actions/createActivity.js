export function setHeading( heading ) {
	return {
		type: 'SET_CREATE_HEADING',
		heading
	}
}

export function setType( value ) {
	return {
		type: 'SET_CREATE_TYPE',
		value
	}
}

export function setLocation( address, longitude, latitude ) {
	return {
		type: 'SET_CREATE_LOCATION',
		address,
		longitude,
		latitude
	}
}

export function setStartDate( startDate ) {
	return {
		type: 'SET_CREATE_START_DATE',
		startDate
	}
}

export function setEndDate( endDate ) {
	return {
		type: 'SET_CREATE_END_DATE',
		endDate
	}
}

export function setSlots( slots ){
    return {
        type: 'SET_CREATE_SLOTS',
        slots
    }
}

export function setDescription( description ) {
	return {
		type: 'SET_CREATE_DESCRIPTION',
		description
	}
}

export function resetState() {
    return {
        type: "RESET_CREATE_STATE"
    }
}