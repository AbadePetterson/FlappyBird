console.log('flappy Bird')

const HIT = new Audio();
HIT.src = './songs/hit.wav'; 

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')


// Backgroud
const Background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    draw() {
        context.fillStyle = '#70c5ce';
        context.fillRect(0,0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            Background.spriteX, Background.spriteY,
            Background.largura, Background.altura,
            Background.x, Background.y,
            Background.largura, Background.altura,
        );

        context.drawImage(
            sprites,
            Background.spriteX, Background.spriteY,
            Background.largura, Background.altura,
            (Background.x + Background.largura), Background.y,
            Background.largura, Background.altura,
        );
    },
};

function createFloor(){
    // Floor
    const Floor = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        update() {
            const floorMoviment = 1;
            const repeat = Floor.largura / 2;
            const moviment = Floor.x - floorMoviment;

            //console.log("[Floor.x]", Floor.x);
            //console.log("[repeteEm]", repeat);
            //console.log("[Movimento]", moviment % repeat);

            Floor.x = moviment % repeat;
        },
        draw() {
            context.drawImage(
                sprites,
                Floor.spriteX, Floor.spriteY,
                Floor.largura, Floor.altura,
                Floor.x, Floor.y,
                Floor.largura, Floor.altura,
            );

            context.drawImage(
                sprites,
                Floor.spriteX, Floor.spriteY,
                Floor.largura, Floor.altura,
                (Floor.x) + Floor.largura, Floor.y,
                Floor.largura, Floor.altura,
            );
        },
    };
    return Floor;
}


function colision(Bird, Floor) {
    const birdY = Bird.y + Bird.altura;
    const floorY = Floor.y;

    if(birdY >= floorY){
        return true;
    }

    return false;
}

function createBird() {
    const Bird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        jumper: 4.6,
        jump() {
            console.log('devo pular');
            console.log('[before]', Bird.velocity);
            Bird.velocity = - Bird.jumper;
            console.log('[after]', Bird.velocity);
        },
        gravity: 0.25,
        velocity: 0,
        update() {
            if(colision(Bird, globais.Floor)){
                console.log('Fez colisão');
                HIT.play();

                setTimeout(() => {
                    changeScreen(Screens.START);
                }, 500);
                
                return; 
            }
    
            Bird.velocity = Bird.velocity + Bird.gravity;
            Bird.y = Bird.y + Bird.velocity;
        },
        draw() {
            context.drawImage(
                sprites,
                Bird.spriteX, Bird.spriteY, // Sprite x,y
                Bird.largura, Bird.altura, // Tamanho do recorte na sprite
                Bird.x, Bird.y,
                Bird.largura, Bird.altura,
            );     
        }
    }
    return Bird;
}

//The bird

// [GetReady]
const GetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            GetReady.sX, GetReady.sY,
            GetReady.w, GetReady.h,
            GetReady.x, GetReady.y,
            GetReady.w, GetReady.h
        );
    }
}

//
// [screens]
//
const globais = {};
let screenOn = {};
function changeScreen(newScreen) {
    screenOn = newScreen;

    if(screenOn.inicializa){
        console.log("inicializou")
        screenOn.inicializa();
    }   
}

const Screens = {
    START: {
        inicializa() {
            globais.Bird = createBird();
            globais.Floor = createFloor();
        },
        draw(){
            Background.draw();
            globais.Floor.draw();
            globais.Bird.draw();
            GetReady.draw();
        },
        click() {
            changeScreen(Screens.GAME);
        },
        update() {
            globais.Floor.update();
        }
    }
};

Screens.GAME = {
    draw() {
        Background.draw();
        globais.Floor.draw();
        globais.Bird.draw();
    },
    click() {
        globais.Bird.jump();
    },
    update() {
        globais.Bird.update();
    }
};

 function loop() {
    
    screenOn.draw();
    screenOn.update();
    
    requestAnimationFrame(loop);
 }

window.addEventListener('click', function() {
    if(screenOn.click) {
        screenOn.click();
    }
});

 changeScreen(Screens.START);
 loop();