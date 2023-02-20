const char = createKnight('Herói');
const monster = createLittleMonster();
const bigMonster = createLittleMonster();

stage.start(
     char, 
     monster, 
     document.querySelector('#char'), 
     document.querySelector('#monster')
)