// getting key values -> keyCode works but is deprecated, key must be used. 
// returns a string value rather than numberic

window.addEventListener("keydown", (e)=>{
    console.log(e.key);
})

// key pressing actions -> check if successful
window.addEventListener("keydown", (e)=>{
 
    if(e.key == "ArrowRight" || e.key == "d"){
        console.log("going right");
        goRight();
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        console.log("going right");
        goLeft();
    }
    if(e.key == " "){
        console.log("space");
        shootBullet();
    }

})

// bullet
// - not visible - wall set - couple pixels outside canvas, destroyed when they pass beyond, key
// - each cycle - check position bullet 
// - if y less than 0 they are off the screen and can be removed


function shootBullet(){
    
}


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

// change colour of these
var ground = defineNewStatic(1.0,0.5,0.2,(WIDTH/2),HEIGHT,(WIDTH/2),40,"floor",0);


var leftWall = defineNewStatic(1.0,0.5,0.2,1, HEIGHT, 1, HEIGHT,"side-wall",0);
var rightWall = defineNewStatic(1.0,0.5,0.2,WIDTH-1,HEIGHT,1,HEIGHT,"side-wall",0);

var player = defineNewDynamicCircle(0,0.5,0.1,30,570,10,"player");
player.GetBody().SetFixedRotation(true);

// player.GetBody().ApplyForce(hero.GetBody().GetMass() * world.GetGravity(), hero.GetBody().GetWorldCenter());
// player.GetBody().SetGravity(0);
// player.GetBody().gravityScale = 0.0;

// easel js - box invisible
// rotation fixed




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


// movement keys
$(document).keydown(function(e){
   if(e.keyCode == 65 || e.keyCode == 37){
        goLeft();
    }if(e.keyCode == 68 || e.keyCode == 39){
        goRight();
    }
 })
 
 $(document).keyup(function(e){
    if(e.keyCode == 65 || e.keyCode == 37){
        console.log("left up");
    }if(e.keyCode == 68 || e.keyCode == 39){
        console.log("right up");
    }
 })


// player moves
function goRight()  {
    player.GetBody().ApplyImpulse(new b2Vec2(5,0), player.GetBody().GetWorldCenter());
    if(player.GetBody().GetLinearVelocity().x > 10){
        player.GetBody().SetLinearVelocity(new b2Vec2(10,player.GetBody().GetLinearVelocity().y));
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

