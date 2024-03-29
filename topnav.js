// arr that contains names of pages in the website
// that each page will be added to the topnav
// with inner text of the web page itself
// and link to the website itself
let pageNameArr = ["Home", "News", "LifeStyle", "Events", "Store", "Community Feed", "Quiz"]

function topnavLoader(curPage) {

    let topnav = document.createElement("div");
    topnav.setAttribute("class", "topnav");
    
    for(let name of pageNameArr) {
        // create element
        let x = document.createElement("a");

        //set id
        x.setAttribute("id", name)

        // set inner text of all childs
        x.innerText = name;

        // set href link
        x.setAttribute("href", name + ".html");

        // decide which nav is active
        if(name==curPage){ x.classList.add("active")}

        //add element to topnav
        topnav.appendChild(x);
    }   

    //add register linker
    let loginLinker = document.createElement("a");

    loginLinker.classList.add("aRight");
    loginLinker.classList.add("start-btn");
    loginLinker.setAttribute("id", "topnavLogin");
    loginLinker.innerText = "Login";
    loginLinker.setAttribute("href", "#");    

    //add register linker
    let registerLinker = document.createElement("a");

    registerLinker.classList.add("aRight");
    registerLinker.classList.add("start-btn");
    registerLinker.setAttribute("id", "topnavRegister");
    registerLinker.innerText = "Register";
    registerLinker.setAttribute("href", "#");

    //add logout linker
    let logoutLinker = document.createElement("a");

    logoutLinker.classList.add("aRight");
    logoutLinker.classList.add("start-btn");
    logoutLinker.classList.add("hidden");
    logoutLinker.setAttribute("id", "topnavLogout");
    logoutLinker.innerText = "Logout";
    logoutLinker.setAttribute("href", "#");   
    
    //add username 

    let username = document.createElement("a");

    username.classList.add("aRight");
    username.classList.add("start-btn");
    username.classList.add("hidden");
    username.setAttribute("id", "topnavUsername");
    username.innerText = "";
    
    

    topnav.appendChild(logoutLinker);
    topnav.appendChild(username);
    topnav.appendChild(registerLinker);
    topnav.appendChild(loginLinker);

    // add topnav to body
    document.body.appendChild(topnav);

    

 
}

function loggedChecker() {
    if(localStorage.getItem('username') != null) {

        togglelogged();
        let usernameBtn = document.getElementById("topnavUsername");

        // usage of strings
        var str1 = "Hello ";
        var str2 = localStorage.getItem('username');
        var str3 = str1.concat(str2);
        
        usernameBtn.innerText= str3; 

    }
 
}

function togglelogged(){
    let registerBtn = document.getElementById("topnavRegister");
    let loginBtn = document.getElementById("topnavLogin");
    let logoutBtn = document.getElementById("topnavLogout");
    let usernameBtn = document.getElementById("topnavUsername");

    registerBtn.classList.toggle("hidden");
    loginBtn.classList.toggle("hidden");
    logoutBtn.classList.toggle("hidden");
    usernameBtn.classList.toggle("hidden");
}

function logoutUser(){

    if(!isLogged()) {
        return false;
    }

    localStorage.removeItem('username');
    location.reload();
    return true;
}

function isLogged() {
    if(localStorage.getItem('username') != null)
        return true;
    return false;    
}

function isLoggedAlert() {
    if(isLogged())        
        return true;

    alert("Please login before doing this action");
    return false;    
}

$(document).ready(function(){
    $('#topnavLogout').click(function(){
    logoutUser();
    togglelogged();
    });
}); 
