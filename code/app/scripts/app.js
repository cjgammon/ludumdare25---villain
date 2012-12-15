define(['game/Background', 
        'game/Enemy',
        'game/AssetLoader'], 
        function(
            Background, 
            Enemy,
            AssetLoader) {

    var App,
        instance,
        canvas,
        stage,
        bg,
        enemy;

    var App = function () {
        instance = this;
    }

    App.prototype = {
        init: function() {
            AssetLoader.load(instance.setup);
                  
		    canvas = document.getElementById("stage");
            stage = new Stage(canvas); 

            $(document).bind('keydown', instance.handle_KEY_DOWN);
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
            stage.update();
            console.log('tick');
        },

        handle_KEY_DOWN: function (e) {
            UserEvent.KEY_DOWN.dispatch(e);
        }
    }

    return new App();
});
