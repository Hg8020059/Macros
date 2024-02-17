//Stand on bottom of the furthest northwest pillar

//change
pillarsX = 4;
pillarsZ = 2;
farmName = "Q'Barra cocoa"
const webhookUrl = "https://discord.com/api/webhooks/1085172510229807184/QEG7AIdxydiVHy3iRRVTj4okUIdNYdvzG_V1a5-KMS0qs7oMgYOkznJ3IuULfxcUFMD7"
const growTime = 12 // grow time in hours

//Conservatisme (dont touch)
const player = Player.getPlayer();
const inv = Player.openInventory();
let farmingdown; 
const jumpWait = 10; //Change
const walkToBeanWait = 6;
const nextPillarWait = 15;
let lookDirection = [0, 90, 180, -90];
let pillarsFarmedX = 0;
let pillarsFarmedZ= 0;
let nextPillarDirection = 'east';
let farming = true;
bottomYLevel = player.getY();

const startTime = Date.now()

function harvestCompleted() {
    const timeSinceStart = Date.now() - startTime;
    const message = `Harvest of: ${farmName} completed in ${Math.floor((timeSinceStart / 1000) / 60)} minutes. Regrows in <t:${Math.floor((Date.now() / 1000) + (growTime * 60 * 60))}:R>` // modify the message to be sent here
    return message;
}

function sendWebhook(message) {
    let data = { "content": message };

    const req = Request.create(webhookUrl)
    req.addHeader('Content-Type', 'application/json')
    const response = req.post(JSON.stringify(data))
}

function farmDown(){
    KeyBind.keyBind('key.use', true);
    while (true){
        if (Math.floor(player.getY()) == bottomYLevel){
            KeyBind.keyBind('key.use', false);
            break;
        }
    }
}

function goToBean(i){
        //Lodestone; switch to this block for live
        Client.waitTick(5);
        KeyBind.keyBind('key.jump', true);
        Client.waitTick();
        KeyBind.keyBind('key.jump', false);
        Client.waitTick(jumpWait);

        //Lodestone; switch to this block for testing
        // Client.waitTick(5);
        // Chat.say("/tp hg__80 ~ 63 ~");
        // Client.waitTick(5);
    
        //go to beans
        player.lookAt(lookDirection[i], 90);
        KeyBind.keyBind('key.back', true);
        Client.waitTick(walkToBeanWait);
        KeyBind.keyBind('key.back', false);
    
        //Open and close trapdoor
        KeyBind.keyBind('key.use', true);
        KeyBind.keyBind('key.use', false);
        Client.waitTick();
        player.lookAt(lookDirection[i],0);
        Client.waitTick(10);
        KeyBind.keyBind('key.use', true);
        KeyBind.keyBind('key.use', false);
        Client.waitTick();
    
        //Position on beans
        player.lookAt(lookDirection[i], 79);
        KeyBind.keyBind('key.sneak', true);
        KeyBind.keyBind('key.back', true);
        Client.waitTick(5);
        KeyBind.keyBind('key.back', false);
        Client.waitTick(5);
        KeyBind.keyBind('key.sneak', false);
}

function farmPillar(){
    for (i = 0; i < 4; i++){
        goToBean(i);
        farmDown();
        // Get on lodestone
        KeyBind.keyBind('key.forward', true);
        Client.waitTick(7);
        KeyBind.keyBind('key.forward', false);
    }
}

function nextPillarX(){
    Chat.log("test 1");
    switch (nextPillarDirection){
        case 'east':
            player.lookAt(-90,0);
            break;

        case 'west':
            player.lookAt(90,0);
    }
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(nextPillarWait);
    KeyBind.keyBind('key.forward', false);
}

function nextPillarZ(){
    Chat.log("test 2");
    Client.waitTick(5);
    //center using lodestone
    KeyBind.keyBind('key.jump', true);
    Client.waitTick();
    KeyBind.keyBind('key.jump', false);
    Client.waitTick();
    KeyBind.keyBind('key.sneak', true);
    Client.waitTick();
    KeyBind.keyBind('key.sneak', false);
    Client.waitTick(5);

    player.lookAt(0,0);
    KeyBind.keyBind('key.forward', true);
    Client.waitTick(nextPillarWait);
    KeyBind.keyBind('key.forward', false);
    pillarsFarmedX = 0;

    switch (nextPillarDirection){
        case 'east':
            nextPillarDirection = 'west';
            break;

        case 'west':
            nextPillarDirection = 'east';
    }
}

function farm(){
    while (farming){
        farmPillar();
        pillarsFarmedX++;

        //move to next pillar
        if (pillarsFarmedX == pillarsX){
            pillarsFarmedZ++;
            if (pillarsFarmedZ == pillarsZ){
                harvestCompleted();
                Chat.say('/logout');
                sendWebhook(message)
                break;
            }
            else{
                nextPillarZ();
            }
        }
        else{
            nextPillarX();
        }
    }
}

farm();