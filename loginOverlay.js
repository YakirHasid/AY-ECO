
function loadLoginOverlay() {
    // main container
    let divContainer = document.createElement("div");
    divContainer.setAttribute("id", "loginContainer");

    let header = document.createElement("h1");
    header.innerText = "Login";

    divContainer.appendChild(header);

    // required classes
    divContainer.classList.add("center");
    divContainer.classList.add("modal-box");
    divContainer.classList.add("loginContainer");

    // close button
    let divClose = document.createElement("div");
    divClose.classList.add("fas");
    divClose.classList.add("fa-times");
    divClose.setAttribute("id", "loginOverlayClose");

    let divFormContainer = document.createElement("div");
    divFormContainer.classList.add("form_container");

    let form = document.createElement("form");
    form.setAttribute("name", "formLogin");
    form.setAttribute("method", "post");
    form.setAttribute("id", "formLogin");
    form.setAttribute("action", "");

    let fieldsArr = ["Username", "Password"];
    let fieldNamesArr = {"Username": "Username", "Password": "Password"}

    for(let field of fieldsArr) {
        let x = document.createElement("div");
        x.classList.add("form_wrap");

        let item = document.createElement("div");
        item.classList.add("form_item");

        let label = document.createElement("label");
        label.innerText = fieldNamesArr[field];
        
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", field);

        item.appendChild(label);
        item.appendChild(input);

        x.appendChild(item);

        form.append(x);
    }

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");

    let submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Login");
    submitBtn.setAttribute("name", "submit")
    submitBtn.setAttribute("id", "submit")

    divBtn.appendChild(submitBtn);

    form.appendChild(divBtn);

    divFormContainer.appendChild(form);

    divContainer.appendChild(divClose);
    divContainer.appendChild(divFormContainer)

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
                // Handle the response from the server
                let answer = JSON.parse(response);
                //console.log(answer);
                $('#formLogin')[0].reset(); // Reset the form fields
                $('#loginContainer').toggleClass("show-modal");
                $('#topnavRegister').toggleClass("hidden");
                $('#topnavLogin').toggleClass("hidden");
                $('#topnavLogout').toggleClass("hidden");
                $('#topnavUsername').toggleClass("hidden");
                $('#topnavUsername').text("Hello " +answer['username']);

                // TODO: add toggle class for logged in elements
                
                localStorage.setItem('username', answer['username']);
                // You can show a success message or perform other actions here
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
