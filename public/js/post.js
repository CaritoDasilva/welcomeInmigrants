  // POST USUARIO
function posting() {
  sendPost.addEventListener("click", () => {
    firebase
      .database()
      .ref("post")
      .limitToLast(5)
      .on("child_added", newPost => {
        postPrint.innerHTML += `
                <ul class="list-group list-group-flush" style="width: 100%;" id="${newPost.Key}"> 
                  <li class="list-group-item">
                  <h6 class="card-title">${newPost.val().creator}</h6>
                  <p class="card-text text-justify">${newPost.val().text}</p>
                  <i class="fas fa-edit" onclick="updatePost()"> </i> <i class="fas fa-trash-alt" data-post="${newPost.Key}" onclick="deletePost(event)"></i> 
                  </li>
                </ul>
            `;
      });
      const currentUser = firebase.auth().currentUser;
      const postAreaText = postArea.value;
      //Para tener una nueva llave en la colección messages
      let newPostKey = firebase
        .database()
        .ref()
        .child("post")
        .push().key;
  
      firebase
        .database()
        .ref(`post/${newPostKey}`)
        .set({
          creator: currentUser.displayName,
          creatorName: currentUser.email,
          text: postAreaText
        });  
  });
}
  // Borrar post
function deletePost(event) {
  event.stopPropagation();
  const postId = event.target.getAttribute("data-post");
  const postRef = firebase.database().ref("post").child(postId);
  postRef.remove();
  postPrint.removeChild(postPrint.childNodes[0] && postPrint.childNodes[1]);  
}

// Editar post
function updatePost() {
  let postEditRef = firebase.database().ref(`post/${newPostKey}`);

  // 
  return postEditRef.update({
  text: messageAreaText
  })
  .then(function() {
  console.log("El documento ha sido editado");
  })
  .catch(function(error) {
  // The document probably doesn't exist.
  console.error("Error al editar el documento ", error);
});
  
}
