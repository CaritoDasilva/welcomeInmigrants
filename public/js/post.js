
// POST USUARIO
function posting() {
  // POST INICIO
  sendPost.addEventListener('click', () => {
    const currentUser = firebase.auth().currentUser;
    const postAreaText = postArea.value;
    postArea.value = ' ';
    //Para tener una nueva llave en la colección messages
    let newPostKey = firebase
      .database()
      .ref()
      .child('post')
      .push().key;

    firebase
      .database()
      .ref(`post/${newPostKey}`)
      .set({
        creator: currentUser.displayName,
        creatorEmail: currentUser.email,
        text: postAreaText,
      });
  });
};
//Imprimir Post
const drawPosts = (posts) => {
  postPrint.innerHTML = '';
  Object.entries(posts.val()).forEach((post) => {
    postPrint.innerHTML += `
            <ul class='list-group list-group-flush' style='width: 100%;'> 
              <li class='list-group-item'>
              <h6 class='card-title'>${post[1].creator}</h6>
              <p class='card-text text-justify' class='posts'>${post[1].text}</p>
              <i class='fas fa-edit' data-text='${post[0]}' onclick='updatePost(event)'></i> <i class='fas fa-trash-alt' data-post='${post[0]}' onclick='deletePost(event)'> </i> 
              </li>
            </ul>
        `;
  });
}
//Borrar Post
function deletePost(event) {
  if (confirm("¿Seguro que quieres borrar este post?")) {
    event.stopPropagation(); //se activa solamente donde se hace click
    const postId = event.target.getAttribute('data-post');
    firebase.database().ref('post/').child(postId).remove();
    return true;
  } else {
    return false;
  }   
}
//Editar Post
function updatePost(event) {
  eventUpdate.stopPropagation();
  const textId= event.target.getAttribute('data-text');
  firebase.database().ref('post/' + textId).once("value", function(post){
    const postAreaText = (post.val().text);
    document.getElementsByClassName("postTextArea").value = postAreaText;
    const btnEdit = document.getElementById("sendPost");
    btnEdit.innerHTML = "EDITAR";
    btnEdit.onclick = function(){
      firebase.database().ref('post').child(textId).update({
        text: postAreaText
      });
    }
  });
  //no puedo usar ide en post 
  //data-text en todas parte donde se me plasca text area pongo id que corresponde a ese post por medio de una classname.
  
}


