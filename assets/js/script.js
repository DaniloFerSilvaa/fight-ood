let log = new Log(document.querySelector('.log'));

let char = new Knight('João');
let monster = new BigMonster();

const stage = new Stage (
     char,
     monster,
     document.getElementById('char'),
     document.getElementById('monster'),
     log
);

stage.start();