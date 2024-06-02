import { Engine, DisplayMode } from 'excalibur';
import { IntroScene } from './introGame.js';
import { MainScene } from './mainGame.js';
import { EndScene } from './endGame.js';
import { ResourceLoader } from './resources.js';
import { Player } from './player.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1024,
            height: 1024,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            antialiasing: false
        });

        // Load resources
        this.start(ResourceLoader).then(() => {
            // Set initial scene to IntroScene
            this.goToScene('intro');
        });
1```
        this.add(Player)`
    } 

    gotoMyScene(sceneName) {
        switch (sceneName) {
            case 'intro':
                // Create and set IntroScene as the initial scene
                const introScene = new IntroScene(this);
                this.add('introScene', sceneObject);
                break;
            case 'main':
                // Create and set MainScene
                const mainScene = new MainScene(this); // Instantiate MainScene
                this.add('mainScene', sceneObject);
                break;
            case 'end':
                // Create and set EndScene
                const endScene = new EndScene(this); // Instantiate EndScene
                this.add('endScene', sceneObject);
                break;
            // Add cases for other scenes as needed
            default:
                console.error('Invalid scene name');
        }

        this.goToScene(sceneName);
    }
}    
