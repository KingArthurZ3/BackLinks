$(document).ready(function(){
    var db = firebase.database();
    const auth = firebase.auth();
    const logContainer = $('#loginContainer');
    const txtEmail = $('#txtEmail');
    const txtPassword = $('#txtPassword');
    const btnLogin = $('#signInBtn');
    const btnSignUp = $('#signUpBtn');
    const btnLogout = $('#logoutBtn');
    var userObj = "";
    
    $(".folder").draggable({ containment: "parent" });
    
    $(".window").draggable({ containment: "parent" });
    $(".window").resizable({
      maxHeight: 600,
      maxWidth: 600,
      minHeight: 200,
      minWidth: 200
    });
    
    //firebase login info
    
    //login event
    
    btnLogin.click( e => {
        //Get email and pass
        const email = txtEmail.val();
        const pass = txtPassword.val();
        const auth = firebase.auth();
        
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        
        promise.catch(e => console.log(e.message));
    });
    
    // Add signup event
    btnSignUp.click( e => {
        //Get email and pass
        //TODO: CHECK FOR REAL EMAIL
        const email = txtEmail.val();
        const pass = txtPassword.val();
        const auth = firebase.auth();
        
        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        
        promise.catch(e => console.log(e.message));
    });
    
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
           console.log(firebaseUser);
           logContainer.hide();
        } else {
            console.log('not logged in');
            logContainer.show();
        }
        
    });
    
    //log out  function
    btnLogout.click( e=> {
        firebase.auth().signOut();
    });
    
    //TODO add in click for window
});


    