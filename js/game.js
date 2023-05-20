
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
* EaselJs Globals
*/

var easelCan, easelctx, loader, stage, stageheight, stagewidth;
var ship, meteor, bullets;

/*****
* Objects for Destruction
*/

var destroylist = []; // Empty List at start
var easelenemies = [];
var easelbullets = [];


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

var enemies = [];
var bulletslist = [];


// environment variables
var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),HEIGHT,(WIDTH/2),149,"ground",0);
var sky = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),-5,(WIDTH/2),5,"sky",0);
var leftWall = defineNewStatic(1.0,0.5,0.2,-1, HEIGHT, 1, HEIGHT,"side-wall",0);
var rightWall = defineNewStatic(1.0,0.5,0.2,WIDTH+2,HEIGHT,1,HEIGHT,"side-wall",0);
var player = defineNewDynamicCircle(0,0.5,0,WIDTH/2,HEIGHT,30,"player");
var enemy;
var bullet;
var bullets;
var shoot;
var score=0;
var isShot = false;

// player variables
player.GetBody().SetFixedRotation(true);

// enemy variables
// let enemySpawn = setInterval(()=>{
//     enemy = defineNewDynamic(0,0.5,0,generateRandom(),-4,20,20,"enemy");
//     enemy.GetBody().ApplyImpulse(new b2Vec2(generateRandomImpulse(),generateRandomImpulse()), player.GetBody().GetWorldCenter());
// }, 5000);

let enemySpawn;

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


function init(){
    easelCan = document.getElementById("easelcan"); 
    easelctx = easelCan.getContext("2d");
    stage = new createjs.Stage(easelCan);
    stage.snapPixelsEnabled = true;
    stagewidth = stage.canvas.width;
    stageheight = stage.canvas.height;

    var manifest = [
        {src:"ship.png", id:"ship"},
        {src:"bullet.png", id:"bullet"},
        {src:"meteor.png", id:"meteor"},
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "../assets/");

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

}


function handleComplete(){
    ship = makeBitmap(loader.getResult("ship"),50,50);
    stage.addChild(ship);

    enemySpawn = window.setInterval(()=>{
        enemy = defineNewDynamic(0,0.5,0,generateRandom(),-4,20,20,"enemy");
        enemy.GetBody().ApplyImpulse(new b2Vec2(generateRandomImpulse(),generateRandomImpulse()), player.GetBody().GetWorldCenter());
        meteor = makeBitmap(loader.getResult("meteor"),30,30);
        stage.addChild(meteor);
        return meteor; 
    }, 5000);


    createjs.Ticker.framerate = 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

}


function tick(e){
    update();
    stage.update(e);
}

// Update World Loop
function update() {
    world.Step(
        1/60, // framerate
        10, // velocity iterations
        10 // position iterations
    );

    ship.x = player.GetBody().GetPosition().x * SCALE;
    ship.y = player.GetBody().GetPosition().y * SCALE;

    if(meteor != undefined) {
        meteor.x = enemy.GetBody().GetPosition().x * SCALE;
        meteor.y = enemy.GetBody().GetPosition().y * SCALE;  
    }

    if(bullet != undefined) {
        bullets.x = bullet.GetBody().GetPosition().x * SCALE;
        bullets.y = bullet.GetBody().GetPosition().y * SCALE; 
    }

    if(enemies.length!=0) {
        for(var i in enemies) {
            i /= 60;
            console.log(enemies[i]);
        }
    }

    world.DrawDebugData();
    world.ClearForces();

    for(var i in destroylist) {
        world.DestroyBody(destroylist[i]);
        stage.removeChild(destroylist[i]);
    }

    destroylist.length = 0;

    updateScore();
    
    // window.requestAnimationFrame(update);
}

// window.requestAnimationFrame(update);

init();

/*****
* Listeners
*/

var listener = new Box2D.Dynamics.b2ContactListener;
const container = document.getElementById('text-container');

listener.BeginContact = function(contact) {
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
        // gameOver();

    }
    if(fixa.id == "ground" && fixb.id == "enemy"){
        destroylist.push(contact.GetFixtureB().GetBody());
        // gameOver();
    }
    if(fixa.id == "enemy" && fixb.id == "player"){
        destroylist.push(contact.GetFixtureA().GetBody());
        // gameOver();
    }
    if(fixa.id == "player" && fixb.id == "enemy"){
        destroylist.push(contact.GetFixtureB().GetBody());
        // gameOver();
    }
}

listener.EndContact = function(contact) {
   var fixa=contact.GetFixtureA().GetBody().GetUserData();
   var fixb=contact.GetFixtureB().GetBody().GetUserData();
}

listener.PostSolve = function(contact, impulse) {
        var fixa=contact.GetFixtureA().GetBody().GetUserData().id;
        var fixb=contact.GetFixtureB().GetBody().GetUserData().id;
}

listener.PreSolve = function(contact, oldManifold) {
}

this.world.SetContactListener(listener);



// utility functions

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

// player key functions

window.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowRight" || e.key == "d"){
        goRight();
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        goLeft();  
    }
})

window.addEventListener("keyup", (e)=>{
    if(e.key == "ArrowRight" || e.key == "d"){
        goRight();
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        goLeft();
    }

    if(e.key == "Enter" || e.key == " "){
        shoot = shootBullet();
    }
})


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

function updateScore(){
    scoreTag = document.getElementById("score");
    scoreTag.innerHTML = ""+ getScore();
}

// additional game functions
function generateRandom(){
    let random = Math.floor(Math.random() * WIDTH) + 1;
    return random;
}

//random number between -10 and 10 
function generateRandomImpulse() {
    var smallRandom = Math.floor(Math.random() * 21) - 10;
    if (smallRandom == 0) return generateRandomImpulse();
    return smallRandom;
}

function shootBullet(){
    isShot = true;
    var x  = player.GetBody().GetPosition().x * SCALE;
    var y = player.GetBody().GetPosition().y*SCALE;
    bullet = defineNewDynamic(0,0.5,0,x,y,3,7,"bullet");
    bullet.GetBody().ApplyImpulse(new b2Vec2(0,1000), player.GetBody().GetWorldCenter());
    bullet.GetBody().SetLinearVelocity(new b2Vec2(player.GetBody().GetLinearVelocity().x,1000));
    bullets = makeBitmap(loader.getResult("bullet"), 3,7);
    stage.addChild(bullets);
    return bullets;
}

// player movement functions

function goRight() {
    player.GetBody().ApplyImpulse(new b2Vec2(20,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x > 20){
        player.GetBody().SetLinearVelocity(new b2Vec2(20,player.GetBody().GetLinearVelocity().y));
    }
 }
 
 function goLeft() {
    player.GetBody().ApplyImpulse(new b2Vec2(-20,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x < -20){
        player.GetBody().SetLinearVelocity(new b2Vec2(-20,player.GetBody().GetLinearVelocity().y));
    }
 }

// data functions
function storeData(){
    var getScore = document.getElementById("score").innerHTML;
    var getUsername = document.getElementById("username").innerHTML;
    const users = [{
        username: getUsername,
        score:  getScore
    }]

    var addItems = window.localStorage.setItem('users', JSON.stringify(users));
}


//easel functions
function makeBitmap(ldrimg, b2x, b2y){
    var theimage = new createjs.Bitmap(ldrimg);
    var scalex = (b2x*2)/theimage.image.naturalWidth;
    var scaley = (b2y*2)/theimage.image.naturalHeight;
    theimage.scaleX = scalex;
    theimage.scaleY = scaley;
    theimage.regX = theimage.image.width/2;
    theimage.regY = theimage.image.height/2;
    return theimage;
}