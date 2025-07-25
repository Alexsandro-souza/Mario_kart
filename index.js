const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const players = [
  {
    name: 'MARIO',
    speed: 4,
    skill: 3,
    power: 3,
    score: 0,
  },
  {
    name: 'BOWSER',
    speed: 5,
    skill: 2,
    power: 5,
    score: 0,
  },
  {
    name: 'PEACH',
    speed: 3,
    skill: 4,
    power: 2,
    score: 0,
  },
  {
    name: 'LUIGI',
    speed: 3,
    skill: 4,
    power: 4,
    score: 0,
  },
  {
    name: 'YOSHI',
    speed: 2,
    skill: 4,
    power: 3,
    score: 0,
  },
  {
    name: 'DONKEY KONG',
    speed: 2,
    skill: 2,
    power: 5,
    score: 0,
  }
];

const quality = [
  { quality: 'excelente', tag: '😎' },
  { quality: 'poderoso', tag: '🦾' },
  { quality: 'habilidoso', tag: '🤖' },
  { quality: 'veloz', tag: '🚀' },
  { quality: 'talentoso', tag: '😊' },
  { quality: 'incrível', tag: '😍' },
  { quality: 'dominante', tag: '🦁' },
  { quality: 'fenomenal', tag: '🐅' },
  { quality: 'brilhante', tag: '🧠' },
];

let player1 = '';
let player2 = 'MARIO';

const question = () => {
  const text = `===== JOGADADORES =====\n\nMARIO     BOWSER\nPEACH     LUIGI\nYOSHI     DONKEY KONG \n_______________________\n\n\nEscolha seu jogador: `;
  return new Promise((resolve) => {
    readline.question(text, (player) => {
      const playerUpperCase = player.toLocaleUpperCase();
      resolve(playerUpperCase);
    });
  });
};

const randomNumber = (number) => {
  return Math.floor(Math.random() * number);
};

const callPlayer2 = () => {
  while (player2 === player1.toUpperCase()) {
    player2 = players[randomNumber(2)].name.toLocaleUpperCase();
  }
};

const showAtributesPlayer = (name) => {
  const indexplayer = players.findIndex((player) => player.name === name);
  console.log(
    `\n\nParabêns você escolheu o ${name}. Esse é um ${
      quality[randomNumber(8)].quality
    } jogador! ${quality[randomNumber(8)].tag}`
  );
  console.log(`Veja os atributos desse jogador 👁️`);
  console.log(
    `Velocidade ${players[indexplayer].speed} || Poder ${players[indexplayer].power} || Habilidade ${players[indexplayer].skill}`
  );
  console.log(`_____________________________________________________`);
};

const callPlayer1 = async () => {
  player1 = await question();
  let isExists = players.findIndex((player) => player.name === player1);

  while (isExists < 0) {
    console.log(
      `O jogador ${player1} não está cadastrado 😒, por favor escolha outro!\n`
    );
    player1 = await question();
    isExists = players.findIndex((player) => player.name === player1);
  }
  readline.close();
  showAtributesPlayer(player1);
  callPlayer2();
  showAtributesPlayer(player2);
};

const tracks = () => {
  const numberTrack = randomNumber(3);
  switch (numberTrack) {
    case 0:
      return 'RETA';
    case 1:
      return 'CURVA';
    case 2:
      return 'CONFRONTO';
  }
};

const bar = async () => {
  const total = 3;
  const larguraBarra = 15;

  for (let i = 1; i <= total; i++) {
    const progresso = Math.floor((i / total) * larguraBarra);
    const barra = '='.repeat(progresso) + ' '.repeat(larguraBarra - progresso);
    console.log(`${barra} ${Math.floor((i / total) * 100)}%\n\n`);
    // Simula um delay para ver o progresso
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};

const fighting = async (objPlayer1, objPlayer2, track) => {
  console.log(
    `\n\nO ${player1} e o ${player2} vão se enfrentar numa pista de ${track}.\n===== Quem será que vence =====\n\nVamos ver!!! Que se inicie o confronto 🏁 🏁 🏁\n\n`
  );

  await bar();

  if (objPlayer1.point > objPlayer2.point) {
    console.log(`Essa quem ganhou foi o ${player1}parabéns.`);
    return (players[objPlayer1.index].score += 1);
  }
  if (objPlayer1.point === objPlayer2.point) {
    console.log(`Essa disputa foi empate, ninguém acumulou ponto.`);
  }
  console.log(`Essa quem ganhou foi o ${player2} parabéns.`);
  players[objPlayer2.index].score += 1;
};

const rounds = async () => {
  await callPlayer1();

  const indexplayer1 = players.findIndex((player) => player.name === player1);
  const indexplayer2 = players.findIndex((player) => player.name === player2);

  for (let i = 0; i < 5; i++) {
    const track = tracks();
    const die = randomNumber(6);
    await new Promise((resove) => setTimeout(resove, 4000));
    switch (track) {
      case 'RETA':
        await fighting(
          { point: (players[indexplayer1].speed += die), index: indexplayer1 },
          { point: (players[indexplayer2].speed += die), index: indexplayer2 },
          track
        );
        break;
      case 'CURVA':
        await fighting(
          { point: (players[indexplayer1].speed += die), index: indexplayer1 },
          { point: (players[indexplayer2].speed += die), index: indexplayer2 },
          track
        );
        break;
      case 'CONFRONTO':
        await fighting(
          { point: (players[indexplayer1].speed += die), index: indexplayer1 },
          { point: (players[indexplayer2].speed += die), index: indexplayer2 },
          track
        );
        break;
    }
  }

  if (players[indexplayer1].score > players[indexplayer2].score) {
    return console.log(
      `Quem ganhou o combate final foi o ${player1}. \n\n Ele aumentou os seguintes atributos: Velocidade ${
        players[indexplayer1].speed
      } || Poder ${players[indexplayer1].power} || Habilidade ${
        players[indexplayer1].skill
      }\n\n\nE ainda acumulou no combate final ${
        players[indexplayer1].score
      } pontos que é ${
        players[indexplayer1].score - players[indexplayer2].score
      } a mais que seu adversário`
    );
  }
  if (players[indexplayer1].score === players[indexplayer2].score) {
    return console.log(
      `O combate final deu empate!!! Os doi jogadores são muito fortes. Ambos os estão com ${players[indexplayer1].score} pontos`
    );
  }

  console.log(
    `Quem ganhou o combate final foi o ${player2}. \n\n Ele aumentou os seguintes atributos: Velocidade ${
      players[indexplayer2].speed
    } || Poder ${players[indexplayer2].power} || Habilidade ${
      players[indexplayer2].skill
    }\n\n\nE ainda acumulou no combate final ${
      players[indexplayer2].score
    } pontos que é ${
      players[indexplayer2].score - players[indexplayer1].score
    } a mais que seu adversário`
  );
};

rounds();
