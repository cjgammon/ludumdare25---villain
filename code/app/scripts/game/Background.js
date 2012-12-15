define(['game/AssetLoader'], 
        function(AssetLoader) {

    var Background,
        instance,
        canvas,
        stage;

    var Background = function () {
        instance = this;

        ground = new Container();

        instance.init = function () {
            var i,
                GroundTileBMD = AssetLoader.assetloader.getResult("GroundTile").src;

            for (i = 0; i < 25; i += 1) {
                groundTile = new Bitmap(GroundTileBMD);
                groundTile.x = i * 30;
                ground.addChild(groundTile);
            }

            ground.y = 400;
            instance.addChild(ground);
        }

        instance.update = function () {
            
        }

        instance.init();
    }

    Background.prototype = new Container();

    return Background;
});
