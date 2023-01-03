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
}, 2500);

// Text Animation


// text animation - space 
const space = document.querySelector(".space");
const strSpace = space.textContent;
const spaceSplit = strSpace.split("");
space.textContent = "";

// adding text to span through a for a loop
for(let x = 0; x<spaceSplit.length; x++){
    space.innerHTML += "<span>" +spaceSplit[x]+ "</span>";
}

let letter = 0;
let timer = setInterval(onSpace, 50);

function onSpace(){
    const spanSpace = space.querySelectorAll("span")[letter];
    spanSpace.classList.add("faded");
    letter++;
    if(letter === spaceSplit.length){
        complete();
        return;
    }
}

function complete(){
    clearInterval();
    timer = null;
}

// text animation - invaders
const invaders = document.querySelector(".invaders");
const strInvaders = invaders.textContent;
const invadersSplit = strInvaders.split("");
invaders.textContent = "";

// adding text to span through a for a loop
for(let i = 0; i<invadersSplit.length; i++){
    invaders.innerHTML += "<span>" +invadersSplit[i]+ "</span>";
}

let char = 0;
let timerTwo = setInterval(onInvader, 50);

function onInvader(){
    const spanInvader = invaders.querySelectorAll("span")[char];
    spanInvader.classList.add("faded");
    char++;
    if(char === invadersSplit.length){
        completedInvaders();
        return;
    }
}

function completedInvaders(){
    clearInterval();
    timerTwo = null;
}
