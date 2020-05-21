console.log('flappy Bird')

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')


const Bird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    draw() {
        context.drawImage(
            sprites,
            Bird.spriteX, Bird.spriteY, // Sprite x,y
            Bird.largura, Bird.altura, // Tamanho do recorte na sprite
            Bird.x, Bird.y,
            Bird.largura, Bird.altura,
         )    
    }
}
 function loop(){
    Bird.draw()
    
    requestAnimationFrame(loop)
 }

 loop();