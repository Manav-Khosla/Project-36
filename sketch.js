//Create variables here
var dogImage, happyDogImage, dog;
var canvas;
var foodStock, database;
var foodS;
var fedTime, lastFed, feed, addFood;
var foodObj;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");

}

function setup() {
	canvas = createCanvas(1000, 500);
  database = firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150 ,150);
  dog.addImage(dogImage);
  dog.scale = 0.5;

  foodObj = new Food();

  feed = createButton("Feed the Dog!");
  feed.position(900, 68);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food to Storage");
  addFood.position(1000, 68);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(40, 150, 20);
  foodObj.display()
  //add styles here

  fedTime=database.ref('fedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  
  textSize(20);
  fill("White");
  if(lastFed>=12){
    text("Last Fed: "+ lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("Last Fed: 12 AM",350,30)
  }else{
    text("Last Fed: "+lastFed+" AM",350,30);
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    fedTime: hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  });
  dog.addImage(dogImage);
}



