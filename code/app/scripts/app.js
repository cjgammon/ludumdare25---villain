define(['game/Background', 
        'game/Enemy',
        'game/Hero',
        'game/HeroAI',
        'game/Fireball',
        'game/events/UserEvent',
        'game/AssetLoader'], 
        function(
            Background, 
            Enemy,
            Hero,
            AI,
            Fireball,
            UserEvent,
            AssetLoader) {

    var App,
        instance,
        canvas,
        stage,
        bg,
        ai,
        hero,
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
            
            hero = new Hero();
            stage.addChild(hero);

            ai = new AI(hero, enemy);
            setTimeout(function () {
                ai.start();
            }, 1000);

            Ticker.setFPS(60);
		    Ticker.addListener(instance.tick);
        },

        tick: function () {
            var i = 0;

            stage.update();

            for (i; i < fireballs.length; i += 1) {
                if (fireballs[i].x + 100 < 0 || fireballs[i].x - 100 > stage.canvas.width) {
                    stage.removeChild(fireballs[i]);
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
