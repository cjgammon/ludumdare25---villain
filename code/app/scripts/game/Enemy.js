define(['game/AssetLoader'], 
        function(AssetLoader) {

    var Enemy,
        instance,
        canvas,
        stage;

    var Enemy = function () {
        instance = this;

        instance.init = function () {

            var spriteSheet,
                image = AssetLoader.assetloader.getResult("Enemy").result,
                data = {
                    images: [image], 
                    frames: {width: 54, height: 54, regX: 0, regY: 0}, 
                    animations: {    
                        stop: [0],
                        fire: [0, 2, "stop"]
                    }
                };

            instance.y = 360;
            instance.x = 500;

            spriteSheet = new SpriteSheet(data);
            animation = new BitmapAnimation(spriteSheet);
            animation.gotoAndPlay('fire');
            instance.addChild(animation);
        }

        instance.update = function () {
            
        }

        instance.init();
    }

    Enemy.prototype = new Container();

    return Enemy;
});
