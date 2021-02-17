
const authReducer = (state = {
    isSignedIn: false,
    accessToken: '',
    userType: '',
    userId: '',
    userName: '',
    userPhotoUrl: '',
    userEmail: '',
    userDescription: '',
    userContactNumber: '',
    userLocation: '',

}, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                ...action.value
            };
        case 'SET_USER_NAME':
            return {
                ...state,
                userName: action.value
            };        
        case 'SET_USER_DESCRIPTION':
            return {
                ...state,
                userDescription: action.value
            };
        case 'SET_USER_CONTACT_NUMBER':
            return {
                ...state,
                userContactNumber: action.value
            };
        case 'SET_USER_LOCATION':
            return {
                ...state,
                userLocation: action.value
            };
        case 'CLEAR_AUTH':
            return {
                isSignedIn : false,
                accessToken: '',
                userType: '',
                userId: '',
                userName: '',
                userPhotoUrl: '',
                userEmail: '',
                userDescription: '',
                userContactNumber: '',
                userLocation: '',            
            }
        default:
            return state;
    };
};

export default authReducer;