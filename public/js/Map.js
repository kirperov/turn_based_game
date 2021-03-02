export default class Map {
    constructor(x, y, obstacles, weapons, activePlayerOne, activePlayerTwo) {
        this.x = x;
        this.y = y;
        this.obstacles = obstacles;
        this.weapons = weapons;
        this.generatedMap = [];
        this.players = [activePlayerOne, activePlayerTwo];
    }

    //Création de la carte vide avec la largeur et la longeur
    createMatrix() {
        for(let i = 0; i < this.y; i++) {
            //axe y
            this.generatedMap[i] = [];
            for(let n = 0; n < this.x; n++) {
                //axe x
                this.generatedMap[i][n] = 0;
            }
        }
    }

    generateRandomNumber(num) {
        let randNumber =  Math.floor((Math.random() * num));
        if(randNumber !== -1) {
            return Math.floor((Math.random() * num));

        }
    }
    
    positionPlayer(array) {
        for(let i = 0; i < this.players.length; i++) {
            let positionned = false;
 
            while(positionned == false) {
                let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                    nbRandY = this.generateRandomNumber(this.generatedMap.length); 
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    let topCase = "ob",
                        downCase = "ob",
                        leftCase = "ob",
                        rightCase = "ob";
                    //Verification top case
                     if(nbRandY -1 >= 0) {
                      
                        if(this.generatedMap[nbRandY -1][nbRandX] !== this.players[0].name || this.generatedMap[nbRandY -1][nbRandX] !== this.players[1].name) {
                            topCase = this.generatedMap[nbRandY -1][nbRandX];
                        } else {
                            continue;
                        }
                    }
                    //Verification down case
                    if(nbRandY +1 < this.y) {
                        if(this.generatedMap[nbRandY +1][nbRandX] !== this.players[0].name || this.generatedMap[nbRandY +1][nbRandX] !== this.players[1].name) {
                            downCase = this.generatedMap[nbRandY +1][nbRandX];
                        } else {
                            continue;
                        }
                    }
                    //Verification left case
                    if(nbRandX -1 >= 0) {
                        if(this.generatedMap[nbRandY][nbRandX -1] !== this.players[0].name || this.generatedMap[nbRandY][nbRandX -1] !== this.players[1].name) {
                            leftCase = this.generatedMap[nbRandY][nbRandX -1];
                        } else {
                            continue;
                        }
                    }
                    //Verification right case
                    if(nbRandX +1 < this.x) {
                        if(this.generatedMap[nbRandY][nbRandX +1] !== this.players[0].name || this.generatedMap[nbRandY][nbRandX +1] !== this.players[1].name) {
                            rightCase = this.generatedMap[nbRandY][nbRandX +1];
                        } else {
                            continue;
                        }
                    }
                    //Verification obstacles
                    if(topCase.toString().includes('ob') && downCase.toString().includes('ob') && leftCase.toString().includes('ob') && rightCase.toString().includes('ob')) {
                        continue;
                    } else {
                        this.generatedMap[nbRandY][nbRandX] = this.players[i].name;
                        console.log(topCase);
                        console.log(downCase);
                        console.log(leftCase);
                        console.log(rightCase);
                        this.players[i].x = nbRandX;
                        this.players[i].y = nbRandY;
                    }
                    positionned = true;    
                } 
            }
        }
    }

    positionWeapon(array) {
        for(let i = 0; i < array.length; i++) {
            let nbRandX = this.generateRandomNumber(this.generatedMap.length),
                nbRandY = this.generateRandomNumber(this.generatedMap.length); 
            let positionned = false;
            while(positionned == false) {
                if(this.generatedMap[nbRandY][nbRandX] == 0) {
                    this.generatedMap[nbRandY][nbRandX] = array[i];
                    continue;
                } else {
                    positionned = true;

                }
            }
        }
    }

    positionObstacle(array) {
        for(let i = 0; i < this.y; i++) {
            let numberRand = this.generateRandomNumber(this.y * 0.4);
            for(let n = 0; n < numberRand; n++) {
                let positionned = false;
                while(positionned == false) {

                    let obstNbRand = this.generateRandomNumber(array.length),
                        caseNbRand = this.generateRandomNumber(this.y);
                    if(this.generatedMap[i][caseNbRand] == 0) {
                        this.generatedMap[i][caseNbRand] = array[obstNbRand];
                        positionned = true;
                    } else {
                        continue;
                    }
                }
            }
        }
    }

    generateMap() {
        this.createMatrix(this.x, this.y);
        this.positionPlayer(this.players);
        console.log("joueur positionné")
        this.positionWeapon(this.weapons);
        console.log("armes positionné")
        this.positionObstacle(this.obstacles);
        console.log("obstacles positionné")
    }

    // Récupère la position et le nom de la case selon la direction de flèche
    getPosition(direction, playerPositionX, playerPositionY) {
        let oldPosition = [playerPositionY,playerPositionX],
            newPosition = [playerPositionY,playerPositionX],
            caseName;
        if(direction == "ArrowUp" || direction == "ArrowDown") {
            direction =="ArrowUp" ? newPosition[0] = playerPositionY-1 : newPosition[0] = playerPositionY+1;
            caseName = this.generatedMap[newPosition[0]][playerPositionX];
        } else {
            direction =="ArrowLeft" ? newPosition[1] = playerPositionX-1 : newPosition[1] = playerPositionX+1;
            caseName = this.generatedMap[playerPositionY][newPosition[1]];
        }
        return [oldPosition, newPosition, caseName];
    }

    //Verification de la case si weapon ou obstacle
    checkPosition(direction, playerPositionX, playerPositionY, startPosition, prevPosition) {
        let listPositions = this.getPosition(direction, playerPositionX, playerPositionY),
            namePosition =  listPositions[2],             
            newPositionY = listPositions[1][0],
            newPositionX = listPositions[1][1];

            let upBlock = startPosition[0] - 4,
                downBlock = startPosition[0] + 4,
                leftBlock = startPosition[1] - 4,
                rightBlock = startPosition[1] + 4;
            
            let startCoordinates = parseInt(startPosition[0]+""+startPosition[1]);
            let newCoordinates = parseInt(newPositionY+""+newPositionX);
            let oldPositionY =  startPosition[0];
            let oldPositionX = startPosition[1];
            console.log("Start position: "+startCoordinates);
            console.log("New Position: "+newCoordinates);
        if($.inArray(namePosition, this.obstacles) == -1) {
            if (newPositionY !== upBlock && newPositionY !== downBlock && newPositionX !== leftBlock && newPositionX !== rightBlock && newPositionY !== "undefined" && newPositionX !== "undefined") {
                 if (newPositionX == oldPositionX || newPositionY == oldPositionY) {
                    if (newCoordinates == prevPosition) {
                        console.log("stop");
                    } else {
                        this.players[0].y = newPositionY;
                        this.players[0].x = newPositionX;
                        this.players[0].previousPosition = playerPositionY+""+playerPositionX;
                        this.updateMap(listPositions);
                    }
                } else {
                    console.log("stop");
                }
            } else {
                console.log("stop");
            }

            if($.inArray(namePosition, this.weapons) !== -1) {
                console.log("case weapon "+ '['+namePosition+']');
                this.players[0].weapon  = namePosition;
            } else {
                console.log("case vide "+ '['+namePosition+']')
            }
        } else {    
            console.log("case obstacle "+ '['+namePosition+']')
        }
    }

    // Check position avant modifier la carte
    makeStep(action, playerPositionX, playerPositionY, startPosition, prevPosition) {
        switch(action) {
            case "ArrowUp":
                console.log('arrow up');
                    this.checkPosition("ArrowUp", playerPositionX, playerPositionY, startPosition, prevPosition);
            break;
            case "ArrowDown":
                console.log('arrow down');
                    this.checkPosition("ArrowDown", playerPositionX, playerPositionY, startPosition, prevPosition);
            break;
            case "ArrowLeft":
                console.log('arrow left');
                    this.checkPosition("ArrowLeft", playerPositionX, playerPositionY, startPosition, prevPosition);
            break;
            case "ArrowRight":
                console.log('arrow right');
                    this.checkPosition("ArrowRight", playerPositionX, playerPositionY, startPosition, prevPosition);
            break;
        }
    }
    //Update map ajax
    updateMap(listPositions) {
        let oldPositionY = listPositions[0][0],
            oldPositionX = listPositions[0][1],
            newPositionY = listPositions[1][0],
            newPositionX = listPositions[1][1],
            positionName = listPositions[2];
        $.ajax({
            success: function(){
            $("#case-"+oldPositionY+oldPositionX).removeClass("case__player_one");
            $("#case-"+newPositionY+newPositionX).addClass("case__player_one")
        }});
    }

    //Visualiser la carte dans le DOM
    visualizeMap() {
        // Creation field for cases
        let container = $(".map-grid");
        for(let i = 0; i < this.generatedMap.length; i++) {
            let rowX = $('<div id="row-'+[i]+ '"' + 'class="map-grid__row"></div>');
            for(let n = 0; n < this.generatedMap[i].length; n++) {
                // Creation cases
                let caseDiv = $("<div></div>");
                    caseDiv.addClass("case");
                    caseDiv.attr('id', "case-"+[i]+[n]);
                    caseDiv.text(this.generatedMap[i][n]);
                    container.append(rowX);
                    rowX.append(caseDiv);
                
                // Attribution des classes en fonction des cases
                caseDiv.each(function() {
                    let classCase = 'case__'+$(this).text();
                    $(this).empty();
                    $(this).addClass(classCase);
                });
            }           
        }
    }
}
