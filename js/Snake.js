(function(){
    window.Snake = function(){
        //蛇当前动态的方向
        this.direction = "R";
        // 即将设置的方向，这里是为了防止用户按很快出bug
        this.willDirection = "R";
        //接收Game类当做子属性（中介者）
        //蛇的身体，可以让蛇运动起来，头增尾删
        this.body = [
            {"row" : 2, "col":6},
            {"row" : 2, "col":5},
            {"row" : 2, "col":4},
            {"row" : 2, "col":3},
            {"row" : 2, "col":2},
        ];
    }
    //渲染蛇的身体方法
    Snake.prototype.render = function(){
        //蛇头设为绿色
        game.setColor(this.body[0].row,this.body[0].col,'green');
        for(var i = 1;i < this.body.length; i++){
            //这里写违反了高内聚低耦合的原则，改一改东西的属性应该要调用人家提供的方法
            // game.dom.getElementsByTagName('tr')[this.body[i].row].getElementsByTagName('td')[this.body[i].col].style.background = 'red';
            game.setColor(this.body[i].row,this.body[i].col,'red');
        }
    }

    Snake.prototype.update = function(){
        this.direction = this.willDirection;
        switch(this.direction){//根据方向头插
            case "R":
                var toucha = {"row" : this.body[0].row, "col":this.body[0].col + 1}
                this.body.unshift(toucha); //头插
                break;
            case "D":
                var toucha = {"row" : this.body[0].row + 1, "col":this.body[0].col}
                this.body.unshift(toucha); //头插
                break;
            case "L":
                var toucha = {"row" : this.body[0].row, "col":this.body[0].col - 1}
                this.body.unshift(toucha); //头插
                break;
            case "U":
                var toucha = {"row" : this.body[0].row - 1, "col":this.body[0].col}
                this.body.unshift(toucha); //头插
                break;
        }
        // 食物判断
        if(toucha.row == game.food.row && toucha.col == game.food.col){
            //当你吃到食物的时候，不用删尾巴，而且需要重新new一个食物
            game.food = new Food(game); //传上下文，要中介者（game）
            game.f = 0;
        }else{
            //当没有吃到食物时候，删除尾巴一项
            this.body.pop(); //尾删
        }

        //撞墙判断
        if(toucha.row<0 ||toucha.col<0 || toucha.col > game.colAmount-1 || toucha.row > game.rowAmount-1){
            alert("你撞墙了，长度是：" + (this.body.length - 1));
            this.body.shift(); //撞墙继续头插不合法
            clearInterval(game.timer);
        }

        // 撞自己判断
        for(var i = 1;i < this.body.length;i++){
            if(toucha.row == this.body[i].row && toucha.col == this.body[i].col){
                alert("撞自己啦！傻缺，长度是：" + (this.body.length - 1));
                this.body.shift(); //继续头插不合法
                clearInterval(game.timer);
            }
        }
    }
    // 改变方向的方法
    Snake.prototype.changeDireciton = function(str){
        //更改未来的方向
        this.willDirection = str;
    }
})();