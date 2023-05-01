let HOME_NAME = "Home"
let NEWS_NAME = "News"
let CONTACT_NAME = "Contact"
let ABOUT_NAME = "About"

// arr that contains names of pages in the website
// that each page will be added to the topnav
// with inner text of the web page itself
// and link to the website itself
let pageNameArr = ["Home", "News", "LifeStyle", "Events", "Store", "Community Feed"]

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

    // add topnav to body
    document.body.appendChild(topnav);

 

 
}