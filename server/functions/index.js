// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
var functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUserFromDatabase = functions.database.ref('/UserInfo/{pushId}').onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const post = event.data.val();
    const email = post.Email;
    const pass = post.Pass;
    const name = post.FirstName + " " + post.LastName;

    if(post.created){
        return
    }
    
    admin.auth().createUser({
        email: email,
        password: pass,
        displayName: name
    }).then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    }).catch(function(error) {
        console.log("Error creating new user:", error);
    });

    console.log("Creating new user " + event.params.pushId);
    console.log(post);
    post.created = true;

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    return event.data.ref.set(post)
})

//function sanitize(s){
//    var sanitizedText = s
//    sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful")
//    return sanitizedText
//}

