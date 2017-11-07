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
    
    // Add signup event
    btnSignUp.click( e => {
        
        var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q)}
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
        
        
    });
    
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


    