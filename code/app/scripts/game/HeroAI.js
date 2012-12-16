define([], 
        function() {

    var AI = function (hero, enemy) {
        var instance = this,
            goalX;
 

        function safeDistance() {
            return 200 + Math.random() * 100;
        }

        //function getPadding() {
        //    return 200 + Math.random() * 100;
        //}

        instance.init = function () {
		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            var maxpadding = 200,
                minpadding = 100,
                heroX = hero.x
                goalX = hero.x < enemy.x ? enemy.x - maxpadding : enemy.x + maxpadding;

            //run from enemy
            if (heroX > goalX - maxpadding && heroX < goalX + maxpadding) {
                if (heroX > goalX + minpadding) {
                    hero.moveLeft();
                } else if (heroX < goalX - minpadding){
                    hero.moveRight();
                }
            } else if (heroX < goalX) {
                hero.moveRight();
            } else if (heroX > goalX) {
                hero.moveLeft();
            }
        }

        instance.start = function () {
            goalX = enemy.x - 200;
        }

        instance.init();
    }

    return AI;
});
