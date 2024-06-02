import { Actor, SpriteSheet, Vector, Shape, CollisionType, Timer } from 'excalibur';
import { Resources } from './resources.js';

export class NPC extends Actor {
    constructor(){
      super({
        collider: Shape.Box(16, 16),
        collisionType: CollisionType.Active
      });
  
      this.direction = 1; // 1 for right, -1 for left
      
      Resources.npcBoy.load().then(() => {
        const spritesheet = SpriteSheet.fromImageSource({
            image: Resources.npcBoy,
            grid: { rows: 1, columns: 3, spriteWidth: 16, spriteHeight: 16 },
        });
  
        const down = spritesheet.getSprite(0, 0);
        const up = spritesheet.getSprite(1, 0);
        const side = spritesheet.getSprite(2, 0);
  
        this.graphics.add("down", down);
        this.graphics.add("up", up);
        this.graphics.add("side", side);
  
        this.graphics.use(side);
      });
    }

    onInitialize(engine) {
        this.pos = new Vector(200, 966);
        this.vel = new Vector(80, 0);

        // Set up a timer to change direction every 2 seconds
        const timer = new Timer({
            fcn: () => this.changeDirection(),
            interval: 2000, // 2 seconds
            repeats: true
        });

        engine.currentScene.add(timer);
        timer.start();
    }

    changeDirection() {
        this.direction *= -1; // Change direction
        this.graphics.flipHorizontal = this.direction === 1; // Flip sprite horizontally if moving left
    }

    onPreUpdate(engine) {
        // Update velocity based on the current direction
        this.vel.x = 80 * this.direction;

        // Reset y velocity to 0
        this.vel.y = 0;
    }
}