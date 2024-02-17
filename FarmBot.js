//Carrot: X=53, Z=63
//Potato: X=80, Z=260
//Change
let Xlength = 80;
let Zlength = 260;
let crop = "Potato";
let cropSeeds = "Poisonous Potato";
const webhookUrl = "https://discord.com/api/webhooks/1085172510229807184/QEG7AIdxydiVHy3iRRVTj4okUIdNYdvzG_V1a5-KMS0qs7oMgYOkznJ3IuULfxcUFMD7"
const startTime = Date.now()
const farmName = "HgPotato" // Name of crop
const growTime = 32 // grow time in hours

// Variables
const player = Player.getPlayer();
const inv = Player.openInventory();
let botting = true;
let farmingWest;
let farmingEast;
let startZ;
let startX;
let currentZ;
let currentX;
let endingXWest;
let endingXEast;
let endingZ;

//functions
function harvestCompleted() {
    const timeSinceStart = Date.now() - startTime;
    const message = `Harvest of: ${farmName} completed in ${Math.floor((timeSinceStart / 1000) / 60)} minutes. Regrows in <t:${Math.floor((Date.now() / 1000) + (growTime * 60 * 60))}:R> \n<@449750505103818762>` // modify the message to be sent here
    return message;
}


function sendWebhook(messageToSend) {
    let data = { "content": messageToSend };

    const req = Request.create(webhookUrl)
    req.addHeader('Content-Type', 'application/json')
    const response = req.post(JSON.stringify(data))
}

function clickquick() 
{
    KeyBind.keyBind('key.use', true);
    Client.waitTick();
    KeyBind.keyBind('key.use', false);
    Client.waitTick();
}

function oneblockfwd()
{
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(5);
    KeyBind.keyBind('key.forward', false);
    Client.waitTick();
    player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
}

player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5); //Center player
endingZ = Math.floor(player.getZ()) + Zlength;
while (botting)
{
    farmingWest= true;

    //dont miss crops
    player.lookAt(90,90);
    clickquick();
    player.lookAt(90,50);
    clickquick();
    Client.waitTick()
    player.lookAt(90,30);
    clickquick();
    player.lookAt(90,20);
    clickquick();
    player.lookAt(90,15);

    Client.waitTick();

    endingXWest = Math.floor(player.getX() - Xlength);
    KeyBind.keyBind('key.forward', true);
    
    while (farmingWest)
    {
        currentX = Math.floor(player.getX());
        KeyBind.keyBind('key.use', true);
        Client.waitTick();
        KeyBind.keyBind('key.use', false);

        if(currentX == endingXWest){
            KeyBind.keyBind('key.forward', false);
            farmingWest = false;
        }
        Client.waitTick();
    }
    
    if (Math.floor(player.getZ()) == endingZ)
    {
        botting = false;
        sendWebhook(harvestCompleted())
        Chat.say("/logout");
        break;
    }

    //turn around
    Client.waitTick();
    player.lookAt(0,0);
    oneblockfwd();
    Client.waitTick()
    player.lookAt(-90,90);
    clickquick();
    player.lookAt(-90,50);
    clickquick();
    Client.waitTick()
    player.lookAt(-90,30);
    clickquick();
    player.lookAt(-90,20);
    clickquick();
    player.lookAt(-90,15);

    Client.waitTick();

    farmingEast = true;
    endingXEast = Math.floor(player.getX() + Xlength);
    KeyBind.keyBind('key.forward', true);

    while (farmingEast)
    {
        currentX = Math.floor(player.getX());
        KeyBind.keyBind('key.use', true);
        Client.waitTick();
        KeyBind.keyBind('key.use', false);

        if(currentX == endingXEast){
            KeyBind.keyBind('key.forward', false);
            farmingEast = false;
        }
        Client.waitTick();
    }

    if (Math.floor(player.getZ()) == endingZ)
    {
        botting = false;
        sendWebhook(harvestCompleted())
        Chat.say("/logout");
        break;
    }

    Client.waitTick()
    player.lookAt(-90,0)
    Client.waitTick()
    //Throw into waterstream
    for (i = 9; i <= 45; i++) {
        if (inv.getSlot(i).getName().getString() == crop) {
            inv.click(i);
            inv.click(-999);
        } else if (inv.getSlot(i).getName().getString() == cropSeeds) {
            inv.click(i);
            inv.click(-999);
        }
    }

    //turn around
    Client.waitTick();
    player.lookAt(0,0);
    oneblockfwd();

    Client.waitTick();
}
