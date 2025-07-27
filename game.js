let canvasW;
let canvasH;
let v;
let mouseX = 0;
let mouseY = 0;
let interval = 0;
let time = 0;
let t = 0;
let ct = 0;
let record = 0;

function increament() {
    time += 1;
    console.log("аьо")
    if (time < 61){
    }
    else{
        interval = clearInterval(increament);
    }
}
const canvas = document.getElementById("screen");
function st(){
    const canvas = document.getElementById("screen");
}
let bottles = []
// сдесь будем хранить счет
let score = 0
let diri = []
let blows = []
let loaded_images = 0;

const images = {
    "cross":"C:/Users/sch1561-it-18/Pictures/cross.png",
    "bottle": "C:/Users/sch1561-it-18/Pictures/bottle.png",
    "blow":"C:/Users/sch1561-it-18/Pictures/blow.png",
    "dira":"C:/Users/sch1561-it-18/Pictures/dira.png",
    "nn":"C:/Users/sch1561-it-18/Pictures/nn.png"
}

function loadAllImages() {
    Object.keys(images).forEach((image_title) => {
        let img = new Image()

        img.addEventListener("load", () => {
            loaded_images += 1
            if (loaded_images === Object.keys(images).length) {
                startGame()
            }
        });
        ct = 0;
        img.src = images[image_title]
        images[image_title] = img
    })
}

function random(a, b) {
    return Math.random() * (b - a) + a
}

function createBottle() {
    const bottle = {
        x: random(0, canvasW),
        y: random(0, canvasH),
    }
    bottles.push(bottle)
}

function removeOldBottles() {
    if (bottles.length > 3) {
        bottles.shift()
    }
}

function mouseClick(e) {
    makeShot(e.clientX, e.clientY)
}

// функция для обработки выстрела
function makeShot(x, y) {
    let currentSize = bottles.length
    let r  = 0 
    if(ct == 1){
        v = 1
        bottles = bottles.filter(bottle => !(bottle.x - 50 <= x && x <= bottle.x + 50 && bottle.y - 100 <= y && y <= bottle.y + 100))

        // прибавляем к счету количество бутылок, по которым мы попали
        const ctx = canvas.getContext("2d")
        r = score
        score += currentSize - bottles.length
        drawBlow(ctx)

        if(score == r){
            createDira(mouseX,mouseY);
        }
        if(score == r + 2 && ct == 1){
            drawBlow(ctx)
        }
    }
    if(x > 0 && ct == 0){
        ct = 1
        v = 0 
        startGame()
        console.log("2q2")
        interval = setInterval(increament, 10000);
    }
}

function makeFullscreen() {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight

    canvasW = canvas.width
    canvasH = canvas.height
}

function saveMousePosition(e) {
    mouseX = e.clientX
    mouseY = e.clientY
}

function drawBackground(ctx) {
    ctx.fillStyle = "#f5f5dc"
    ctx.fillRect(0, 0, canvasW, canvasH)
}
function stop_game(){
    interval = clearInterval(increament);
    console.log("STTOOOOP");
    clearInterval(createBottle)
    ct = 0
    time = 0
    diri = []
    rec = score
    //let text = "Игра Мяу";
    //ctx.fillStyle = "red"
    //ctx.font = "148px serif";
    //ctx.fillText(text, canvasW - 1300,150,1500);
}
function drawCursor(ctx) {
    // рисуем курсор (размер 50 на 50)
    ctx.drawImage(images.cross, mouseX , mouseY +20, 50, 50)
}
function drawBlow(ctx) {
    for(let i =0;i< 10;i++){
        console.log(blows[i])
    }
        console.log("MIAYYY")
    if(v !=0){
        ctx.drawImage(images.blow , mouseX - 25, mouseY - 25, 100, 100)
        t = 0
    }
}

function drawBottles(ctx) {
    bottles.forEach((bottle) => {
        // рисуем цели (размер 100 на 200)
        ctx.drawImage(images.bottle, bottle.x - 50, bottle.y - 100, 100, 200)
    })
}
function drawBloww(ctx){
    if(v !=0 ){
        t = t + 1
        ctx.drawImage(images.blow , mouseX - 25, mouseY - 25, 100, 100)
    }
}

function drawTime(ctx) {
    ctx.font = "48px serif";
    ctx.fillStyle ="red"
    let text = time + " сек";
    let textSize = ctx.measureText(text)
    ctx.fillText(text , canvasW - 170 - textSize.width, 100);
}

function createDira(x1,y1) {
    const dira = {
        x: x1,
        y: y1,
    }
    diri.push(dira)
}
function drawDira(ctx){
    if (diri.length > 10){
        stop_game()
    }
    diri.forEach((dira)  => {
        ctx.drawImage(images.dira , dira.x +50 , dira.y , 100, 100)
    })

}
function drawScore(ctx) {
    ctx.font = "48px serif";
    ctx.fillStyle = "red"
    s = score * 15;
    let text = score + " | " + s + "Рублей"
    let textSize = ctx.measureText(text)
    ctx.fillText(text, canvasW - 200 - textSize.width, 50);
}
function checkLose(){
    if (score > 10){
        stop_game();
    }
}

function drawMenu(ctx){
    let text = "Игра Мяу";
    let textSize = 100;
    ctx.fillStyle = "green"
    ctx.font = "148px serif";
    ctx.fillText(text, canvasW - 1300,150,1000);
    ctx.drawImage(images.nn,canvasW - 1300,250)
    if(rec > record){
        record = rec;
    }
    text1 = "Рекорд:" + record
    ctx.fillStyle = "red"
    ctx.font = "148px serif";
    ctx.fillText(text1, canvasW - 150, canvasH - 100,100,300);
    ct = 0  
}
function drawCcursor(ctx) {
    // рисуем прямоугольник на месте мыши
    ctx.fillStyle = "green"
    ctx.fillRect(mouseX - 5, mouseY - 5, 10, 10)
}
function drawFrame() {
    const ctx = canvas.getContext("2d")
    drawCcursor(ctx)
    makeFullscreen()
    drawCcursor(ctx)
    drawBackground(ctx)
    if(ct == 1){        
        console.log("Zondbi")
        removeOldBottles()
        drawTime(ctx)
        drawBottles(ctx)
        drawDira(ctx)
        drawCursor(ctx)
        drawScore(ctx)
        checkLose(ctx)
        if(t < 10){
            drawBloww(ctx)
        }
    }
    else{
        console.log("meny")
        drawMenu(ctx)
    }
}
function startGame() {
    console.log("sayat")
    setInterval(drawFrame, 20)
    setInterval(createBottle, 2000)
    addEventListener("mousemove", saveMousePosition)
    addEventListener("mousedown", mouseClick)
}

loadAllImages()