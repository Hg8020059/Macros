/*Written by Hg__80
Place axe in first hotbar slot, and replacements in a row starting from the top left inventory slot
Make sure there arent any sub 40 durability axes in your inv.
*/

//Change
const startCorner = [3987, 7374]; //furthest northeast corner
const endCorner = [3953, 7387]; //furthest southwest corner
const rows = 3; // how many rows of melons
const endy = 5; // y level of the last layer

//========================================================DONT TOUCH=========================================================

//angle and wait constants
const farmAngle = 12;
const nextRowWait = 20;
const secondSideWait = 4;
const nextLayerwait = 60;
const goToLodestoneWait = 8;

//Variables
const player = Player.getPlayer();
const inv = Player.openInventory();
let axeInvLook = 9;
let running = true;
let axeDuraCheck = true;

function toolDurabilityLeft(){
    if(player.getMainHand().isDamageable()){
        return player.getMainHand().getMaxDamage() - player.getMainHand().getDamage()
    }
}

//bot
function main(){
    for (i = 0; i < rows; i++){
        farmRow(i);
    }
    nextLayer();
}

function farmRow(i){
    //First side
    player.lookAt(90, farmAngle);
    KeyBind.keyBind('key.left', true);
    Client.waitTick(nextRowWait);
    KeyBind.keyBind('key.left', false);

    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
    while (true){
        Client.waitTick();

        //Check axe dura and switch if low
        if (toolDurabilityLeft() < 40 && axeDuraCheck){
            Client.waitTick();
            for (i = axeInvLook; i <= 44; i++) {
                if(i == 36){
                    continue;
                }
                if (inv.getSlot(i).getName().getString() == "Diamond Axe"){
                    inv.swap(i, 36);
                    axeInvLook++;
                    break;
                }

                // end if out of axes
                if(i == 44){
                    running = false;
                    axeDuraCheck = false;
                }
            }
        }

        if (Math.floor(player.getX()) == endCorner[0]){
            KeyBind.keyBind('key.forward', false);
            KeyBind.keyBind('key.attack', false);
            break;
        }
    }

    //Nextside
    player.lookAt(-90, farmAngle);
    KeyBind.keyBind('key.right', true);
    Client.waitTick(secondSideWait);
    KeyBind.keyBind('key.right', false);


    //Second side
    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
    while (true){
        Client.waitTick();

        //Check axe dura and switch if low
        if (toolDurabilityLeft() < 40 && axeDuraCheck){
            Client.waitTick();
            for (i = axeInvLook; i <= 44; i++) {
                if(i == 36){
                    continue;
                }
                if (inv.getSlot(i).getName().getString() == "Diamond Axe"){
                    inv.swap(i, 36);
                    axeInvLook++;
                    break;
                }

                // end if out of axes
                if(i == 44){
                    running = false;
                    axeDuraCheck = false;
                }
            }
        }

        if(Math.floor(player.getX()) == startCorner[0]-1 && i == rows-1){
            Client.waitTick(2);
            KeyBind.keyBind('key.forward', false);
            KeyBind.keyBind('key.attack', false);
            break;
        }

        if (Math.floor(player.getX()) == startCorner[0]){
            KeyBind.keyBind('key.forward', false);
            KeyBind.keyBind('key.attack', false);
            break;
        }
    }
}

function nextLayer(){
    //Go to lodestone
    Client.waitTick();
    KeyBind.keyBind('key.left', true);
    Client.waitTick(nextLayerwait);
    KeyBind.keyBind('key.left', false);

    //Move forwards
    player.lookAt(-90, 0);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(goToLodestoneWait);
    KeyBind.keyBind('key.forward', false);

    //Throw out melons
    for (i = 9; i <= 45; i++) {
        if (inv.getSlot(i).getName().getString() == "Melon") {
            inv.click(i);
            inv.click(-999);
        }
    }

    //Down lodestone
    KeyBind.keyBind('key.sneak', true);
    Client.waitTick();
    KeyBind.keyBind('key.sneak', false);
    Client.waitTick();

}

while(running){
    if (player.getY() == endy){
        JsMacros.off(lowDuraListener);
        break;
    }
    main();
}

JsMacros.off(lowDuraListener);