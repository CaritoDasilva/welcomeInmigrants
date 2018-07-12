// POST USUARIO
window.onload = () => {

  firebase.database().ref('post')
  .on('child_added', (newMessage) => {
    postPrint.innerHTML += `
                <p> Usuario : ${newMessage.val().creatorName}</p>
                <p>${newMessage.val().text}</p>
            `;
  });
  sendPost.addEventListener('click', () => {
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value;
  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('post').push().key;

  firebase.database().ref(`post/${newMessageKey}`).set({
    creator: currentUser.displayName,
    creatorName: currentUser.email,
    text: messageAreaText
  });
})
}


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });
}









