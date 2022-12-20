// getting key values -> keyCode works but is deprecated, key must be used. 
// returns a string value rather than numberic

window.addEventListener("keydown", (e)=>{
    console.log(e.key);
})

// key pressing actions -> check if successful
window.addEventListener("keydown", (e)=>{
 
    if(e.key == "ArrowRight" || e.key == "d"){
        console.log("going right");
    }
    if(e.key == "ArrowLeft" || e.key == "a"){
        console.log("going right");
    }

})


// world setup
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

var destroylist = []; // Empty List at start

/*****
* Define Canvas and World
*/
 var WIDTH=500;
 var HEIGHT=500;
 var SCALE=30;
 var world = new b2World(
 new b2Vec2(0,9.81),
     true
 );

var player = defineNewDynamic(1.0,0.5,0.1,30,320,50,50,"player");

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


//  game loop
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

// build shapes
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