class Character {

     _life = 1
     maxLife = 1;
     attack = 0;
     defense = 0;
     constructor(name) {
          this.name = name;
     }

     get life() {
          return this._life
     }

     set life(newLife) {
          this._life = newLife < 0 ? 0 : newLife;
     }
}

class Knight extends Character {
     constructor(name) {
          super(name);
          this.attack = 9;
          this.defense = 8; 
          this.maxLife = 100;
          this.life = this.maxLife;
     }
}

class Mage extends Character {
     constructor(name) {
          super(name);
          this.maxLife = 80;
          this.life = this.maxLife;
          this.attack = 17;
          this.defense = 6; 
     }

}

class LittleMonster extends Character {
     constructor() {
          super('Little Monster')
          this.attack = 7;
          this.defense = 2; 
          this.maxLife = 40;
          this.life = this.maxLife;
     }
}

class BigMonster extends Character {
     constructor() {
          super('Big Monster')
          this.attack = 12;
          this.defense = 5; 
          this.maxLife = 90;
          this.life = this.maxLife;
     }
}

class Stage {
     constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
          this.fighter1 = fighter1;
          this.fighter2 = fighter2;
          this.fighter1El = fighter1El;
          this.fighter2El = fighter2El;
          this.log = logObject;

     }

     start() {
          this.update();

               this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
               this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));          


          //heal
          this.fighter1El.querySelector('.healButton').addEventListener('click', () => this.heal(this.fighter1, this.fighter2))
          this.fighter2El.querySelector('.healButton').addEventListener('click', () => this.heal(this.fighter2, this.fighter1))
     }

     update() {
          //fighter1
          this.fighter1El.querySelector('.name').innerHTML =  `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
          let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
          this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`

          //fighter2
          this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
          let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
          this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;


     }

     doAttack(attacking, attacked) {
          if (attacking.life <= 0 || attacked.life <=0) {
               this.log.addMessage('Alguem morreu');

               return;
          }

          let attackFactor = (Math.random() * 1).toFixed(1);
          let actualAttack = attacking.attack * attackFactor;

          let defenseFactor = (Math.random() * 1).toFixed(1);
          let actualDefense = attacked.defense * defenseFactor;

          if (actualAttack > actualDefense) {
               if (actualAttack == attacking.attack) {
                    attacked.life -= (actualAttack * 1.5);
                    this.log.addMessage(`${attacking.name} Deu critico e causou ${(actualAttack * 1.5).toFixed(0)} de dano em ${attacked.name}`)
                    this.update();
                    return;
               }
               attacked.life -= actualAttack;
               this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(0)} de dano em ${attacked.name}`)
          } else {
               this.log.addMessage(`${attacked.name} defendeu...`);
          }

          this.update();
     }

     heal(attacking, attacked) {     
          if (attacking.life <= 0 || attacked.life <=0) {
               this.log.addMessage('A luta acabou!');
               return;
          }
          

          let heal = attacking.defense * (Math.random() * 1).toFixed(1);
          
          if ((attacking.life + heal) > attacking.maxLife || attacking.life === attacking.maxLife) {
               let healNecess = attacking.maxLife - attacking.life;
               attacking.life += healNecess;
               this.log.addMessage(`${attacking.name} curou a vida maxima`);
               this.update()
               return;
          }

          attacking.life +=  heal

          this.log.addMessage(`${attacking.name} se curou ${heal} de vida`)

          this.update();
     }
}

class Log {
     list = [];

     constructor(listEl) {
          this.listEl = listEl
     }

     addMessage(msg) {
          this.list.push(msg);
          this.render();
     }

     render() {
          this.listEl.innerHTML = '';

          for(let i in this.list) {
               this.listEl.innerHTML += `<li>${this.list[i]}</li>`
          }
          document.querySelector('.log').scrollTop = document.querySelector('.log').scrollHeight;
     }
}