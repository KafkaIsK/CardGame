import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
    {
        this.load.image('armor', 'assets/armor.png');
        this.load.image('card', 'assets/card.png');
        this.load.image('dead', 'assets/dead.png');
        this.load.image('deathknight', 'assets/deathknight.png');
        this.load.image('firedrake', 'assets/firedrake.png');
        this.load.image('goldendragon', 'assets/goldendragon.png');
        this.load.image('healingpotion', 'assets/healingpotion.png');
        this.load.image('kobold', 'assets/kobold.png');
        this.load.image('ogre', 'assets/ogre.png');
        this.load.image('paladin', 'assets/paladin.png');
        this.load.image('playercard', 'assets/playercard.png');
        this.load.image('restartbutton', 'assets/restartbutton.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('troll', 'assets/troll.png');
        this.load.image('crab', 'assets/apocalypse_crab.png');
        this.load.image('centipede', 'assets/giant_centipede.png');
        this.load.image('pit_fiend', 'assets/pit_fiend.png');
        this.load.image('angel', 'assets/angel.png');
        this.load.bitmapFont('pressstart', 'assets/pressstart.png', 'assets/pressstart.fnt');
    }

    create()
    {
        this.scene.start('game');
    }
}