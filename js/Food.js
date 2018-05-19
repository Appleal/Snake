(function(){
    window.Food = function(mediator){
        var self = this;
        do{
            this.row = ~~(Math.random() * mediator.rowAmount);
            this.col = ~~(Math.random() * mediator.colAmount);
        }while((function(){ //IIFE的执行，返回true或fasle
            for(var i = 0;i < mediator.snake.body.length;i++){
                if(mediator.snake.body[i].row == self.row && mediator.snake.body[i].col == self.col){
                    return true; //食物随机到蛇身上，重新随机一次
                }
                return false; //如果食物不在蛇身上，终止循环
            }
        })());
    }
    Food.prototype.render = function(){
        game.setHTML(this.row,this.col,"♥");
    }
})();