$(document).ready(function(){
    //Firebase User Data
    var db = firebase.database();
    const auth = firebase.auth();
    const logContainer = $('#loginContainer');
    const txtEmail = $('#txtEmail');
    const txtPassword = $('#txtPassword');
    const btnLogin = $('#signInBtn');
    const btnSignUp = $('#signUpBtn');
    const btnLogout = $('#logoutBtn');
    const mainContent = $('#main');
    var userObj = "";
    
    //TypeForm Data
    const formURL = "https://api.typeform.com/v1/form/r2SNKs?key=de1432909a011d2052a4551694cbe9e98bef6ff3"
    
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
    
    // Listens for userinfo added
    var commentsRef = firebase.database().ref('backlinksnpo/UserInfo/');
    // Reaction to change in user data
    commentsRef.on('child_added', function(data) {
          alert("changed");
          const email = data.Email;
          const pass = data.Pass;
        
          //creates User
          const promise = auth.createUserWithEmailAndPassword(email, pass);
        
          promise.catch(e => console.log(e.message));
    });
    

//        //Get email and pass
//        //TODO: CHECK FOR REAL EMAIL
//        const email = txtEmail.val();
//        const pass = txtPassword.val();
//        const auth = firebase.auth();
//        
//        //Sign in
//        const promise = auth.createUserWithEmailAndPassword(email, pass);
//        
//        promise.catch(e => console.log(e.message));

    
    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
           console.log(firebaseUser);
           logContainer.hide();
           mainContent.removeClass('blur');          
        } else {
            console.log('not logged in');
            logContainer.show();
            mainContent.addClass('blur');
        }
        
    });
    
    //log out  function
    btnLogout.click( e=> {
        
        firebase.auth().signOut();
    });
    
    //TODO add in click for window
});


    