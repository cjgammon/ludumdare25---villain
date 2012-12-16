define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Fireball = function (direction) {
        var instance = this,
            dir = direction;
 
        instance.init = function () {
            var BMD,
                ball;

            BMD = AssetLoader.assetloader.getResult("Fireball").src;
            ball = new Bitmap(BMD);
            instance.scaleX = -dir;
            instance.addChild(ball);

		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            instance.x += dir * 2;
        }
    }

    Fireball.prototype = new Container();

    return Fireball;
});
