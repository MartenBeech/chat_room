import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '672262780835-7aftg0t36nassh818r1dkktgdl5no7i2.apps.googleusercontent.com',
});

export let fullName = '';
export let avatar = '';

export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) {
      if (currentUser.user.name) {
        fullName = currentUser.user.name;
      }
      if (currentUser.user.photo) {
        avatar = currentUser.user.photo;
      }
    }
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    alert(error);
    return;
  }
}
