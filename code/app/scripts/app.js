define(['game/Background', 
        'game/Enemy',
        'game/Fireball',
        'game/events/UserEvent',
        'game/AssetLoader'], 
        function(
            Background, 
            Enemy,
            Fireball,
            UserEvent,
            AssetLoader) {

    var App,
        instance,
        canvas,
        stage,
        bg,
        enemy,
        fireballs = [];

    var App = function () {
        instance = this;
    }

    App.prototype = {
        init: function() {
            console.log(AssetLoader);
            AssetLoader.load(instance.setup);
                  
		    canvas = document.getElementById("stage");
            stage = new Stage(canvas); 

            $(document).bind('keydown', instance.handle_KEY_DOWN);
            $(document).bind('keyup', instance.handle_KEY_UP);

            UserEvent.FIREBALL.add(instance.handle_FIREBALL);
        },

        setup: function () {

            bg = new Background();
            stage.addChild(bg);

            enemy = new Enemy();
            stage.addChild(enemy);
            
            Ticker.setFPS(60);
		    Ticker.addListener(instance.tick);
        },

        tick: function () {
            var i = 0;

            stage.update();

            for (i; i < fireballs.length; i += 1) {
                if (fireballs[i].x + fireballs[i].width < 0) {
                    fireballs[i].remove();
                }
            }
        },

        handle_KEY_DOWN: function (e) {
            //console.log(e.keyCode);
            UserEvent.KEY_DOWN.dispatch(e);
        },

        handle_KEY_UP: function (e) {
            UserEvent.KEY_UP.dispatch(e);
        },

        handle_FIREBALL: function () {
            var fireball,
                direction;
            
            direction = enemy.getDirection();
            fireball = new Fireball(direction);
            fireball.x = direction > 0 ? enemy.x + 80 : enemy.x - 30;
            fireball.y = enemy.y + 20;
            fireball.init();
            stage.addChild(fireball);

            fireballs.push(fireball);
        }
    }

    return new App();
});
