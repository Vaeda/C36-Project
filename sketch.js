var database;
var foodS = 20;
var foodStock;
var dog,dog1,dog2;
var position;
//var form
var feed,add,last; 
var foodobject;
var Feedtime;
var Lastfeed;
var name = "Dog";
function preload()
{
  dogimg1 = loadImage("Images/Dog.png");
  dogimg2 = loadImage("Images/happy dog.png");
  MilkImage = loadImage('Images/Milk.png');
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1);
  dog.scale = 0.2;;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  Lastfeed = database.ref('FeedTime');
  Lastfeed.on("value",readTime);

  var doggie = database.ref('Food');
  doggie.on("value", readPosition, showError);

  feed = createButton("FEED DOG");
  feed.position(1100,100);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(1000,100);
  add.mousePressed(AddFood);

  var greeting = createElement('h3');
  greeting.html("Hello Sophie!");
  greeting.position(1050, 125);
   
}
function readTime(time){
  Feedtime = time.val();
}
function readStock(data){
 foodS = data.val();

}

function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var pasttime,delay = 15;
function draw() {  

  background(46,139,87);

  foodobject.display()

  drawSprites();
   
  fill(255,255,254);
  textSize(20);
  //console.log(Feedtime)
  text("Last Feed: "+pasttime, 800, 50)
 drawSprites();
 setToHour()
 if(pt<frameCount-delay){
  dog.addImage(dogimg1) 
 }
 if(pt>frameCount-delay){
  image(MilkImage,500+(frameCount-pt),220,100,80);
 }
}
function setToHour(){
  pasttime = "Undefined"
  if(Feedtime){
    if(Feedtime >=12)
    pasttime = Feedtime- 12 +"PM"
   }
   else {
     pasttime = Feedtime +"AM"
   }
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}
function writePosition(milk){
  if(nazo>0){
    milk = milk-1
  }
  else{
    milk = 0
  }
  database.ref('/').set({
    'Food': milk
  })

}
var pt;
function FeedDog(){

  if(foodS>0){
    pt = frameCount;

    dog.addImage(dogimg2) 
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    database.ref('/').update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour()
   })
  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }