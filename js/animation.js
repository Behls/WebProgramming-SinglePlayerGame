// delay on buttons and navigation coming in after animation

const button = document.getElementById("btn-begin");
const nav = document.getElementById("navbar-container");
const footer = document.getElementById("footer-container");

// set the components to none, want the main container to be center.
nav.style.display = "none";
footer.style.display = "none";


const showItems = setTimeout(()=>{
    nav.style.display = "flex";
    footer.style.display = "flex";
    button.style.display = "block";  
}, 5000);

// text animation

