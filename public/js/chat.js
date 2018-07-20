let userList = null;
let receivers = null;


const showMessages = (messages) => {
  messageContainer.innerHTML = '';
  firebase.database().ref('chats/' + createChat(firebase.auth().currentUser.uid) + '/messages')
    .limitToLast(2)
    .on('child_added', (newMessage) => {
      messageContainer.innerHTML += `
      <ul class="list-group list-group-flush" style="width: 100%;">
      <li class="list-group-item border-info">
      <h6 class="card-title"> Nombre : ${newMessage.val().creatorName} </h6>
      <p class="card-text text-justify">${newMessage.val().text}</p>
      </li>
    </ul>
    `;
    });
};

let createChat = (uid1, uid2) => {
  if (uid1 > uid2) {
    return uid1 + uid2;
  } else {
    return uid2 + uid1;
  }
}

// Usaremos una colección para guardar los mensajes, llamada messages
const sendMessage = () => {
  const currentUser = firebase.auth().currentUser;
  const messageAreaTextChat = txt.value;
  txt.value = '';
  if (messageAreaTextChat === '') {
    alert('no puedes enviar mensajes vacíos')
  } else {
    //Para tener una nueva llave en la colección messages
    firebase.database().ref('chats/' + createChat(firebase.auth().currentUser.uid) + '/messages').push({
      creator: currentUser.uid,
      creatorName: currentUser.displayName,
      receiver: receiverName.value,
      text: messageAreaTextChat,
      read: false,
      // map: map
    })


  }
}



let privateChat = (uid, name, picture) => {
  chatRef = firebase.database().ref('chats/' + createChat(uid, firebase.auth().currentUser.uid) + '/messages');
  event.preventDefault();
  if (chatRef) {
    chatRef.off();
  }
  chatRef.on('value', showMessages);
  document.getElementById('receiverName').value = name;
  showContacts([]);
}



const showContacts = (users) => {
  let contactsByOrder = '<ul>';
  users.forEach((user) => {
    contactsByOrder += `<li><img src="${user.photoUrl}" height="16" width="16"> <a href="#" onclick="privateChat('${user.uid}', '${user.displayName}', '${user.photoUrl}')">${user.displayName} </a></li>`
  })
  document.getElementById('contactsChat').innerHTML = contactsByOrder + "</ul>";
}

const loadContacts = () => {
  firebase.database().ref('/users').once('value', (snapshot) => {
    userList = Object.values(snapshot.val());
    showContacts(userList);
  })
}
/* Se realiza una función que ejecute la función de mensajes directos */
const findReceiver = (event) => {
  /*Estamos buscando el destinatario para poder hacer la ruta entre el que envía el mensaje y quien lo recibe  */
  const receivers = userList.filter((user) => {
    return user.displayName.toUpperCase().indexOf(event.currentTarget.value.toUpperCase()) >= 0;
  });
  showContacts(receivers);
};

mapIcon.addEventListener('click', () => {
  showMap();
});
