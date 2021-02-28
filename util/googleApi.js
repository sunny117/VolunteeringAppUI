import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure();

const errorLogger = error => {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
    } else {
        // some other error happened
    }
    return error
}

const signIn = () => {
    return GoogleSignin.hasPlayServices()
        .then(() => GoogleSignin.signIn())
        .catch(error => errorLogger(error))
}

const isSignedIn = () => GoogleSignin.isSignedIn()

const signInSilently = () => GoogleSignin.signInSilently()

const signOut = () => {
    return GoogleSignin.revokeAccess()
        .then(() => GoogleSignin.signOut())
        .catch(error => errorLogger(error))
}

export default {
    signIn,
    isSignedIn,
    signInSilently,
    signOut
};
