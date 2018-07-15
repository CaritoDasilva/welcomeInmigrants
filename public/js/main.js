//Variables Globales
let userCreate = null;
let receiver = null;
let userList = null;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAgX6hSSO9TqHkhLJzFmBLLczE8GuMCsoo",
  authDomain: "welcome-inmigrants.firebaseapp.com",
  databaseURL: "https://welcome-inmigrants.firebaseio.com",
  projectId: "welcome-inmigrants",
  storageBucket: "welcome-inmigrants.appspot.com",
  messagingSenderId: "517706659234"
};
firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider();

//Autenticación

document.addEventListener('DOMContentLoaded', function () {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [ // Leave the lines as is for the providers you want to offer
        firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ], // Terms of service
      tosUrl: '/terms-of-service'
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        document.getElementById("firebaseui-auth-container").innerHTML = "Hola " + user.displayName;

        userCreate = firebase.database().ref('users/' + user.uid); +
        userCreate.set({
          displayName: user.displayName || user.providerData[0].email,
          email: user.email || user.providerData[0].email,
          photoUrl: user.photoURL || "",
          createdOn: user.metadata.createdAt || new Date()

        })
        console.log(user.uid + user.displayName);
      } else {
        document.getElementById("firebaseui-auth-container").innerHTML = "";
        ui.start('#firebaseui-auth-container', uiConfig);
      }


    });
  } catch (e) {
    console.error(e);
  }
});
out.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
});