const assert = require("chai").assert;
global.window = global;
global.firebase = require("firebase");
require("../../public/js/postFood");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB7h3HMUm4Wm9HE5IpH_fkneXTf_VOm83k",
    authDomain: "testproyectosocialnewt.firebaseapp.com",
    databaseURL: "https://testproyectosocialnewt.firebaseio.com",
    projectId: "testproyectosocialnewt",
    storageBucket: "",
    messagingSenderId: "994066440814"
  };
  firebase.initializeApp(config);

  describe("counter", () => {
    it("debería ser un objeto", () => {
      assert.equal(typeof counter, "object");
    });
  })

    describe("postingFood", () => {
      it("debería ser una función", () => {
        assert.equal(typeof window.postingFood, "function");
      });
    })

  describe("La lista me deberia de devolver currentUser ", () => {
    it("Debería devolverme el objeto que contiene CurrentUser", done => {
      drawPosts("posts")
        .then(posts => {
          const usuario = Object.entries(posts.val()).find(posts => {
            return posts[1].currentUser == "creator";
          });
          assert.exists(post[1]);
          assert.equal(posts[1].currentUser, "creator");
        })
        .catch(error => {
          assert.error();
        })
        .finally(done);
    });
  })
        
