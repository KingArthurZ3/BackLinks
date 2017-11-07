$(document).ready(function(){
    const registerBtn = $('#signUpBtn');
    const typeForm = $('#typeform-full');
    
    typeForm.hide();
    
    registerBtn.click( function(){
        typeForm.toggle();;
    });
});