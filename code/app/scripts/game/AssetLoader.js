define([], function() {

    var AssetLoader,
        instance;

    var AssetLoader = function () {
        instance = this;

        function handle_assetloader_COMPLETE() {
            
        }

        instance.assetloader = new PreloadJS();
        instance.manifest = [
            {id: "Enemy", src: "images/enemy.png"},
            //{id: "Hero", src: "images/hero.png"},
            {id: "GroundTile", src: "images/groundTile.png"}
        ];
        
        instance.load = function (callback) {
            instance.assetloader.onComplete = callback;
            instance.assetloader.installPlugin(SoundJS);
            instance.assetloader.loadManifest(instance.manifest);
        };
        
    }
        
    return new AssetLoader();
});
