// util file for reusable and utilities
const colours = {
    hoverOrange: "#fa6c1a",
    textWhite: "#ffffff"
}

// for this particular page the css elements need to change colour than the rest of the app
const navColour = document.getElementsByClassName("navbar-item");

for(let newColor of navColour){
    newColor.style.color = colours.textWhite;

    newColor.addEventListener('mouseover', () =>{
        newColor.style.color = colours.hoverOrange;
    })
    newColor.addEventListener('mouseout', () =>{
        newColor.style.color = colours.textWhite;
    })
}

const logo = document.getElementById("navbar-logo");
logo.style.color = colours.textWhite;

logo.addEventListener('mouseover', () =>{
    logo.style.color = colours.hoverOrange;
})
logo.addEventListener('mouseout', () =>{
    logo.style.color = colours.textWhite;
})

const footerLeft = document.getElementById("footer-left");
footerLeft.style.color = "#ffffff";

const footerRight = document.getElementById("footer-right");
footerRight.style.color = "#ffffff";




