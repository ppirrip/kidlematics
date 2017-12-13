'use strict';
var Alexa = require("alexa-sdk");
var format = require('string-format')

// Generic responses
const GENERIC_HELP = 'how may I help you';
const GENERIC_REPROMPT = 'sorry I missed that, would you mind to repeat';
const GENERIC_POS_ACK = [];
const GENERIC_NEG_ACK = [];

// Locations
const COUNTRY_NAME = 'Kidlematica';
const PUB_NAME = 'Blind Duck Pub';
const FINAL_SCENE = 'Castle Ruin';

const WAY_POINT_1 = [
    {
        'LOCATION': 'bridge',
        'DESC': ['A Troll is guarding a bridge where to have to cross'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
    {
        'LOCATION': 'cave',
        'DESC': ['A Bear is sleeping at the openning of a cave where you need to enter'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
    {
        'LOCATION': 'freeway',
        'DESC': ['A bandit is guarding a blockade on the free way'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
];

const WAY_POINT_2 = [
    {
        'LOCATION': 'forrest',
        'DESC': ['You are in a forrest crossing where to have to decide going left, or right'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
    {
        'LOCATION': 'underground maze',
        'DESC': ['You are inside an underground maze where to have to decide take the left, or right'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
    {
        'LOCATION': 'ancient city ruin',
        'DESC': ['You are inside an ancient city ruin where to have to decide going left, or right'],
        'INTRO': [],
        'MORE': [],
        'LAST': []
    },
];

// NPC dialogs
const Boko_Dialog = {
    'DESC': [],
    'INTRO': [
        'welcome stranger, we need your help',
        'our town treasure has been stolen, please take it back for us',
        'it is taken to the old castle ruin',
        'do you know where to go'
    ],
    'MORE': [
        'please bring back our town treasure, it is very important to us'
    ],
    'LAST': [
        'please bring back our town treasure, it is very important to us'
    ]
};

const Sozea_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Dihpaz_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Jia_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Munden_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Troll_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Bear_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Bandit_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

const Grinchearna_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

// General constants
const NPC_LIST = {
    'boko': Boko_Dialog, 
    'sozea': Sozea_Dialog, 
    'dihpaz': Dihpaz_Dialog,
    'jia': Jia_Dialog, 
    'munden': Munden_Dialog, 
    'troll': Troll_Dialog, 
    'bear': Bear_Dialog, 
    'bandit': Bandit_Dialog,
    'grinchearna': Grinchearna_Dialog
};

// use bind, apply or call ...
// e.g. emitResponse.call(this,'SayGreeting', textCard, speechOutput, reprompt);
function emitResponse(intentName, textCard, speak, reprompt) {
    this.response.cardRenderer(intentName,textCard);
    if (reprompt == undefined) {
        this.response.speak(speak);
    } else {
        this.response.speak(speak).listen(reprompt);
    }

    // might as well log to Cloud Watch here
    console.log(intentName + ' : ' + textCard);

    // added return just in case
    // seems like for :elicitSlot and :confirmSlot return is explicitly required
    return this.emit(':responseReady'); // added return just in case
}

//function 

function rand(n) {
    return Math.floor(Math.random() * n);
}

function setSessionVar() {
    if(Object.keys(this.attributes).length === 0) {
        const waypoint1 = WAY_POINT_1[rand(3)]['LOCATION'];
        const waypoint2 = WAY_POINT_2[rand(3)]['LOCATION'];

        this.attributes['firstHelp'] = true; 
        //this.attributes['driveState'] = [{speed:0,turn:'straight',deg:'0'}];
        this.attributes['interaction'] = [];
        this.attributes['location'] = ['Pub',waypoint1,waypoint2,'Ruin'];
    }
}

function removeSSML (s) {
    return s.replace(/<\/?[^>]+(>|$)/g, "");
}

function addPTag(msg) {
    return '<p>' + msg + '</p>';
}

function addEmphsis(msg) {
    return '<emphasis level="strong">' + msg + '</emphasis>';
}

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        setSessionVar.call(this);
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        // leave this for debugging for now
        this.emit('SayHello');
    },
    'AskNameIntent': function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        const intentName = 'AskNameIntent';
        const textCard = 'AskNameIntent';
        const speak = '<p>My name is Boko. I am the owner of this Blind Duck Pub.</p>';
        const reprompt = 'Want a drink?';
        emitResponse.call(this,intentName,textCard,speak,reprompt);
    },
    'AskInfoIntent': function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        setSessionVar.call(this);

        const location = this.attributes['location'];
        let msg = []; 
        msg.push('You need to travel to the ' + location[1]);
        msg.push('then the ' + location[2]);
        msg.push('and finally to the Castle Ruin to recover the treasure');
        msg.push('beware of the dangers along the way');
        msg.push('that is all I know');
        msg.push('when you are ready, just said leave the pub');

        const titleCard = 'Asking for more information';
        const textCard = msg.join(', ');

        const speak = msg.map(addPTag).join('');
        const reprompt = GENERIC_HELP;
        emitResponse.call(this,titleCard,textCard,speak,reprompt);
    },
    'TalkToIntent': function() {
        setSessionVar.call(this); // ensure the session variables are in place
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        // ref: https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/sample-nodejs-fact/src/index.js
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
            // ready to delegate it back to the Dialog (Dialog.Delegate)
            this.context.succeed({
                "response": {
                    "directives": [
                        {
                            "type": "Dialog.Delegate"
                        }
                    ],
                    "shouldEndSession": false
                },
                "sessionAttributes": this.attributes
            });
        } else {
            // here you have everything
            const npc = this.event.request.intent.slots.npc.value.toLowerCase();
            const interaction = this.attributes['interaction'];

            const titleCard = 'Talk to ' + npc;
            const reprompt = 'what do you want to do next?';

            let textCard = '';
            let speak = '';
            const npcDialog = NPC_LIST[npc];
            switch((interaction.filter(x => x['object'] == npc)).length) {
                case 0:
                    speak = npcDialog['INTRO'].map(addPTag).join('');
                    textCard = npcDialog['INTRO'].join(', ');
                    interaction.push({'action':'talk', 'object':npc})                    
                    break;
                case 1:
                    speak = npcDialog['MORE'].map(addPTag).join('');
                    textCard = npcDialog['MORE'].join(', ');
                    interaction.push({'action':'talk', 'object':npc})

                    break;
                default:
                    speak = npcDialog['LAST'].map(addPTag).join('');
                    textCard = npcDialog['LAST'].join(', ');
                    interaction.push({'action':'talk', 'object':npc})
            }
            //console.log(JSON.stringify(interaction.pop()));
            console.log(JSON.stringify(interaction));
            emitResponse.call(this,titleCard,textCard,speak,reprompt);            
        }
    },
    'BuyIntent': function () {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        // need to use :elicitSlot here
        const intentName = 'BuyIntent';
        const textCard = 'BuyIntent';
        const speak = '<p>Good, your drink is coming.</p>';
        const reprompt = 'what do you want to do next?';
        emitResponse.call(this,intentName,textCard,speak,reprompt);        
    },
    'LeaveIntent': function () {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        const titleCard = 'The adventure begins';
        const textCard = 'The adventure begins';

        const speak = addPTag(textCard);
        const reprompt = ''; // end the game here for now
        emitResponse.call(this,titleCard,textCard,speak,reprompt);

    },
    'SayHello': function () {
        const msg1 = 'Welcome to the ' + PUB_NAME + ' at ' + COUNTRY_NAME;
        const msg2 = 'How may I help you?';

        const titleCard = msg1;
        const textCard = msg1 + ' ' + msg2;

        const speak = addPTag(msg1) + addPTag(msg2);
        const reprompt = msg2;
        emitResponse.call(this,titleCard,textCard,speak,reprompt);

        //this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        let msg = []; 
        if (this.attributes['firstHelp'] == true) {
            // give the long version of help
            msg.push('you can always ask for help in ' + COUNTRY_NAME);
            msg.push('for example');
            msg.push('just say what should I do');
            msg.push('or where should I go');
            msg.push('or just say HELP');
            msg.push("why don't you try to talk to Boko?");
            msg.push('just say go talk to Boko');

            this.attributes['firstHelp'] = false;
        } else {
            // here should be stateful / context related help
            // do it later
            msg.push("why don't you try to talk to Boko at the " + PUB_NAME);
            msg.push('just say go talk to Boko');
        }

        const titleCard = 'Asking for help';
        const textCard = msg.join(', ');

        const speak = msg.map(addPTag).join('');
        const reprompt = GENERIC_HELP;
        emitResponse.call(this,titleCard,textCard,speak,reprompt);

    },
    'AMAZON.CancelIntent' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};
