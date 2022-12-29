console.log("this is a server script");

const users = [
    {
    username: 'john',
    score: 100
    },
    {
        username: 'bob',
        score: 120
    }
]


const addItems = window.localStorage.setItem('user', JSON.stringify(users));
// // console.log(users)

const getItems = JSON.parse(window.localStorage.getItem('user'));

// const removeItems = window.localStorage.removeItem('user');

// console.log(getItems)

if(localStorage.length !=0){

    // mapping returned values to a html elemenent
    // do this for each user 
    document.getElementById('container-board').innerHTML = getItems.map(user=>
        // not needed right now but will be 
        // if(users.some(existUser => existUser.username === user.username)){
        //     console.log('found a user');
        // 
        `<div class="score-card">
        <p class="score-username">${user.username}</p>
        <p class="score-score">${user.score}</p>
        </div>`
        // console.log(user.username);
        // console.log(user.score);
    ).join('')
    
}else{
    document.getElementById('container-board').innerHTML += `
       <div class="info-board">
            <p class="score-info">No Scoreboards available</p>
            <p class="score-info">Play the game to enter the board</p>
        </div>
    `
}