export default class Fight {
    toAttack(playerToAttack, dommage) {
        if(playerToAttack.health > 0) {
            if(playerToAttack.defense === true) {
                dommage = dommage-(dommage * 50/100);
                playerToAttack.defense = false;
                playerToAttack.updatShieldPlayerInfo(playerToAttack.name, playerToAttack.defense);
            }
            playerToAttack.health  = playerToAttack.health - dommage;
            playerToAttack.updateHealthPlayerInfo(playerToAttack);
            playerToAttack.updateSectionColorPlayer(playerToAttack.name);
            if(playerToAttack.health <= 0) {
                return false;
            } 
            return true;
        } 
    }

    toBlockTheAttack(player) {
        player.defense = true;
        player.updatShieldPlayerInfo();
    }

    hideTurnButton() {
        $("#turn").removeClass("btn-turn--active").addClass("btn-turn--hidden");
    }

    showAttackButton() {
        $("#attack").removeClass("btn-attack--hidden").addClass("btn-attack--active");
    }

    showShieldButton() {
        $("#to-defend").removeClass("btn-defend--hidden").addClass("btn-defend--active");
    }

}