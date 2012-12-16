define(['game/AssetLoader',
        'game/events/UserEvent'], 
        function(AssetLoader, UserEvent) {

    var Hero,
        instance,
        animation,
        ducking,
        shooting = false,
        jumping = false,
        _FRICTION = 0.96,
        _WALK_SPEED = 4,
        _SHELL_SPEED = 8,
        _WIDTH = 36,
        _HEIGHT = 42,
        _FLOOR_Y = 367,
        _GRAVITY = -10,
        vx = 0,
        vy = 0;

    var Hero = function () {
        instance = this;
      
        function duck() {
            ducking = true;
            animation.gotoAndPlay('duck');
        }

        function unduck() {
            ducking = false;
            animation.gotoAndStop('stop');

            if (onFloor()) {
                jumping = true;
                animation.gotoAndPlay('jump');
                vx = vx > 0 ? -2 : 2;
            }
        }

        function onFloor() {
            return instance.y == _FLOOR_Y;
        }

        /**
         * initialize
         */
        instance.init = function () {

            var spriteSheet,
                image,
                data;
            
            image = AssetLoader.assetloader.getResult("Hero").result;
            data = {
                images: [image], 
                frames: {width: _WIDTH, height: _HEIGHT, regX: 0, regY: 0}, 
                animations: {    
                    stop: [0],
                    walk: {
                        frames: [0, 3, 4],
                        next: "walk", 
                        frequency: 10
                    },
                    fire: [0, 1, "stop", 10],
                    duck: [3, 5, "duck", 10],
                    jump: {
                        frames: [2, 10, 10, 10, 10, 2], 
                        next: "stop", 
                        frequency: 10
                    },
                    die: [6, 10, 'stop', 10]
                }
            };

            instance.y = _FLOOR_Y;
            instance.x = 500;
            instance.scaleX = 1;

            spriteSheet = new SpriteSheet(data);
            animation = new BitmapAnimation(spriteSheet);
            animation.gotoAndPlay('walk');
            instance.addChild(animation);

            //UserEvent.KEY_DOWN.add(instance.handle_KEY_DOWN);
            //UserEvent.KEY_UP.add(instance.handle_KEY_UP);
		    Ticker.addListener(instance.update);
        }

        instance.update = function () {
            vx *= _FRICTION;
            vy += _GRAVITY;
            instance.x += vx;

            if (jumping) {
                if (instance.y < _FLOOR_Y - 50) {
                    jumping = false;
                } else {
                    instance.y -= 5;
                }
            } else {
                instance.y = instance.y < _FLOOR_Y ? instance.y -= _GRAVITY * .2 : _FLOOR_Y;
            }
        }

        /**
         * handle keydown input
         */
        instance.handle_KEY_DOWN = function (e) {
            switch(e.keyCode) {
            case 37: //left
                vx = ducking ? -_SHELL_SPEED : -_WALK_SPEED;
                animation.scaleX = -1;
                animation.x = _WIDTH;
                break;
            case 39: //right
                vx = ducking ? _SHELL_SPEED : _WALK_SPEED;
                animation.scaleX = 1;
                animation.x = 0;
                break;
            case 38: //jump
                if (onFloor()) {
                    animation.gotoAndPlay('jump');
                    jumping = true;
                }
                break;
            case 40: //duck
                if (!ducking && onFloor()) {
                    duck();
                }
                break;
            case 32: //fire
                if (!ducking && onFloor() && !shooting) {
                    fireball();
                }
                break;
            }
        }

        /**
         * key up event
         */
        instance.handle_KEY_UP = function (e) {
            switch(e.keyCode) {
            case 40:
                unduck();
                break;
            }
        }

        instance.getDirection = function () {
            return animation.scaleX;
        }

        instance.init();
    }

    Hero.prototype = new Container();

    return Hero;
});
