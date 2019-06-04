  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAqBWzkmfuATx4S77dN03CUMdUTpeiJl6M",
    authDomain: "pwa-lunch-god.firebaseapp.com",
    databaseURL: "https://pwa-lunch-god.firebaseio.com",
    projectId: "pwa-lunch-god",
    storageBucket: "pwa-lunch-god.appspot.com",
    messagingSenderId: "1028719724419",
    appId: "1:1028719724419:web:c8305c7e544862a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
    if (user) {
      window.location.replace('/');
    } 
  });
  
  function signInWithGoogle() {
    console.log(firebase)
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(data){
        console.log(data)
       var idToken = data.credential.idToken;
       var userInfo = data.user;
       localStorage.setItem('firebase_idToken', idToken);
       localStorage.setItem('firebase_user_email', userInfo.email);
       localStorage.setItem('firebase_user_img', userInfo.photoURL);
       localStorage.setItem('firebase_userName', userInfo.displayName);
    }).catch(function(err){
        console.log(err)
    })
  }