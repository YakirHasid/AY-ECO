
function loadLoginOverlay() {
    // main container
    let divContainer = document.createElement("div");
    divContainer.setAttribute("id", "loginContainer");

    let header = document.createElement("h1");
    header.innerText = "Login";

    divContainer.appendChild(header);

    // required classes to the main container
    divContainer.classList.add("center");
    divContainer.classList.add("modal-box");
    divContainer.classList.add("loginContainer");

    // close button
    let divClose = document.createElement("div");
    divClose.classList.add("fas");
    divClose.classList.add("fa-times");
    divClose.setAttribute("id", "loginOverlayClose");

    // form container
    let divFormContainer = document.createElement("div");
    divFormContainer.classList.add("form_container");

    //form elements
    let form = document.createElement("form");
    form.setAttribute("name", "formLogin");
    form.setAttribute("method", "post");
    form.setAttribute("id", "formLogin");
    form.setAttribute("action", "");

    // decleration of the fields
    let fieldsArr = ["Username", "Password"];
    let fieldNamesArr = {"Username": "Username", "Password": "Password"}

    //create generically the fields 
    for(let field of fieldsArr) {
        let x = document.createElement("div");
        x.classList.add("form_wrap");

        let item = document.createElement("div");
        item.classList.add("form_item");

        let label = document.createElement("label");
        label.innerText = fieldNamesArr[field];
        
        let input = document.createElement("input");

        if(field == "Password") {
            input.setAttribute("type", "password");
        }
        else {
            input.setAttribute("type", "text");
        }    
            
        input.setAttribute("name", field); 
        input.pattern = ".{1,}";
        input.required = true;

        item.appendChild(label);
        item.appendChild(input);

        x.appendChild(item);

        form.append(x);
    }

    //create the loginbtn
    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");

    let submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Login");
    submitBtn.setAttribute("name", "submit")
    submitBtn.setAttribute("id", "submitLogin")

    //create failed response container
    let failedContainer = document.createElement("div");
    let failedMessage = document.createElement("p");
    failedMessage.setAttribute("id", "failedLoginMessage");
    failedMessage.setAttribute("style", "color:red;text-align :center");
    

    failedContainer.appendChild(failedMessage);

    divBtn.appendChild(submitBtn);

    form.appendChild(divBtn);

    divFormContainer.appendChild(form);

    divContainer.appendChild(divClose);
    divContainer.appendChild(divFormContainer);
    divContainer.appendChild(failedContainer);
    


    // add formContainer to body
    document.body.appendChild(divContainer);
}


$(document).ready(function() {
    // Intercept the form submission
    $('#formLogin').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Serialize the form data
        var formData = $(this).serialize();

        // Send the form data to the PHP script using AJAX
        $.ajax({
            type: 'GET',
            url: 'loginScript.php',
            data: formData,
            success: function(response) {

                let failedMessage = document.getElementById("failedLoginMessage");
       
                if(response==""){
                    failedMessage.innerText="Incorrect username or password";
                    return;
                }
                failedMessage.innerText="";

                // Handle the response from the server
                let answer = JSON.parse(response);
               
                $('#formLogin')[0].reset(); // Reset the form fields
                $('#loginContainer').toggleClass("show-modal");
                $('#topnavRegister').toggleClass("hidden");
                $('#topnavLogin').toggleClass("hidden");
                $('#topnavLogout').toggleClass("hidden");
                $('#topnavUsername').toggleClass("hidden");
                $('#topnavUsername').text("Hello " +answer['username']);
                
                localStorage.setItem('username', answer['username']);

                location.reload();
            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
    });
});

$(document).ready(function(){
    $('#topnavLogin').click(function(){
    $('#loginContainer').toggleClass("show-modal");
    
    });
    $('#loginOverlayClose').click(function(){
    $('#loginContainer').toggleClass("show-modal");

    });
}); 
