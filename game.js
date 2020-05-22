console.log('flappy Bird')

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


// Floor
const Floor = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
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

//The bird
const Bird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravity: 0.25,
    velocity: 0,

    update() {
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
 function loop(){
    Bird.update();
    Background.draw();
    Floor.draw();
    Bird.draw();
    
    
    
    requestAnimationFrame(loop)
 }

 loop();