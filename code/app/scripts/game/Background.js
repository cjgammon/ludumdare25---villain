define(['game/AssetLoader'], 
        function(AssetLoader) {

    var Background,
        instance,
        canvas,
        stage;

    var Background = function () {
        instance = this;

        back = new Container();
        ground = new Container();

        instance.init = function () {
            var i,
                GroundTileBMD = AssetLoader.assetloader.getResult("GroundTile").src;
                WindowBMD = AssetLoader.assetloader.getResult("Window").src;

            for (i = 0; i < 25; i += 1) {
                groundTile = new Bitmap(GroundTileBMD);
                groundTile.x = i * 30;
                ground.addChild(groundTile);
            }

            for (i = 0; i < 4; i += 1) {
                win = new Bitmap(WindowBMD);
                win.x = 100 + i * 150;
                win.y = 250;
                back.addChild(win);
            }

            var g = new Graphics();
            g.beginFill(Graphics.getRGB(0, 0, 0));
            g.drawRect(0, 0, 1000, 500);
            var s = new Shape(g);
            instance.addChild(s);

            instance.addChild(back);
            
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
