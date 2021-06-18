import Phaser from 'phaser';
import CardPlayer from './files/CardPlayer';
import CardGrid from './files/CardGrid';
import Grid from './files/Grid';
import { AddButtonRestart } from './files/ButtonRestart';

export default class Game extends Phaser.Scene
{
	private player?: Phaser.GameObjects.Container;
    
    constructor()
	{
		super('game')
	}

	preload()
    {
        
    }

    create()
    {
        this.grid = new Grid({ scene: this, columns: 3, rows: 3 });

        this.player = new CardPlayer({
            scene: this,
            name: 'Paladin',
            x: this.game.config.width / 2,
            y: this.game.config.height - 200,
            card: 'playercard',
            image: 'paladin',
            health: 30,
            depth: 1,

            ondragend: (pointer, gameObject) => {
                if (!this.player)
                {
                    return;
                }
                this.player.x = this.player.originalX;
                this.player.y = this.player.originalY;
                if (this.highlighted) 
                {
                    this.player.originalX = this.player.x = this.highlighted.x;
                    this.highlighted.selected = true;
                    switch (this.highlighted.cardtype) {
                        case 'attack':
                            this.player.attack(this.highlighted.value);
                            this.highlighted.dead = true;
                            this.highlighted.deadAnimation();
                            break;
                        case 'heal':
                            this.player.health = Math.min(this.player.health + this.highlighted.value, this.player.maxHealth);
                            this.highlighted.selected = true;
                            break;
                        case 'armor':
                            this.player.armor = Math.min(this.player.armor + this.highlighted.value, this.player.maxArmor);
                            break;
                        case 'boss':
                            this.player.attack(this.highlighted.value);
                            this.highlighted.dead = true;
                            this.highlighted.deadAnimation();

                            break;

                    }
                    if (this.player.dead) {
                        AddButtonRestart(this);
                    } else {
                        this.grid.fadeFrontRow();
                    }
                }
            }
        })
    }

    update(time, delta) 
    {
        this.grid.cards[0].highlighted = false;
        this.grid.cards[1].highlighted = false;
        this.grid.cards[2].highlighted = false;
        this.highlighted = null;
        let columnWidth = this.game.config.width / this.grid.columns;
        let xDiff = Math.abs(this.player.x - this.player.originalX);
        if (this.player.y < 700 && xDiff < columnWidth * 1.4) 
        {
            if (this.player.x < columnWidth) 
            {
                this.grid.cards[0].highlighted = true;
                this.highlighted = this.grid.cards[0];
            } 
            else if (this.player.x > columnWidth * 2) 
            {
                this.grid.cards[2].highlighted = true;
                this.highlighted = this.grid.cards[2];
            } 
            else 
            {
                this.grid.cards[1].highlighted = true;
                this.highlighted = this.grid.cards[1];
            }
        }
    }
}
