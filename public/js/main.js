//Variables Globales
let userCreate = null;

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
        console.log(user)
        login.style.display = "none";
        welcomeUser.style.display = "block";
        document.getElementById("userLogin").innerHTML = "Hola " + user.displayName;

        userCreate = firebase.database().ref('users/' + user.uid); +
        userCreate.set({
          displayName: user.displayName || user.providerData[0].email,
          email: user.email || user.providerData[0].email,
          photoUrl: user.photoURL || "",
          createdOn: user.metadata.createdAt || new Date(),
          uid: user.uid
        })
        console.log(user.uid + user.displayName);
      } else {
        document.getElementById("userLogin").innerHTML = "";
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  } catch (e) {
    console.error(e);
  }

  // firebase.database().ref('/users').on('value', showContacts);
  firebase.database().ref("/post").on("value", drawPosts);
  // firebase.database().ref("/messages").on("value", lastMessages);


  document.getElementById('receiverName').addEventListener('keyup', findReceiver);
  document.getElementById('receiverName').addEventListener('click', loadContacts);

});

out.addEventListener('click', () => {
  firebase.auth().signOut();
  login.style.display = "block";
});