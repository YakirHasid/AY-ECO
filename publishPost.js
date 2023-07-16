
function createPostForm() {

    let divPostContainer = document.getElementById("publishPostContainer");
    let postHeader = document.createElement("h3");
    postHeader.innerText= "Join the talks!"

    divPostContainer.appendChild(postHeader);

    let divFormContainer = document.createElement("div");
    divFormContainer.classList.add("form_container");

    let form = document.createElement("form");
    form.setAttribute("name", "formPost");
    form.setAttribute("method", "post");
    form.setAttribute("id", "formPost");
    form.setAttribute("action", "");

    let fieldsArr = ["Text"];
    let fieldNamesArr = {"Text": "Create Post"};

    for(let field of fieldsArr) {
        let x = document.createElement("div");
        x.classList.add("form_wrap");

        let item = document.createElement("div");
        item.classList.add("form_item");

        let label = document.createElement("label");
        label.innerText = fieldNamesArr[field];
        
        let input = document.createElement("input");
        input.setAttribute("type", "textarea");
        input.setAttribute("placeholder", "Share your thoughts with AY-ECO community");
        input.setAttribute("name", field);                
        input.pattern = ".{1,}";
        input.required = true;
        input.setAttribute("id", field + "Field");

        item.appendChild(label);
        item.appendChild(input);

        x.appendChild(item);

        form.append(x);
    }

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");

    let submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Post");
    submitBtn.setAttribute("name", "submit")
    submitBtn.setAttribute("id", "submitPost")

    //create failed response container
    let failedContainer = document.createElement("div");
    let failedMessage = document.createElement("p");
    failedMessage.setAttribute("id", "failedMessage");
    failedMessage.setAttribute("style", "color:red;text-align :center");
    

    failedContainer.appendChild(failedMessage);


    divBtn.appendChild(submitBtn);

    form.appendChild(divBtn);

    divFormContainer.appendChild(form);
    
    divPostContainer.appendChild(divFormContainer);
    divPostContainer.appendChild(failedContainer);
}


$(document).ready(function() {
    // Intercept the form submission
    $('#formPost').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Specific form field
        var formData = {
        Username: localStorage.getItem('username'),
        Text: $("#TextField").val()
        };

        // Send the form data to the PHP script using AJAX
        $.ajax({
            type: 'POST',
            url: 'publishPost.php',
            data: formData,
            success: function(response) {

                let answer = JSON.parse(response);
                //cheack if response is not  ok
                let failedMessage = document.getElementById("failedMessage");
                
                if(answer["message"]!="New record created successfully")
                {
                    failedMessage.innerText="There has been an error with creating the post";
                    return;
                }

                // Handle the response from the server
                console.log(response);
                $('#formPost')[0].reset(); // Reset the form fields

                // TODO: clear all posts in the posts container

                // TODO: load all posts from the database


            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
    });
});
