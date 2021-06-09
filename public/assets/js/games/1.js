var default_data = {
    state: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
}

var game_id = 0;
var game_status = -1;
var game_turn = undefined;
var game_data = undefined;
var game_my_eamil = undefined;
var game_player1_eamil = undefined;
var game_room_id = undefined;
var game_player1_id = undefined;
var game_player2_id = undefined;

class GameScreen extends Phaser.Scene{
    constructor(){
        super({key: "GameScreen"});
    }

    preload() {
        this.load.spritesheet("Point", "./assets/" + game_id + "/point.png", { frameWidth: 60, frameHeight: 60 });
    }

    create() {
        this.points= [];
        for(let i=0; i<3; i++)
        {
            let row = [];
            for(let j=0; j<3; j++)
            {
                let point = this.add.image(90 + i*60, 130 + j*60, 'Point', game_data.state[i][j] + 1);
                if(game_myturn){
                    point.on('pointerdown',() => {
                        game_turn = {x: i, y: j};
                        game_data.state[i][j] = game_my_eamil == game_player1_eamil ? 0 : 1;
                        this.points[i][j].setFrame(game_data.state[i][j] + 1);
                        this.setPointsEnable(false);
                        $('#submit_turn').prop('disabled', false);
                        $('#undo_turn').prop('disabled', false);
                        let nEndStatus = this.isEnd();
                        if(nEndStatus>=0)
                        {
                            game_status = 2+nEndStatus;
                        }
                        else{
                            game_status = 1-game_status;
                        }
                    });
                }
                row.push(point);
            }
            this.points.push(row);
        }
        if(game_myturn)
            this.setPointsEnable(true);
        else
            this.setPointsEnable(false);
        if(game_status<2){
            this.player1 = this.add.text(50, 30, "Player1:", { fixedWidth: 150})
            .setStyle({
                fontSize: '30px',
                fontWeight: 'bold',
                align: "center",
                color: '#00ff00',
            })
            .setOrigin(0,0.5);
            this.player1_point = this.add.image(250, 30, 'Point', 1).setScale(0.7);
            this.player2 = this.add.text(50, 65, "Player2:", { fixedWidth: 150})
            .setStyle({
                fontSize: '30px',
                fontWeight: 'bold',
                align: "center",
                color: '#00ff00',
            })
            .setOrigin(0,0.5);
            this.player2_point = this.add.image(250, 65, 'Point', 2).setScale(0.7);
        }
        else if(game_status>1){
            $('#resign_game').prop('disabled', true);
            this.endText = this.add.text(150, 50, "Game End", { fixedWidth: 300})
            .setStyle({
                fontSize: '50px',
                fontWeight: 'bold',
                align: "center",
                color: '#00ff00',
            })
            .setOrigin(0.5,0.5);
        }
    }

    isEnd(){
        for(let i=0; i<3; i++)
        {
            if(game_data.state[i][0] == -1)
                continue;
            let nPlayer = game_data.state[i][0];
            let nResult = nPlayer;
            for(let j=1; j<3; j++){
                if(game_data.state[i][j]!=nPlayer)
                {
                    nResult = game_data.state[i][j];
                    break;
                }
            }
            if(nPlayer == nResult){
                return nPlayer;
            }
        }
        for(let i=0; i<3; i++)
        {
            if(game_data.state[0][i] == -1)
                continue;
            let nPlayer = game_data.state[0][i];
            let nResult = nPlayer;
            for(let j=1; j<3; j++){
                if(game_data.state[j][i]!=nPlayer)
                {
                    nResult = game_data.state[j][i];
                    break;
                }
            }
            if(nPlayer == nResult){
                return nPlayer;
            }
        }

        if(game_data.state[0][0] != -1)
        {
            let nPlayer = game_data.state[0][0];
            let nResult = nPlayer;
            for(let i=1; i<3; i++){
                if(game_data.state[i][i]!=nPlayer)
                {
                    nResult = game_data.state[i][i];
                    break;
                }
            }
            if(nPlayer == nResult){
                return nPlayer;
            }
        }
        if(game_data.state[0][2] != -1)
        {
            let nPlayer = game_data.state[0][2];
            let nResult = nPlayer;
            for(let i=1; i<3; i++){
                if(game_data.state[i][2-i]!=nPlayer)
                {
                    nResult = game_data.state[i][2-i];
                    break;
                }
            }
            if(nPlayer == nResult){
                return nPlayer;
            }
        }
        let bEnd = true;
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++){
                if(game_data.state[i][j] == -1)
                {
                    bEnd = false;
                    break;
                }
            }
            if(bEnd == false){
                break;
            }
        }
        if(bEnd)
            return 2;
        return -1;
    }

    setPointsEnable(bEnable){
        for(let i=0; i<3; i++)
        {
            for(let j=0; j<3; j++)
            {
                if(bEnable){
                    if(game_data.state[i][j] == -1)
                        this.points[i][j].setInteractive();
                    else
                        this.points[i][j].disableInteractive();
                }
                else
                    this.points[i][j].disableInteractive();
            }
        }
    }
    
    undo(){
        game_status = 1-game_status;
        game_data.state[game_turn.x][game_turn.y] = -1;
        this.points[game_turn.x][game_turn.y].setFrame(0);
        this.setPointsEnable(true);
        game_turn = undefined;
        $('#submit_turn').prop('disabled', true);
        $('#undo_turn').prop('disabled', true);
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game_area',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 300,
        height: 300
    },
    transparent: true,
    scene: [ GameScreen ],
};
var game = {};
$(document).ready(function () {
    
    game = new Phaser.Game(config);
    
    
    game_data = $('#game_data').val();
    game_data = JSON.parse(game_data);
    if(game_data.state == undefined){
        game_data = default_data;
    }
    game_status = $('#game_status').val();
    game_id = $("#game_id").val();
    game_myturn = $("#game_myturn").val() == 'false'? false : true;
    game_resign = $("#game_resign").val() == 'false'? false : true;
    game_my_eamil = $("#game_my_email").val();
    game_player1_eamil = $("#game_player1_email").val();
    game_room_id = $("#game_room_id").val();
    game_player1_id = $("#game_player1_id").val();
    game_player2_id = $("#game_player2_id").val();

    game.scene.start('GameScreen');

    $('body').on('click', '#undo_turn', function(){
        game.scene.getScene('GameScreen').undo();
    })

    $('body').on('click', '#submit_turn', function(){
        $.ajax({
            type: "Post",
            url: '/submit_turn',
            data: {
                room_id: game_room_id,
                player_id: game_my_eamil == game_player1_eamil ? game_player1_id : game_player2_id,
                action: game_turn,
                data: JSON.stringify(game_data),
                status: game_status
            },
            success: function(result){
                document.location.reload();
            },
            error: function(xhr, status, err){
            }
          });                
    })
});
