
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONSTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONSTOS: 0,
};

const player3 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONSTOS: 0,
};

const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONSTOS: 0,
};

const player5 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONSTOS: 0,
};

const player6 = {
    NOME: "Donkey kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONSTOS: 0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock(){
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
    }

    return result
};

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`);
        
        // Sortear um tipo de pista
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);
    
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let testSkill1 = 0;
        let testSkill2 = 0;

        switch (block) {
            case "RETA":
                testSkill1 = diceResult1 + character1.VELOCIDADE;
                testSkill2 = diceResult2 + character2.VELOCIDADE;
                console.log(`teste de Skill \n ${character1.NOME}= ${testSkill1} \n ${character2.NOME} = ${testSkill2}`);
                break;
            case "CURVA":
                testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
                testSkill2 = diceResult2 + character2.MANOBRABILIDADE;
                console.log(`teste de Skill \n ${character1.NOME} = ${testSkill1} \n ${character2.NOME} = ${testSkill2}`);
                break;
            default:
                testSkill1 = diceResult1 + character1.PODER;
                testSkill2 = diceResult2 + character2.PODER;
                console.log(`teste de Skill \n ${character1.NOME} = ${testSkill1} \n ${character2.NOME} = ${testSkill2}`);
                break;
        }
        
        if (testSkill1 > testSkill2) {
            character1.PONSTOS++;
            console.log(`Rodada ${round} Vencedor: ${character1.NOME}`);
            
        }
        else if (testSkill1 < testSkill2) {
            character2.PONSTOS++;
            console.log(`Rodada ${round} Vencedor: ${character2.NOME}`);
        } else {
            console.log(`Rodada ${round} Empate`);
        }
    }

    console.log("Resultado Final");
    console.log(`${character1.NOME} Pontos: ${character1.PONSTOS}`);
    console.log(`${character2.NOME} Pontos: ${character2.PONSTOS}`);
    if (character1.PONSTOS > character2.PONSTOS) {
        console.log(`Vencedor da Partida: ${character1.NOME}`);
    } else if (character2.PONSTOS > character1.PONSTOS) {
        console.log(`Vencedor da Partida: ${character2.NOME}`);
    } else {
        console.log("A partida terminou empatada!");
    }
}

const readline = require('readline');

function questionAsync(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function choicePlayer() {
    let choice = await questionAsync("Digite o número do personagem: ");
    switch (choice) {
        case "1":
            return player1;
        case "2":
            return player2;
        case "3":
            return player3;
        case "4":
            return player4;
        case "5":
            return player5;
        case "6":
            return player6;
        default:
            return null;
    }
}


(async function main(){
    console.log("Bem vindo ao jogo da corrida!");
    console.log("Carregando jogadores...");
    console.log("Escolha seu personagem")
    console.log("1 - Mario");
    console.log("2 - Luigi");
    console.log("3 - Yoshi");
    console.log("4 - Bowser");
    console.log("5 - Peach");
    console.log("6 - Donkey Kong");
    console.log("7 - Sair");
    console.log("Primeiro personagem")
    const choice1 = await choicePlayer()
    console.log("Segundo personagem")
    const choice2 = await choicePlayer()

    console.log(`Iniciando corrida entre ${choice1.NOME} e ${choice2.NOME} começando...`);
    await playRaceEngine(choice1, choice2);
})();

