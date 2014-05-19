/**
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Lars "HashDot" Hampe
 *
 *  Permission is hereby granted, free of charge, to any person
 *  obtaining a copy of this software and associated documentation
 *  files (the "Software"), to deal in the Software without restriction,
 *  including without limitation the rights to use, copy, modify, merge,
 *  publish, distribute, sublicense, and/or sell copies of the Software,
 *  and to permit persons to whom the Software is furnished to do so,
 *  subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included
 *  in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 *  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 *  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 */

/**
 *  @fileoverview Simple Game Example
 *  @author hampelars@gmail.com (Lars Hampe)
 */

/**
 *  Game Constructor
 */
function Game(){
  var canvas_background = document.getElementById("background");
  this.ctxBG = canvas_background.getContext('2d');

  var canvas_border = document.getElementById("border");
  this.ctxBorder = canvas_border.getContext('2d');

  this.floorHeight = 25;
  this.floorColor = '#57385C';

  var canvas_ui = document.getElementById("ui");
  this.ctxUI = canvas_ui.getContext('2d');

  this.UIBackgroundColor = '#FFEDBC';

  this.width = 1024;
  this.height = 768;

  this.speed = 0;

  this.special = false;
}

/**
 *  Player Constructor
 */
function Player(){
  var canvas_play = document.getElementById("play");
  this.ctxPlay = canvas_play.getContext('2d');

  this.color = '#A75265';
  this.x = 350;
  this.y = 360;
  this.w = 20;
  this.h = 20;

  this.velY = 0;
  this.velX = 0;
  this.speed = 1;
  this.movement = 2;
  this.friction = 0.95;

  this.collisionTrigger = false;
}

/**
 *  Object Constructor
 */
function Objects(){
  var canvas_objects = document.getElementById("objects");
  this.ctxObj = canvas_objects.getContext('2d');

  /**
   *  Start coordinates
   */
  this.x = 1000;

  /**
   *  Example Map
   */
  this.exampleMap = [
          {'x': 1000, 'y': 0,	'h': 50, 'w': 100},
          {'x': 1100, 'y': 0,	'h': 150, 'w': 100},
          {'x': 1200, 'y': 0,	'h': 100, 'w': 150},
          {'x': 1350, 'y': 0,	'h': 50, 'w': 150},
          {'x': 1500, 'y': 0,	'h': 250, 'w': 50},
          {'x': 1550, 'y': 0,	'h': 350, 'w': 50},
          {'x': 1600, 'y': 0,	'h': 400, 'w': 100},
          {'x': 1700, 'y': 0,	'h': 300, 'w': 100},
          {'x': 1800, 'y': 0,	'h': 150, 'w': 150},
          {'x': 1950, 'y': 0,	'h': 200, 'w': 250},
          {'x': 1000, 'y': 350,	'h': 393, 'w': 100},
          {'x': 1100, 'y': 250,	'h': 493, 'w': 150},
          {'x': 1250, 'y': 200,	'h': 543, 'w': 50},
          {'x': 1300, 'y': 450,	'h': 293, 'w': 150},
          {'x': 1450, 'y': 550,	'h': 193, 'w': 400},
          {'x': 1850, 'y': 450,	'h': 293, 'w': 100},
          {'x': 1950, 'y': 400,	'h': 343, 'w': 250},
          {'x': 2100, 'y': 0,	'h': 150, 'w': 150},
          {'x': 2250, 'y': 0,	'h': 100, 'w': 150},
          {'x': 2400, 'y': 0,	'h': 50, 'w': 200},
          {'x': 2600, 'y': 0,	'h': 450, 'w': 100},
          {'x': 2700, 'y': 0,	'h': 200, 'w': 200},
          {'x': 2900, 'y': 0,	'h': 250, 'w': 100},
          {'x': 3000, 'y': 0,	'h': 100, 'w': 150},
          {'x': 3150, 'y': 0,	'h': 150, 'w': 50},
          {'x': 3200, 'y': 0,	'h': 100, 'w': 100},
          {'x': 2300, 'y': 500,	'h': 100, 'w': 50},
          {'x': 2350, 'y': 450,	'h': 200, 'w': 150},
          {'x': 2500, 'y': 550,	'h': 50, 'w': 100},
          {'x': 2550, 'y': 450,	'h': 100, 'w': 100},
          {'x': 2100, 'y': 350,	'h': 400, 'w': 100},
          {'x': 2150, 'y': 300,	'h': 50, 'w': 100},
          {'x': 2200, 'y': 250,	'h': 50, 'w': 50},
          {'x': 2200, 'y': 700,	'h': 50, 'w': 50},
          {'x': 2250, 'y': 200,	'h': 100, 'w': 250},
          {'x': 2350, 'y': 150,	'h': 50, 'w': 150},
          {'x': 2300, 'y': 300,	'h': 50, 'w': 150},
          {'x': 2350, 'y': 350,	'h': 50, 'w': 50},
          {'x': 2550, 'y': 700,	'h': 50, 'w': 150},
          {'x': 2700, 'y': 500,	'h': 200, 'w': 150},
          {'x': 2850, 'y': 300,	'h': 400, 'w': 250},
          {'x': 3100, 'y': 250,	'h': 450, 'w': 200},
          ];

}

/**
 *  Draw the objects and check for collision
 */
Objects.prototype.draw = function(){
  this.ctxObj.width = window.innerWidth;
  this.ctxObj.height = window.innerHeight;
  this.ctxObj.clearRect(0, 0, game.width, game.height);
  var p = player;
  for(var i = 0; i < this.exampleMap.length; i++){
      var o = this.exampleMap[i];
      o.x -= game.speed;
      this.x = o.x;

      if(game.special === false){
        this.ctxObj.fillStyle = '#EC7263';
      }else{
        game.specialMode();
      }

      this.ctxObj.fillRect(this.x, o.y, o.w, o.h)

      // COLLISION
      if(p.x + p.w >= o.x && p.x <= o.x + o.w && p.y >= o.y - player.w && p.y <= o.y + o.h){
        player.collision();
      }
    }
    this.x += game.speed;
}

/**
 *  Draw the border top/bottom
 */
Objects.prototype.drawBorder = function(){
  game.ctxBorder.clearRect(0, 0, game.width, game.height);
  game.ctxBorder.fillStyle = game.floorColor;
  game.ctxBorder.fillRect(0, game.height - 25, game.width, game.floorHeight);
  game.ctxBorder.fillRect(0, 0, game.width, game.floorHeight);
}

/**
 *  Set our background color
 */
Game.prototype.UIBackground = function() {
  this.ctxBG.fillStyle = this.UIBackgroundColor;
  this.ctxBG.fillRect(0, 0, this.width, this.height);
};

/**
 *  Special mode changes the objects color in a disco style ;)
 */
Game.prototype.specialMode = function(){
  var colors = ['#D5FF0B', '#E8930C', '#FF0000', '#5D0CE8', '#0DCAFF', '#57FF73', '#E53AE8', '#46FFAE'];
  var cInt = Math.round(Math.random()*(colors.length-1));
  objects.ctxObj.fillStyle = colors[cInt];
}

/**
 *  Draw the player cube
 */
Player.prototype.draw = function(){
  this.ctxPlay.clearRect(0, 0, game.width, game.height);
  this.ctxPlay.fillStyle = this.color;
  this.ctxPlay.fillRect(this.x, this.y, this.w, this.h);
}

/**
 *  Method to change players cube color
 */
Player.prototype.changeColor = function(){
  var colors = ['#BF495E', '#41A693', '#68C37C', '#D9583B', '#FF476A'];
  var cInt = Math.round(Math.random()*(colors.length-1));
  player.color = colors[cInt];
}

/**
 *  Set the collision trigger 'true'
 */
Player.prototype.collision = function(){
  this.collisionTrigger = true;
  game.endTime = new Date().getTime() - game.startTime
}

/**
 *  Init our constructors
 */
var game = new Game();
var player = new Player();
var objects = new Objects();

/**
 *  The game loop
 */
function loop(){
  if(player.collisionTrigger === false){
      player.draw();
      objects.draw();
      objects.drawBorder();
      game.UIBackground();
      requestAnimationFrame(loop);

      // FRICTION
      player.velY *= player.friction;
      player.y += player.velY;
      player.velX *= player.friction;
      player.x += player.velX;
  }else{
    console.log('GameOver');
  }
}

window.addEventListener('load', loop(), false);

/**
 *  Controls
 */
document.addEventListener('keydown', function(e){
  switch(e.keyCode){
    case 87: // Key 'W'
    case 38: // Key 'Up'
      if(player.velY > -player.speed){
        player.velY -= player.movement;
      }
      player.changeColor();
      break;
    case 83: // Key 'S'
    case 40: // Key 'Down'
      if(player.velY < player.speed){
        player.velY += player.movement;
      }
      player.changeColor();
      break;
    case 65: // Key 'A'
    case 37: // Key 'Left'
      if(player.velX > -player.speed){
        player.velX -= player.movement;
      }
      game.speed -= 0.75;
      player.changeColor();
      break;
    case 68: // Key 'D'
    case 39: // Key 'Right'
      if(player.velX < player.speed){
        player.velX += player.movement;
      }
      game.speed += 0.75;
      player.changeColor();
      break;
    case 32:
      // Key 'SPACE'
      break;
    case 27:
      // Key 'ESC'
      break;
    case 13:
      // Key 'ENTER'
      break;
    default:
      break;
  }
}, false);
