
// getting key values -> keyCode works but is deprecated, key must be used. 
// returns a string value rather than numberic
// key pressing actions -> check if successful
// window.addEventListener('keydown', (e) => {
//     console.log(e);
// })


window.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowRight" || e.key == "d"){
        console.log("going right");
        // goRight();
        goUp(); 
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        console.log("going right");
        goLeft();  
    }
})

window.addEventListener("keyup", (e)=>{
    if(e.key == "ArrowRight" || e.key == "d"){
        console.log("going right");
        // goRight();
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        console.log("going right");
        // goLeft();
    }

    if(e.key == "Enter" || e.key == " "){
        shoot = shootBullet();
    }
})

// bullet
// - not visible - wall set - couple pixels outside canvas, destroyed when they pass beyond, key
// - each cycle - check position bullet 
// - if y less than 0 they are off the screen and can be removed

// game logic

/***
 * BOX 2D Web Definintions
 */

var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

/*****
* Objects for Destruction
*/

var destroylist = []; // Empty List at start


/*****
* Define Canvas and World
*/

var WIDTH=1000;
var HEIGHT=650;
var SCALE=30;
var world = new b2World(
new b2Vec2(0,9.81),
    true
);

var score=0;



// walls
var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),HEIGHT,(WIDTH/2),149,"ground",0);
var sky = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),-5,(WIDTH/2),5,"sky",0);
var leftWall = defineNewStatic(1.0,0.5,0.2,-1, HEIGHT, 1, HEIGHT,"side-wall",0);
var rightWall = defineNewStatic(1.0,0.5,0.2,WIDTH+2,HEIGHT,1,HEIGHT,"side-wall",0);


var player = defineNewDynamicCircle(0,0.5,0,WIDTH/2,HEIGHT,15,"player");

// var enemy = defineNewDynamic(0,0.5,0,generateRandom(),-5,3,7,"enemy");
var enemy = defineNewDynamic(0,0.5,0,generateRandom(),-4,20,20,"enemy");
var shoot;

let enemySpawn = setInterval(()=>{
    enemy = defineNewDynamic(0,0.5,0,generateRandom(),-4,20,20,"enemy");
}, 5000);

function generateRandom(){
    let random = Math.floor(Math.random() * WIDTH) + 1;
    return random;
}


let random=Math.floor(Math.random() * 7) + 1;;

player.GetBody().SetFixedRotation(true);

// player.GetBody().ApplyForce(hero.GetBody().GetMass() * world.GetGravity(), hero.GetBody().GetWorldCenter());
// player.GetBody().SetGravity(0);
// player.GetBody().gravityScale = 0.0;

// easel js - box invisible
// rotation fixed

function shootBullet(){
    var x  = player.GetBody().GetPosition().x * SCALE;
    var y = player.GetBody().GetPosition().y*SCALE;
    var bullet = defineNewDynamic(0,0.5,0,x,y,3,7,"bullet");
    bullet.GetBody().ApplyImpulse(new b2Vec2(0,1000), player.GetBody().GetWorldCenter());
    bullet.GetBody().SetLinearVelocity(new b2Vec2(player.GetBody().GetLinearVelocity().x,1000));
    return bullet;
}

console.log(player.GetBody().GetWorldCenter());

function goUp() {
    player.GetBody().ApplyImpulse(new b2Vec2(10,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x > 10){
        player.GetBody().SetLinearVelocity(new b2Vec2(10,player.GetBody().GetLinearVelocity().y));
    }
 }

function updateScore(){
    scoreTag = document.getElementById("score");
    scoreTag.innerHTML = ""+ getScore();
}

/*
Debug Draw
*/

var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(
    document.getElementById("game-canvas").getContext("2d")
);
debugDraw.SetDrawScale(SCALE);
debugDraw.SetFillAlpha(0.3);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);


// Update World Loop
function update() {
    world.Step(
        1/60, // framerate
        10, // velocity iterations
        10 // position iterations
    );
    world.DrawDebugData();
    world.ClearForces();

    for(var i in destroylist) {
        world.DestroyBody(destroylist[i]);
    }
    destroylist.length = 0;

    updateScore();
    
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

/*****
* Listeners
*/

var listener = new Box2D.Dynamics.b2ContactListener;
const container = document.getElementById('text-container');
let canJump;

listener.BeginContact = function(contact) {
   //  console.log("Begin Contact:"+contact.GetFixtureA().GetBody().GetUserData());
    var fixa=contact.GetFixtureA().GetBody().GetUserData();
    var fixb=contact.GetFixtureB().GetBody().GetUserData();

    if(fixa.id == "bullet" && fixb.id == "enemy"){
        destroylist.push(contact.GetFixtureA().GetBody());
        destroylist.push(contact.GetFixtureB().GetBody())
        incrementScore();
    }
    if(fixb.id == "bullet" && fixa.id == "enemy"){
        destroylist.push(contact.GetFixtureB().GetBody())
        destroylist.push(contact.GetFixtureA().GetBody())
        incrementScore();
    }
    if(fixb.id == "bullet" && fixa.id == "sky"){
        destroylist.push(contact.GetFixtureB().GetBody());
    }
    if(fixb.id == "sky" && fixa.id == "bullet"){
        destroylist.push(contact.GetFixtureA().GetBody());
    }
    if(fixa.id == "enemy" && fixb.id == "ground"){
        destroylist.push(contact.GetFixtureA().GetBody());
        gameOver();

    }
    if(fixa.id == "ground" && fixb.id == "enemy"){
        destroylist.push(contact.GetFixtureB().GetBody());
        gameOver();
    }
    if(fixa.id == "enemy" && fixb.id == "player"){
        destroylist.push(contact.GetFixtureA().GetBody());
        gameOver();
    }
    if(fixa.id == "player" && fixb.id == "enemy"){
        destroylist.push(contact.GetFixtureB().GetBody());
        gameOver();
    }
}

listener.EndContact = function(contact) {
   //  console.log("End Contact:"+contact.GetFixtureA().GetBody().GetUserData());
   var fixa=contact.GetFixtureA().GetBody().GetUserData();
   var fixb=contact.GetFixtureB().GetBody().GetUserData();
}

listener.PostSolve = function(contact, impulse) {
        var fixa=contact.GetFixtureA().GetBody().GetUserData().id;
        var fixb=contact.GetFixtureB().GetBody().GetUserData().id;
       //  console.log(fixa+" hits "+fixb+" withimp:"+impulse.normalImpulses[0]);
}

listener.PreSolve = function(contact, oldManifold) {
}

this.world.SetContactListener(listener);

// player moves
function goRight()  {
    player.GetBody().ApplyImpulse(new b2Vec2(10,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x > 10){
        player.GetBody().SetLinearVelocity(new b2Vec2(15,player.GetBody().GetLinearVelocity().y));
    }
 }
 
 function goLeft() {
    player.GetBody().ApplyImpulse(new b2Vec2(-5,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x < -10){
        player.GetBody().SetLinearVelocity(new b2Vec2(-10,player.GetBody().GetLinearVelocity().y));
    }
 }


function defineNewStatic(density, friction, restitution, x, y, width, height, objid, angle) {
    var fixDef = new b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = friction;
    fixDef.restitution = restitution;
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = x / SCALE;
    bodyDef.position.y = y / SCALE;
    bodyDef.angle = angle;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(width/SCALE, height/SCALE);
    var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
    thisobj.GetBody().SetUserData({id:objid})
    return thisobj;
}

function defineNewDynamic(density, friction, restitution, x, y, width, height, objid) {
    var fixDef = new b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = friction;
    fixDef.restitution = restitution;
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x / SCALE;
    bodyDef.position.y = y / SCALE;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(width/SCALE, height/SCALE);
    var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
    thisobj.GetBody().SetUserData({id:objid})
    return thisobj;
}

function defineNewDynamicCircle(density, friction, restitution, x, y, r, objid) {
    var fixDef = new b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = friction;
    fixDef.restitution = restitution;
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.x = x / SCALE;
    bodyDef.position.y = y / SCALE;
    fixDef.shape = new b2CircleShape(r/SCALE);
    var thisobj = world.CreateBody(bodyDef).CreateFixture(fixDef);
    thisobj.GetBody().SetUserData({id:objid})
    return thisobj;
}



// score functions

function getScore (){
    return this.score;
}

function setScore (score){
    return this.score = score;
}

function resetScore(){
    score=0;
    return score;
}

function incrementScore(){
    score+=1;
    return score;
}

function decreaseScore (){
    if(score>=0){
        return score;
    }else{
        return score = 0;
    }
}

// game over logic.
function gameOver(){
    var showModal = document.getElementById("modal-container");
    showModal.style.display="block";
    resetScore();
    clearInterval(enemySpawn);
    storeData();
}

function storeData(){
    var getScore = document.getElementById("score").innerHTML;
    var getUsername = document.getElementById("username").innerHTML;

    const users = [{
        username: getUsername,
        score:  getScore
    }
    ]

    console.log(users.username);
    console.log(users.score);

    var addItems = window.localStorage.setItem('users', JSON.stringify(users));

}

