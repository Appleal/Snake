(function(){
    // 注意：所有的代码都写在闭包中，利用window对象暴露唯一的Game游戏类即可。
    window.Game = function(){
        this.rowAmount = 16; //行数
        this.colAmount = 20; //列数
        this.init(); //初始化UI界面，创建DOM表格
        //实例化蛇类
        this.snake = new Snake();
        //实例化食物类
        this.food = new Food(this);
        //开启游戏定时器
        this.start();
        this.BindEvnet();
    }

    //初始化UI界面，创建DOM表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);
        var tr,td;
        for(var i = 0; i < this.rowAmount;i++){
            tr = document.createElement('tr'); //遍历插入行
            this.dom.appendChild(tr); //tr上树
            for(var j = 0; j < this.colAmount;j++){
                td = document.createElement('td');//遍历插入列
                tr.appendChild(td); //td上树
            }
        }
    }

    //设置蛇身的颜色
    Game.prototype.setColor = function(row,col,color){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
    }
    //设置食物的方法
    Game.prototype.setHTML = function(row,col,html){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
    }
    //清屏，遍历行和列，设为白色
    Game.prototype.clear = function(){
        for(var i = 0;i < this.rowAmount; i++){
            for (var j = 0; j < this.colAmount; j++) {
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = "#fff";
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML = "";
            };
        }
    }
    // 绑定键盘监听，调用changeDireciton改变方向方法
    Game.prototype.BindEvnet = function(){
        var self = this;
        document.onkeydown = function(event){
            if(event.keyCode == 37){
                //按左键，如果当前是往右走，不允许掉头
                if(self.snake.direction == "R") return;
                self.snake.changeDireciton("L");
            }else if(event.keyCode == 38){
                if(self.snake.direction == "D") return;
                self.snake.changeDireciton("U");
            }else if(event.keyCode == 39){
                if(self.snake.direction == "L") return;
                self.snake.changeDireciton("R");
            }else if(event.keyCode == 40){
                if(self.snake.direction == "U") return;
                self.snake.changeDireciton("D");
            }
        }
    }

    // 游戏开始方法
    Game.prototype.start = function(){
        var self = this;
        this.f = 0; //帧编号
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById("info").innerHTML = "帧编号：" + self.f;
            //清屏
            self.clear();
            //每隔30帧更新一下
            //更新蛇，蛇越长速度越快
            var s = self.snake.body.length < 10 ? 30 : 5;
            self.f % s == 0 && self.snake.update();
            //渲染蛇方法
            self.snake.render();
            //渲染食物
            self.food.render();
        },10);
    }
})();