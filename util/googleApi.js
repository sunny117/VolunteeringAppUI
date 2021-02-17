import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export default {
  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //   this.setState({ userInfo });
      console.log("in here "  + userInfo);
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  },

  getCurrentUserInfo: async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //   this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  },

  isSignedIn: async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    // this.setState({ isLoginScreenPresented: !isSignedIn });
  },

  getCurrentUser: async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({currentUser});
  },

  signOut: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  },

  revokeAccess: async () => {
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  },

  hasPlayServices: async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // google services are available
    } catch (err) {
      console.error('play services are not available');
    }
  },
};
