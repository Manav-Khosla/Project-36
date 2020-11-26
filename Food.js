class Food{
    constructor(){
        this.foodStock = 0
        this.lastFed;
        this.image = loadImage('images/Milk.png')
    }
    
    updateFoodStock(food){
     this.foodStock=food;
    }

    getFeedTime(lastFed){
        this.lastFed=lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }

    deductFood(){
    if(this.foodStock>0){
        this.foodStock = this.foodStock - 1;
    }
    }

    display(){
        var x = 10;
        var y = 250;
        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock; i++){
                if(i%10==0){
                    x=10;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
        
    }
}