export function setAuth(value){
    return {
        type: 'SET_AUTH',
        value
    };
};

export function setUserName(value){
    return {
        type: 'SET_AUTH_USER_NAME',
        value
    };
};

export function setUserDescription(value){
    return {
        type: 'SET_AUTH_USER_DESCRIPTION',
        value
    };
};

export function setUserContactNumber(value){
    return {
        type: 'SET_AUTH_USER_CONTACT_NUMBER',
        value
    };
};

export function setUserLocation(value){
    return {
        type: 'SET_AUTH_USER_LOCATION',
        value
    };
};

export function clearAuth(){
    return {
        type: 'CLEAR_AUTH'
    };
};