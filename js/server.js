
// const getItems = JSON.parse(window.localStorage.getItem('users'));
// console.log(getItems);
// const getData = Object.values(getItems);
// console.log(getData);

// const removeItems = window.localStorage.removeItem('user');

// console.log(getItems)

// checks the length of local storage if 0 then its empty
// if item return a mapped array to a scoreboard div element
// else return a generic info board

// const user = [
//     {
//     username: 'john',
//     score: 100
//     },
//     {
//         username: 'bob',
//         score: 120
//     }
// ]


// const addItems = window.localStorage.setItem('user', JSON.stringify(user));

const getItems = JSON.parse(window.localStorage.getItem('users'));


if(localStorage.length !=0 ||  localStorage != undefined || localStorage != null){
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
    
    ).join('')

}else{
    document.getElementById('container-board').innerHTML += `
       <div class="info-board">
            <p class="score-info">No Scoreboards available</p>
            <p class="score-info">Play the game to enter the board</p>
        </div>
    `
}
