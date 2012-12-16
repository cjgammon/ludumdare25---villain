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
        
        function runTowards(heroX, goalX) {
            if (heroX < goalX) {
                hero.moveRight();  //run towards
            } else if (heroX > goalX) {
                hero.moveLeft();   //run towards
            }
        }

        instance.init = function () {
		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            var maxpadding = 200,
                minpadding = 100,
                heroX = hero.x,
                goalX = hero.x < enemy.x ? enemy.x - maxpadding : enemy.x + maxpadding;

            if (heroX > goalX - maxpadding && heroX < goalX + maxpadding) {

                if (!enemy.getJumping()) {
                    runAway();
                    overrideX = false;
                } else if (heroX < goalX - minpadding + 10 || heroX > goalX + minpadding - 10){
                    //sprint under jumping
                    overrideX = overrideX ? overrideX : hero.x < enemy.x ? enemy.x + maxpadding : enemy.x - maxpadding;
                    runTowards(heroX, overrideX);
                } else {

                }
            } else {
                runTowards(heroX, goalX);
            }

            function runAway() {
                if (heroX > goalX + minpadding) {
                    hero.moveLeft();
                } else if (heroX < goalX - minpadding){
                    hero.moveRight();
                }
            }

        }

        instance.start = function () {
            goalX = enemy.x - 200;
        }

        instance.init();
    }

    return AI;
});
