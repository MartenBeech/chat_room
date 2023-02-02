import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCllg8oY14PawzyBBsHbgkxumdGaNDzkAk',
  authDomain: 'chatroom-ed323.firebaseapp.com',
  projectId: 'chatroom-ed323',
  storageBucket: 'chatroom-ed323.appspot.com',
  messagingSenderId: '672262780835',
  appId: '1:672262780835:android:b84056730e2253c4d5cc16',
  measurementId: 'G-5028W0HMPN',
};

export const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
