let HOME_NAME = "home"
let NEWS_NAME = "news"
let CONTACT_NAME = "contact"
let ABOUT_NAME = "about"

function topnavLoader(curPage) {

    // init
    let topnav = document.createElement("div");
    let home = document.createElement("a");
    let news = document.createElement("a");
    let contact = document.createElement("a");
    let about = document.createElement("a");   
    
    // set inner text of all childs
    home.innerText = "home";


    console.log(Object.keys({home})[0]);

    // set href of all childs
    home.setAttribute("href", HOME_NAME + ".html");

    // set id for all divs
    topnav.setAttribute("id", "topnav");
    home.setAttribute("id", "home");
    news.setAttribute("id", "news");
    contact.setAttribute("id", "contact");
    about.setAttribute("id", "about");

    // add all childs to the topnav
    topnav.appendChild(home);
    topnav.appendChild(news);
    topnav.appendChild(contact);
    topnav.appendChild(about);

    // add topnav to body
    document.body.appendChild(topnav);


    
    // decide which nav is active
    switch(curPage) {
        case HOME_NAME:
            home.classList.add("active");
            break;
        case NEWS_NAME:
            news.classList.add("active");
            break;
        case CONTACT_NAME:
            contact.classList.add("active");
            break;
        case ABOUT_NAME:
            about.classList.add("active");
            break;                        
    }
}