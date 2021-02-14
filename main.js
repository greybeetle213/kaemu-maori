ctx = document.getElementById("canvas").getContext("2d")
document.getElementById("canvas").height = window.innerHeight - 10 // size the canvas to be a 4-3 ratio
document.getElementById("canvas").width =  window.innerHeight - 10 // size the canvas to be a 4-3 ratio
ctx = document.getElementById("canvas").getContext("2d") // redefine ctx
pixelsize = document.getElementById("canvas").width / 300 // define the size of  pixel all sizes are based around this
canvas = document.getElementById("canvas")
ctx.font = 100*pixelsize + "px Arial"
document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        enter = true
    }
})
x = 0
y = 0
words = ["sock,tōkena", "ear,taringa", "glasses,mōhiti", "hair,makawe", "nose,ihu", "teacher,kaiako", "boy,tama", "girl,tamahine", "apple,āporo", "bus,pāhi", "bottle,pātara", "roof,tuanui", "window,matapihi", "truck,taraka", "trousers,tarau", "clothing,kākahu", "tshirt,tīhāte", "star,whetū", "plane,waka rererangi", "tv,pouaka whakaata", "bed,moenga", "lamp,rama", "couch,turu roa", "lips,ngutu", "eye,karu", "horse,hoiho", "sheep,hīpi"]
goalx = Math.round(Math.random()*14)*20
goaly = Math.round(Math.random()*14)*20
goalImg = new Image()
goalImgIndex = Math.floor(Math.random()*words.length)
goalImg.src = "images/" + words[goalImgIndex].split(",")[0] + ".png"
document.getElementById("mission").innerHTML = "haere  ki te " + words[goalImgIndex].split(",")[1]
possiblePhonyWords = [...words]
possiblePhonyWords.splice(goalImgIndex,1)
phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
obstacals = []
while (phonyGoals[0][0] == x || phonyGoals[0][1] == y || phonyGoals[0][0] == goalx || phonyGoals[0][1] == goaly || phonyGoals[1][0] == x || phonyGoals[1][1] == y || phonyGoals[1][0] == goalx || phonyGoals[1][1] == goaly){
    phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
}
phonyGoals[0][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
phonyGoals[1][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
for(i = 0; i < 10; i ++){
    obstacals.push([Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,Math.round(Math.random()),Math.round(Math.random()*14)*20])
}
enter = false
score = 0
health = 3
time = 5
gameover = false
nextToObstical = false
bombCharged = false
bomb = new Audio("Explosion.wav")
win = new Audio("correct.wav")
loss = new Audio("wrong.wav")
function loop(){
    if(!gameover){
        ctx.clearRect(0,0,600*pixelsize,600*pixelsize)
        ctx.fillStyle = "black"
        ctx.fillRect(x*pixelsize,y*pixelsize,pixelsize*20,pixelsize*20)
        ctx.beginPath()
        for(i = 0; i < obstacals.length; i ++){
            ctx.moveTo(obstacals[i][0]*pixelsize,obstacals[i][1]*pixelsize )
            if(obstacals[i][2] == 0){
                ctx.lineTo(obstacals[i][0]*pixelsize,(obstacals[i][1]+obstacals[i][3])*pixelsize)
            }else{
                ctx.lineTo((obstacals[i][0]+obstacals[i][3])*pixelsize,obstacals[i][1]*pixelsize)
            }
        }
        ctx.stroke()
        ctx.drawImage(goalImg,goalx*pixelsize,goaly*pixelsize,20*pixelsize,20*pixelsize)
        ctx.drawImage(phonyGoals[0][2],phonyGoals[0][0]*pixelsize,phonyGoals[0][1]*pixelsize,20*pixelsize,20*pixelsize)
        ctx.drawImage(phonyGoals[1][2],phonyGoals[1][0]*pixelsize,phonyGoals[1][1]*pixelsize,20*pixelsize,20*pixelsize)
        if(x == goalx && y == goaly){
            win.play()
            goalx = Math.round(Math.random()*14)*20
            goaly = Math.round(Math.random()*14)*20
            goalImgIndex = Math.floor(Math.random()*words.length)
            goalImg.src = "images/" + words[goalImgIndex].split(",")[0] + ".png"
            document.getElementById("mission").innerHTML = "haere  ki te " + words[goalImgIndex].split(",")[1]
            possiblePhonyWords = [...words]
            possiblePhonyWords.splice(goalImgIndex,1)
            phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
            obstacals = []
            while (phonyGoals[0][0] == x || phonyGoals[0][1] == y || phonyGoals[0][0] == goalx || phonyGoals[0][1] == goaly || phonyGoals[1][0] == x || phonyGoals[1][1] == y || phonyGoals[1][0] == goalx || phonyGoals[1][1] == goaly){
                phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
            }
            phonyGoals[0][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
            phonyGoals[1][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
            ctx.fillStyle = "green"
            if(time > 4){
                score += 3
                ctx.fillText("+3", 100*pixelsize, 100*pixelsize)
            }else if(time > 3){
                score += 2
                ctx.fillText("+2", 100*pixelsize, 100*pixelsize)
            }else if(score > 0){
                score += 1
                ctx.fillText("+1", 100*pixelsize, 100*pixelsize)
            }
            ctx.fillStyle = "black"
            document.getElementById("score").innerHTML = String(score)
            obstacals = []
            for(i = 0; i < 10; i ++){
                obstacals.push([Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,Math.round(Math.random()),Math.round(Math.random()*14)*20])
            }
            bombCharged = false
            time = 5
        }
        if((x == phonyGoals[0][0] && y == phonyGoals[0][1])||(x == phonyGoals[1][0] && y == phonyGoals[1][1])){
            loss.play()
            goalx = Math.round(Math.random()*14)*20
            goaly = Math.round(Math.random()*14)*20
            goalImgIndex = Math.floor(Math.random()*words.length)
            goalImg.src = "images/" + words[goalImgIndex].split(",")[0] + ".png"
            document.getElementById("mission").innerHTML = "haere  ki te " + words[goalImgIndex].split(",")[1]
            possiblePhonyWords = [...words]
            possiblePhonyWords.splice(goalImgIndex,1)
            phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
            obstacals = []
            while (phonyGoals[0][0] == x || phonyGoals[0][1] == y || phonyGoals[0][0] == goalx || phonyGoals[0][1] == goaly || phonyGoals[1][0] == x || phonyGoals[1][1] == y || phonyGoals[1][0] == goalx || phonyGoals[1][1] == goaly){
                phonyGoals = [[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image],[Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image] , [Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,new Image]]
            }
            phonyGoals[0][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
            phonyGoals[1][2].src = "images/" + possiblePhonyWords[Math.floor(Math.random()*possiblePhonyWords.length)].split(",")[0] + ".png"
            health -= 1
            document.getElementById("health").innerHTML = String(health)
            obstacals = []
            for(i = 0; i < 10; i ++){
                obstacals.push([Math.round(Math.random()*14)*20,Math.round(Math.random()*14)*20,Math.round(Math.random()),Math.round(Math.random()*14)*20])
            }
            bombCharged = false
            time = 5
        }
        if(left){
            for(i = 0; i < obstacals.length; i++){
                if((obstacals[i][2] == 0 && obstacals[i][0] == x && y >= obstacals[i][1] && y < obstacals[i][1] + obstacals[i][3]) && x != 0){
                    nextToObstical = true
                    if(bombCharged == true){
                        obstacals.splice(i,1)
                        bombCharged = "used"
                        bomb.play()
                    }
                }
            }
            if(!nextToObstical){
                x -= 20
            }
            nextToObstical = false
        }
        if(right){
            for(i = 0; i < obstacals.length; i++){
                if((obstacals[i][2] == 0 && obstacals[i][0] == x + 20 && y >= obstacals[i][1] && y < obstacals[i][1] + obstacals[i][3])){
                nextToObstical = true
                if(bombCharged == true){
                    obstacals.splice(i,1)
                    bombCharged = "used"
                    bomb.play()
                }
                }
            }
            if(!nextToObstical){
                x += 20
            }
            nextToObstical = false}
        if(up){
            for(i = 0; i < obstacals.length; i++){
                if((obstacals[i][2] == 1 && obstacals[i][1] == y && x >= obstacals[i][0] && x < obstacals[i][0] + obstacals[i][3])){
                nextToObstical = true
                if(bombCharged == true){
                    obstacals.splice(i,1)
                    bombCharged = "used"
                    bomb.play()
                }
                }
            }
            if(!nextToObstical){
                y -= 20
            }
        }
        if (down){
            for(i = 0; i < obstacals.length; i++){
                if((obstacals[i][2] == 1 && obstacals[i][1] == y + 20 && x >= obstacals[i][0] && x < obstacals[i][0] + obstacals[i][3])){
                nextToObstical = true
                if(bombCharged == true){
                    obstacals.splice(i,1)
                    bombCharged = "used"
                    bomb.play()
                }
                }
            }
            if(!nextToObstical){
                y += 20
            }
        }
        if(space){
            score -= 1
            bombCharged = true
        }
        if(health == 0){
            document.getElementById("body").innerHTML = "kāti i konei. tatau: " + score
        }
        if(time > 0){
            time -= 0.1
            document.getElementById("time").innerHTML = Math.ceil(time)
        }
    }
}
setInterval(loop, 100)
