'use strict';
var Alexa = require("alexa-sdk");

// Generic responses
const GENERIC_HELP = [];
const GENERIC_REPROMPT = [];
const GENERIC_POS_ACK = [];
const GENERIC_NEG_ACK = [];

// Locations
const COUNTRY_NAME = 'Kidlematica';
const PUB_NAME = 'Blind Duck Pub';

const Boko_Dialog = {
    'DESC': [],
    'INTRO': [
        'welcome stranger, we need your help',
        'our town treasure is stolen, please take it back for us',
        'it is taken to the old castle ruin'
    ],
    'MORE': [

    ],
    'LAST': [

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

function setSessionVar() {
    if(Object.keys(this.attributes).length === 0) {
        this.attributes['firstHelp'] = true; 
        //this.attributes['driveState'] = [{speed:0,turn:'straight',deg:'0'}];
        this.attributes['interaction'] = [];
        this.attributes['location'] = ["Pub"]; // initial
    }
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

        // this might need to break into multiple intents
        const intentName = 'AskInfoIntent';
        const textCard = 'AskInfoIntent';
        const speak = '<p>You are the hero we have been waiting!</p>';
        const reprompt = 'Anything else you want to know?';
        emitResponse.call(this,intentName,textCard,speak,reprompt);
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
            console.log(JSON.stringify(interaction.pop()));
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

        // need to use confirmation here
        const intentName = 'LeaveIntent';
        const textCard = 'LeaveIntent';
        // here I need to trigger to a different state and let
        // the other intent to handle it.
        const speak = '<p>So the adventure begins</p>';
        const reprompt = 'what do you want to do next?';
        emitResponse.call(this,intentName,textCard,speak,reprompt);        
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
