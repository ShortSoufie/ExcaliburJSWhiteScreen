import { Actor, SpriteSheet, Vector, Random, Input, Animation, range, Keys, CollisionType, Shape } from 'excalibur';
import { Resources } from './resources.js';

export class Player extends Actor {
  constructor(){
    super({
      collider: Shape.Box(16, 16), // Assuming player sprite is 16x16
      collisionType: CollisionType.Active
    });

    // Ensure that the image is loaded before creating the sprite sheet
    Resources.Player.load().then(() => {
      const spritesheet = SpriteSheet.fromImageSource({
          image: Resources.Player,
          grid: { rows: 1, columns: 3, spriteWidth: 16, spriteHeight: 16 },
      });

      const down = spritesheet.getSprite(0, 0);
      const up = spritesheet.getSprite(1, 0);
      const side = spritesheet.getSprite(2, 0);

      this.graphics.add("down", down);
      this.graphics.add("up", up);
      this.graphics.add("side", side);

      this.graphics.use(down);
    });
  }

  onInitialize(engine) {
    this.pos = new Vector(121, 917);
    this.vel = new Vector(0, 0);
  }

  onPreUpdate(engine) {
    let xspeed = 0;
    let yspeed = 0;

    if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
      xspeed = 80;
      this.graphics.use('side');
      this.graphics.flipHorizontal = true; // Reset flip in case it was flipped previously
    }

    if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
      xspeed = -80;
      this.graphics.use('side');
      this.graphics.flipHorizontal = false; // Flip horizontally
    }

    if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
      yspeed = -80;
      this.graphics.use('up');
    }

    if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
      yspeed = 80;
      this.graphics.use('down');
    }

    this.vel = new Vector(xspeed, yspeed);
  }
}
