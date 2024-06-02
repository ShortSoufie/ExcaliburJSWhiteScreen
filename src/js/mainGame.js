import { Actor, Engine, Vector, DisplayMode, Loader, TileMap, ImageSource, Scene } from 'excalibur'
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { NPC } from './npc.js'
import { IntroScene } from './introGame.js';
import { EndScene } from './endGame.js';

export class MainScene extends Scene {
    constructor(engine) {
        super(engine);
    }

    onInitialize() {
        this.startGame();
    }

    startGame() {
        const player = new Player();
        Resources.World1Forest.addToScene(this);
      
        const npc = new NPC();
      
        this.add(player);
        this.add(npc);
      
        // Set up the camera
        const camera = this.camera;
        camera.strategy.lockToActor(player);
      
        // Adjust the camera's zoom to achieve a viewport size of 256x256
        const targetViewportWidth = 256;
        const zoomLevel = this.drawWidth / targetViewportWidth; // Since the game size is 1024x1024
        camera.zoom = zoomLevel;
      
        // Disable image smoothing on the canvas
        const ctx = this.canvas.getContext('2d');
    }

    onActivate() {
        // Add logic to run when main scene becomes active
    }

    onDeactivate() {
        // Add logic to run when main scene becomes inactive
    }
}