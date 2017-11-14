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
    const errorDisplay = $('#errorMessage');
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
        const promise = auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                $('#errorMessage').text('Aww shucks, wrong password');
            } else {
                $('#errorMessage').text('Yikes, try another email or register with us!');
            }

            // ...
        });

        promise.catch(e => console.log(e.message));
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
<<<<<<< HEAD
            setTimeout(function(){
                console.log(firebaseUser);
                logContainer.hide();
                mainContent.removeClass('blur');   
            }, 1000);       
=======
            logContainer.hide();
            mainContent.removeClass('blur');          
>>>>>>> 861bc8cf7e75f29a48afae3e44b64879c72b54c2
        } else {
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


