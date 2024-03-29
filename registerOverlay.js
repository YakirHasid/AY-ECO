
function loadRegisterOverlay() {
    // main container
    let divContainer = document.createElement("div");
    divContainer.setAttribute("id", "registerContainer");

    let header = document.createElement("h1");
    header.innerText = "Register & Join Us!";

    divContainer.appendChild(header);

    // required classes
    divContainer.classList.add("center");
    divContainer.classList.add("modal-box");
    divContainer.classList.add("registerContainer");

    // close button
    let divClose = document.createElement("div");
    divClose.classList.add("fas");
    divClose.classList.add("fa-times");    
    divClose.setAttribute("id", "registerOverlayClose");

    let divFormContainer = document.createElement("div");
    divFormContainer.classList.add("form_container");

    let form = document.createElement("form");
    form.setAttribute("name", "formRegister");
    form.setAttribute("method", "post");
    form.setAttribute("id", "formRegister");
    form.setAttribute("action", "");

    let fieldsArr = ["FirstName", "LastName", "Email", "Username", "Password"];
    let fieldNamesArr = {"FirstName": "First Name", "LastName": "Last Name", "Email": "Email Address", "Username": "Username", "Password": "Password"}

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

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");

    let submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Register");
    submitBtn.setAttribute("name", "submit")
    submitBtn.setAttribute("id", "submitRegister")

    //create failed response container
    let failedContainer = document.createElement("div");
    let failedMessage = document.createElement("p");
    failedMessage.setAttribute("id", "failedRegisterMessage");
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
    $('#formRegister').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Serialize the form data
        var formData = $(this).serialize();

        // Send the form data to the PHP script using AJAX
        $.ajax({
            type: 'POST',
            url: 'registerScript.php',
            data: formData,
            success: function(response) {

                let answer = JSON.parse(response);
                //cheack if response is not  ok
                let failedMessage = document.getElementById("failedRegisterMessage");

                if(answer["message"]!="New record created successfully")
                {
                    failedMessage.innerText="Username is already taken, choose another username";
                    return;
                }

                // Handle the response from the server
                console.log(response);
                $('#formRegister')[0].reset(); // Reset the form fields
                $('#registerContainer').toggleClass("show-modal");

               
                alert("Happy to have you here "+answer["username"]+ " you can login, and enjoy your stay :)");


            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
    });
});

$(document).ready(function(){
    $('#topnavRegister').click(function(){
    $('#registerContainer').toggleClass("show-modal");
    
    });
    $('#registerOverlayClose').click(function(){
    $('#registerContainer').toggleClass("show-modal");

    });
}); 



