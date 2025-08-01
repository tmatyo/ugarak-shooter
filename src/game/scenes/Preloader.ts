import { Scene } from 'phaser';
import superPeanutFont from '../../assets/fonts/SuperPeanut.ttf';
import superBrigadeFont from '../../assets/fonts/SuperBrigadeCondensed.otf';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        this.load.font('super-peanut', superPeanutFont);
        this.load.font('super-brigade', superBrigadeFont);
        
        this.load.image('demon1', 'src/assets/images/amo1.png');
        this.load.image('demon2', 'src/assets/images/dagi1.png');
        this.load.image('demon3', 'src/assets/images/dani1.png');
        this.load.image('bullet', 'src/assets/images/bullet1.png');

        this.load.image('cursor', 'src/assets/images/cursor2v2.png');
        
        this.load.image('menuBackground', 'src/assets/images/menu_remaster_v3.jpg');
        this.load.image('gameBackground', 'src/assets/images/hatter_remaster.jpg');
        this.load.image('hudBackground', 'src/assets/images/panel_jo.jpg');

        this.load.audio('bumm', 'src/assets/sound/bumm1.wav');
        this.load.audio('emptygun', 'src/assets/sound/emptygun1.wav');
        this.load.audio('shot', 'src/assets/sound/gun_shot.wav');
        this.load.audio('headshot1', 'src/assets/sound/headshot1.wav');
        this.load.audio('headshot2', 'src/assets/sound/headshot2.wav');
        this.load.audio('headshot3', 'src/assets/sound/headshot3.wav');
        this.load.audio('headshot4', 'src/assets/sound/headshot4.wav');
        this.load.audio('headshot5', 'src/assets/sound/headshot5.wav');
        this.load.audio('hover', 'src/assets/sound/klop1.wav');
        this.load.audio('reload', 'src/assets/sound/reload.wav');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
