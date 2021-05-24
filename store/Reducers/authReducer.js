
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
    isDialogVisible: false,
    diaglogValue: ''
}, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                ...action.value
            };
        case 'SET_AUTH_USER_NAME':
            return {
                ...state,
                userName: action.value
            };        
        case 'SET_AUTH_USER_DESCRIPTION':
            return {
                ...state,
                userDescription: action.value
            };
        case 'SET_AUTH_USER_CONTACT_NUMBER':
            return {
                ...state,
                userContactNumber: action.value
            };
        case 'SET_AUTH_USER_LOCATION':
            return {
                ...state,
                userLocation: action.value
            };
        case 'SET_DIALOG_VISIBILITY':
            return {
                ...state,
                isDialogVisible: action.value
            }
        case 'SET_DIALOG':
            return {
                ...state,
                dialogValue: action.value
            }
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
                isDialogVisible: false,
                diaglogValue: ''           
            }
        default:
            return state;
    };
};

export default authReducer;