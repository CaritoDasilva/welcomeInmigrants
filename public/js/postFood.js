function postingFood() {
  // POST INICIO
  sendPost.addEventListener("click", () => {
    const currentUser = firebase.auth().currentUser;
    const postAreaText = postArea.value;
    postArea.value = " ";
    if (postAreaText === "") {
      alert("Por favor, debe introducir texto");
    } else {
      //Para tener una nueva llave en la colección post
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
          creatorEmail: currentUser.email,
          text: postAreaText,
          counter: 0
        });
    }
  });
}
//Imprimir Post
const drawPosts = posts => {
  if (!posts || !posts.val()) {
    return;
  }
  postPrint.innerHTML = "";
  Object.entries(posts.val()).forEach(post => {
    postPrint.innerHTML += `
           <ul class="list-group list-group-flush" style="width: 100%;">
             <li class="list-group-item">
             <h6 class="card-title">${post[1].creator}</h6>
             <p class="card-text text-justify">${post[1].text}</p>
             <span>
             <i class="fas fa-edit" data-text="${
               post[1].text
             }" onclick="updatePost("eventUpdate") id="editPost"> </i> <i class="fas fa-trash-alt" 
             data-post="${post[0]}" onclick="deletePost(event)"></i>
             <i class="far fa-hand-peace" data-like="${
               post[0]
             }" onclick="counterLike(event)"></i><span>${post[1].counter}</span>
             </span> 
             </li>
           </ul>
          
       `;
  });
};
// Like Post
function counterLike(event) {
  event.stopPropagation();
  const counterId = event.target.getAttribute('data-like');
  firebase.database().ref(`post/` + counterId).once("value", function (post) {
    let total = (post.val().counter || 0) + 1;
    firebase.database().ref(`post`).child(counterId).update({
      counter: total
    });
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

