function createPostsTable() {
    let postsContainer = document.getElementById("postsContainer");

    let table = document.createElement("table");
    table.setAttribute("id", "postsTable");

    let headerRow = document.createElement("tr");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    let th5 = document.createElement("th");

    th1.innerText = "Post No.";
    th2.innerText = "Posted By"
    th3.innerText = "Post";
    th4.innerText = "Date";
    th5.innerText = "Like";

    th3.setAttribute("id", "postsHeader");

    postsContainer.appendChild(table);

    table.appendChild(headerRow);

    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    headerRow.appendChild(th4);
    headerRow.appendChild(th5);
}

function promptUser() {
    let answer = window.prompt("Please enter the username to get how much posts they posted", "AY-ECO");

    if(answer != null){
        NumOfPostsByUser(answer);
    }
}

function NumOfPostsByUser(username) {
    // Send the form data to the PHP script using AJAX
    $.ajax({
        type: 'GET',
        url: 'NumOfPostsByUserScript.php',
        data: {'username': username},
        success: function(response) {
            // Handle the response from the server
            numOfPosts = JSON.parse(response)['COUNT(id)'];             
            alert(`Number of posts by ${username} is ${numOfPosts}`);          

            console.log(response);
        },
        error: function(error) {
            console.log('An error occurred: ' + error);
        }            
    });                   
}

function loadPosts() {
    // Send the form data to the PHP script using AJAX
    $.ajax({
        type: 'GET',
        url: 'loadPostsScript.php',
        //data: formData,
        success: function(response) {
            // Handle the response from the server
            posts = JSON.parse(response);             
            initPosts(posts);             
        },
        error: function(error) {
            console.log('An error occurred: ' + error);
        }            
    });                   
}

function initPosts(posts) {
    console.log(posts)

    //get the Post container
    let postsContainer = document.getElementById("postsContainer");

    //init the container by remove its html
    postsContainer.innerHTML = "";

    //create the post table
    createPostsTable();

    //get the post table
    let table = document.getElementById("postsTable");    

    posts.forEach(post => {        
        console.log(post);

        //create a new row in the table for each post
        let tr = document.createElement("tr");
        tr.classList.add("postRow");

        table.appendChild(tr);

        let tdPostNo = document.createElement("td");
        let tdPostedBy = document.createElement("td");
        let tdPost = document.createElement("td");
        let tdDate = document.createElement("td");
        let tdLike = document.createElement("td");

        let postDiv = document.createElement("div");

        postDiv.classList.add("postDiv");

        tdPost.appendChild(postDiv);

        tdPostNo.classList.add("centeredHeader");
        tdPostedBy.classList.add("centeredHeader");
        tdLike.classList.add("centeredHeader");

        tr.appendChild(tdPostNo);
        tr.appendChild(tdPostedBy);
        tr.appendChild(tdPost);
        tr.appendChild(tdDate);
        tr.appendChild(tdLike);

        tdPostNo.innerText = post.Id;
        tdPostedBy.innerText = post.username;
      
        if(isLogged() && post.username == localStorage.getItem('username')) {
            let textareaField = document.createElement("textarea");
            textareaField.innerText = post.text;
            textareaField.style.width = "100%";

            let updateButton = document.createElement("button");
            updateButton.innerText = "Update"
            updateButton.value = post.Id;
            updateButton.addEventListener("click", function () {
                let updatedText = this.parentElement.getElementsByTagName("textarea")[0].value;

                $.ajax({
                    type: 'POST',
                    url: 'updatePost.php',
                    data: {
                        'postId' : post.Id,
                        'username' : localStorage.getItem('username'),                        
                        'updatedText' : updatedText                        
                    },
                    success: function(response) { 
                        if(response) {
                            location.reload();
                        }                     
                        else {
                            alert("Update failed");
                        }                                      
                        
                    },
                    error: function(error) {
                        console.log('An error occurred: ' + error);
                    }            
                });

            });

            postDiv.appendChild(textareaField);
            postDiv.appendChild(updateButton);
        }
        else {
            postDiv.innerText = post.text;
        }

        tdDate.innerText = post.post_date;

        let spanHeart = document.createElement("span");

        spanHeart.classList.add("like-btn");

        $.ajax({
            type: 'GET',
            url: 'likesCount.php',
            data: {
                'postId' : post.Id
            },
            success: function(response) {            
                spanHeart.innerText = JSON.parse(response)['COUNT(username)'];
                console.log(response);
            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
        
        if(isLogged()) {
            $.ajax({
                type: 'GET',
                url: 'isLikedByUser.php',
                data: {
                    'username': localStorage.getItem('username'),
                    'postId' : post.Id
                },
                success: function(response) {            
                    let answer = JSON.parse(response);

                    if(answer != null) {
                        setHeart(spanHeart);
                    }
                    
                    console.log(response);
                },
                error: function(error) {
                    console.log('An error occurred: ' + error);
                }            
            });
        }

        spanHeart.setAttribute('onclick', "clickHeart(this)");

        tdLike.appendChild(spanHeart);
    });    
}

function clickHeart(el) {
    
    if(!isLoggedAlert()) {
        return false;
    }

    // handle client-side like
    el.classList.toggle('is-active');    

    // handle server-side like
    let username = localStorage.getItem('username');
    let postId = el.parentElement.parentElement.getElementsByTagName('td')[0].innerText;

    let likesCount = parseInt(el.innerText);

    if(el.classList.contains('is-active')) {
        likePost(username, postId); 
        el.innerText = likesCount+1;       
    }
    else {
        dislikePost(username, postId);
        el.innerText = likesCount-1;
    }
}

function setHeart(el) {
    el.classList.add('is-active')
}


function remHeart(el) {
    el.classList.remove('is-active')
}

function likePost(username, postId) {
    $.ajax({
        type: 'POST',
        url: 'likePostScript.php',
        data: {
            'username' : username,
            'postId' : postId
        },
        success: function(response) {            
            console.log(response);
        },
        error: function(error) {
            console.log('An error occurred: ' + error);
        }            
    });
}

function dislikePost(username, postId) {
    $.ajax({
        type: 'POST',
        url: 'dislikePostScript.php',
        data: {
            'username' : username,
            'postId' : postId
        },
        success: function(response) {            
            console.log(response);
        },
        error: function(error) {
            console.log('An error occurred: ' + error);
        }            
    });
}