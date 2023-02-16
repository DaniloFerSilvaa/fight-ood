let log = new Log(document.querySelector('.log'));

let char = new Knight('Herói');
let monster = new LittleMonster();
let bigMonster = new BigMonster()


const stage = new Stage (
     char,
     bigMonster,
     document.getElementById('char'),
     document.getElementById('monster'),
     log
);
stage.start();