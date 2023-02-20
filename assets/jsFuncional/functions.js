const defaultCharacter  = {
     name: '',
     life: 1,
     maxLife: 1,
     attack: 0,
     defense: 0
}

const  createKnight = (name) => {
     return {
          ...defaultCharacter,
          name,
          life: 1000,
          maxLife: 1000,
          attack: 120,
          defense: 120
     }
}

const  createLittleMonster = () => {
     return {
          ...defaultCharacter,
          name: 'Little Monster',
          life: 800,
          maxLife: 800,
          attack: 120,
          defense: 100
     }
}

const  createBigMonster = () => {
     return {
          ...defaultCharacter,
          name: 'Big Monster',
          life: 1000,
          maxLife: 1000,
          attack: 140,
          defense: 60
     }
}

const stage =  {
     fighter1: null,
     fighter2: null,
     fighter1El: null,
     fighter2El: null,

     start(fighter1, fighter2, fighter1El, fighter2El) {
          this.fighter1 = fighter1;
          this.fighter2 = fighter2;
          this.fighter1El = fighter1El;
          this.fighter2El = fighter2El;

          this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
          this.fighter1El.querySelector('.healButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

          this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
          this.fighter2El.querySelector('.healButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
          
          this.update();
     },

     update(){
          //Fighter1
          this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP`
          let f1pct = (this.fighter1.life / this.fighter1.maxLife)*100;
          this.fighter1El.querySelector('.lifebar .bar').style.width = `${f1pct}%`

          //Fighter2
          this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life} HP`
          let f2pct = (this.fighter2.life / this.fighter2.maxLife)*100;
          this.fighter2El.querySelector('.lifebar .bar').style.width = `${f2pct}%`
     },

     doAttack(attacking, attacked){
          if (attacking.life <= 0 || attacked.life <=0) {
               log.addMessage('Alguem morreu');

               return;
          }

          let attackFactor = (Math.random() * 1).toFixed(1);
          let actualAttack = attacking.attack * attackFactor;

          let defenseFactor = (Math.random() * 1).toFixed(1);
          let actualDefense = attacked.defense * defenseFactor;

          if (actualAttack > actualDefense) {
               if (actualAttack == attacking.attack) {
                    attacked.life -= (actualAttack * 1.5);
                    log.addMessage(`${attacking.name} Deu critico e causou ${(actualAttack * 1.5).toFixed(0)} de dano em ${attacked.name}`)
                    this.update();
                    return;
               }
               attacked.life -= actualAttack;
               log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(0)} de dano em ${attacked.name}`)
          } else {
               log.addMessage(`${attacked.name} defendeu...`);
          }

          attacked.life = attacked.life <= 0 ? 0 : attacked.life; 
          this.update();
     },

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



const log = {
     list: [],
     addMessage(msg) {
          this.list.push(msg);
          this.render();
     },

     render() {
          document.querySelector('.log').innerHTML = '';

          for(let i in this.list) {
               document.querySelector('.log').innerHTML += `<li>${this.list[i]}</li>`
          }
          document.querySelector('.log').scrollTop = document.querySelector('.log').scrollHeight;
     }
}