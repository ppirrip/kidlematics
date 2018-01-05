'use strict';
var Alexa = require("alexa-sdk");
const setting = require('./setting');
const npc = require('./npc');
const questionList = require('./challenge');
const genericDialog = require('./genericDialog');

const common = require('./common'); // common tools from highschooler

// binding to save some re-typeing
const emitResponse = common.emitResponse;
const rand = common.rand;
const removeSSML = common.removeSSML;
const addPTag = common.addPTag;
const addEmphsis = common.addEmphsis;
const arrayToSpeech = common.arrayToSpeech;
const addLongPause = common.addLongPause;

// states
const states = {
    PUB_MODE: '_PUB_MODE',
    WP1_MODE: '_WP1_MODE',
    WP2_MODE: '_WP2_MODE',
    RUIN_MODE: '_RUIN_MODE'
};

function setSessionVar() {
    if(Object.keys(this.attributes).length === 0) {
        //const waypoint1 = setting.get(1)[rand(3)].LOCATION;
        //const waypoint2 = setting.get(2)[rand(3)].LOCATION;

        // use constant for now
        const waypoint1 = setting.get(1)[0].LOCATION;
        const waypoint2 = setting.get(2)[0].LOCATION;

        this.attributes['firstHelp'] = true; 
        this.attributes['interaction'] = [];
        this.attributes['location'] = ['Pub',waypoint1,waypoint2,'Ruin'];
        this.attributes['challenge'] = [
            {/* pub scence, no challenge */},
            questionList.get(0), // use constant for now
            questionList.get(0), // use constant for now
            questionList.get(0)  // last question supposed to be fixed
        ];
        this.attributes['pass'] = false;
    }
}

function answerPrompt(ans) {
    // the ans array is expected like this:  ['7','6','3','1'],
    // always four elements, with the first element is the correct answer
    return `is the answer ${ans[0]}, ${ans[1]}, ${ans[2]} or ${ans[3]}? Say my answer is one for the first answer etc.` ;
}

function introHandler(state) {
    const idx = state == states.WP1_MODE ? 1 : 2;
    const location = this.attributes['location'][idx];
    const scence = setting.get(idx,location);
    const challenge = this.attributes['challenge'][idx]; 

    let msg = [
        `you arrived at the ${location}`,
        scence.DESC,
        ' ',
        scence.INTRO,
        ' ',
        challenge.q,
        answerPrompt(challenge.a),
        'to repeat the question, just say repeat.'
    ]; 

    const speak = arrayToSpeech(msg);
    const textCard = removeSSML(speak);
    const titleCard = `Challenge at the ${location}`;
    const reprompt = genericDialog.HELP[0];
    emitResponse.call(this,titleCard,textCard,speak,reprompt);
}

function wayPointHelpHandler(state) {
    const idx = state == states.WP1_MODE ? 1 : 2;
    const location = this.attributes['location'][idx];
    let msg = [
        'Say my answer is one for the first answer etc.',
        'to repeat the question, just say repeat.'
    ]; 

    const speak = arrayToSpeech(msg);
    const textCard = removeSSML(speak);
    const titleCard = `Challenge at the ${location}`;
    const reprompt = speak;
    emitResponse.call(this,titleCard,textCard,speak,reprompt);
}

function wayPointRepeatHandler(state) {
    const idx = state == states.WP1_MODE ? 1 : 2;
    const challenge = this.attributes['challenge'][idx];
    const location = this.attributes['location'][idx];

    let msg = [
        challenge.q,
        answerPrompt(challenge.a),
        'to repeat the question, just say repeat the question.'
    ]; 
    const speak = arrayToSpeech(msg);
    const textCard = removeSSML(speak);
    const titleCard = `Challenge at the ${location}`;
    const reprompt = genericDialog.HELP[0];
    emitResponse.call(this,titleCard,textCard,speak,reprompt);
}

function wayPointRetryHandler(state) {
    const idx = state == states.WP1_MODE ? 1 : 2;
    this.attributes['pass'] = false;
    // get a new challenge
    // should be random - const for now
    this.attributes['location'][idx] = setting.get(idx)[0].LOCATION;
    this.attributes['challenge'][idx] = questionList.get(0); // use constant for now
    this.emitWithState('RepeatIntent');
}

function talkToHandler(state) {
    const idx = state == states.WP1_MODE ? 1 : 2;
    const location = this.attributes['location'][idx];

    let msg = [
        scence.INTRO,
        ' ',
        challenge.q,
        answerPrompt(challenge.a),
        'to repeat the question, just say repeat.'
    ]; 

    const speak = arrayToSpeech(msg);
    const textCard = removeSSML(speak);
    const titleCard = `Challenge at the ${location}`;
    const reprompt = genericDialog.HELP[0];
    emitResponse.call(this,titleCard,textCard,speak,reprompt);
}

// need more handler later
exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, waypoint_1_Handlers,waypoint_2_Handlers);
    alexa.execute();
};

const waypoint_2_Handlers =  Alexa.CreateStateHandler(states.WP2_MODE, {
    'SayIntro': function () {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        introHandler.call(this,states.WP2_MODE);
    },
    'RepeatIntent': function () {
        console.log('RepeatIntent');
        wayPointRepeatHandler.call(this,states.WP2_MODE);
    },
    'RetryIntent': function () {
        console.log('Retry Intent at  waypoint 2');
        wayPointRetryHandler.call(this,states.WP2_MODE);
    },
    'TalkToIntent': function () {
        console.log('TalkToIntent');
        talkToHandler.call(this,states.WP2_MODE);
    },
    'AMAZON.HelpIntent': function () {
        console.log('HelpIntent at waypoint 2');
        wayPointHelpHandler.call(this,states.WP2_MODE);
    },
    'Unhandled' : function () {
        console.log('Unhandled Intent at  waypoint 2');
        this.emit('Unhandled');
    },
    'AMAZON.StopIntent' : function() {
        this.emit('AMAZON.StopIntent')
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.CancelIntent')
    }
});

// So this acts like  a mini game
const waypoint_1_Handlers =  Alexa.CreateStateHandler(states.WP1_MODE, {
    'AMAZON.HelpIntent': function () {
        console.log('HelpIntent at waypoint 1');
        wayPointHelpHandler.call(this,states.WP1_MODE);
    },
    'AnswerIntent': function ( ) {
        console.log('AnswerIntent');
    
        const intent = this.event.request.intent;
        const numStr = intent.slots.numeric.value;
        const location = this.attributes['location'][1];
        const challenge = this.attributes['challenge'][1];
        const scence = setting.get(1,location); 

        let msg = [];
        let repromptMsg = [];
        if (intent.slots.numeric.confirmationStatus !== 'CONFIRMED') { 
            if (intent.slots.numeric.confirmationStatus !== 'DENIED') {
                // not confirmed
                msg = [
                    `Are you sure ${numStr} is the correct answer?`,
                    'to repeat the question, just say repeat.'
                ]; 
                repromptMsg = msg;
                this.emit(':confirmSlot', 'numeric', arrayToSpeech(msg), arrayToSpeech(repromptMsg));
            } else {
                // denied
                msg = [
                    'Say my answer is one for the first answer etc.',
                    'to repeat the question, just say repeat.'
                ]; 
                repromptMsg = msg;
                this.emit(':elicitSlot', 'numeric', arrayToSpeech(msg), arrayToSpeech(repromptMsg));
            }
        } else {
            // all confirmed
            const num = parseInt(numStr);
            // num should be 1 <= n <= 4
            if (num == challenge.i + 1) {
                this.attributes['pass'] = true;
                msg = [
                    scence.LAST,
                    ' ',
                    'well done!',
                    'to continue the journey, just say move on.'
                ];
                repromptMsg = [
                    'to continue the journey, just say move on.'
                ];
            } else {
                msg = [
                    scence.MORE,
                    ' ',
                    'say try again to give it another shot, or stop to exit the game.'
                ];
                repromptMsg = [
                    'to continue the journey, just say move on.'
                ];
            }
            // emitResponse.call here ...
            const speak = arrayToSpeech(msg);
            const textCard = removeSSML(speak);
            const titleCard = `Challenge at the ${location}`;
            const reprompt = arrayToSpeech(repromptMsg);
            emitResponse.call(this,titleCard,textCard,speak,reprompt);
        }
    },
    'StartGameIntent': function () {
        console.log('StartGameIntent at wp 1');
        if (this.attributes['pass'] == true) {
            this.handler.state = states.WP2_MODE;
            this.emitWithState('SayIntro');
        } else {
            const msg = [
                'You have to solve the puzzle before moving on.'
            ];
            const location = this.attributes['location'][1];
            const speak = arrayToSpeech(msg);
            const textCard = removeSSML(speak);
            const titleCard = `Challenge at the ${location}`;
            const reprompt = genericDialog.HELP[0];
            emitResponse.call(this,titleCard,textCard,speak,reprompt);
        }
    },
    'RetryIntent': function () {
        console.log('Retry Intent at  waypoint 1');
        wayPointRetryHandler.call(this,states.WP1_MODE);
    },
    'Unhandled' : function () {
        console.log('Unhandled Intent at  waypoint 1');
        this.emit('Unhandled');
    },
    'RepeatIntent': function () {
        console.log('RepeatIntent');
        wayPointRepeatHandler.call(this,states.WP1_MODE);
    },
    'TalkToIntent': function () {
        console.log('TalkToIntent');
        talkToHandler.call(this,states.WP1_MODE);
    },
    'SayIntro': function () {
        // the first dialog
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);
        introHandler.call(this,states.WP1_MODE);
    },
    'AMAZON.StopIntent' : function() {
        this.emit('AMAZON.StopIntent')
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('AMAZON.CancelIntent')
    }
});

var handlers = {
    'NewSession': function () {
        // this launch when user utter ask, tell etc. that open a new session
        console.log('NewSession');
        setSessionVar.call(this);
        this.emit('SayHello');
    },
    'LaunchRequest': function () {
        console.log('LaunchRequest')
        setSessionVar.call(this);
        this.emit('SayHello');
    },
    'StartGameIntent': function () {
        console.log('StartGameIntent');
        this.handler.state = states.WP1_MODE;
        this.emitWithState('SayIntro');
    },
    'SayHello': function () {
        const msg = setting.WELCOME_MSG;
        const speak = arrayToSpeech(msg);
        const textCard = removeSSML(speak);
        const titleCard = `Welcome to the ${setting.PUB_NAME}`;
        const reprompt = genericDialog.HELP[0];
        emitResponse.call(this,titleCard,textCard,speak,reprompt);
    },
    'TalkToIntent': function () {
        console.log('TalkIntent');
        const npcList = npc.NPC_LIST;
        const msg = npcList.boko.INTRO;
        const speak = arrayToSpeech(msg);
        const textCard = removeSSML(speak);
        const titleCard = `Welcome to the ${setting.PUB_NAME}`;
        const reprompt = genericDialog.HELP[0];
        emitResponse.call(this,titleCard,textCard,speak,reprompt);
    },
    'RepeatIntent': function () {
        console.log('RepeatIntent');
        this.emit('TalkToIntent');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak('Bye. Come back when you have time.');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        console.log('Help');

        const msg = [
            'How about just say leave the pub to start the journey, or go talk to  Boko for more information?'
        ]; 

        const speak = arrayToSpeech(msg);
        const textCard = removeSSML(speak);
        const titleCard = 'Help';
        const reprompt = speak;
        emitResponse.call(this,titleCard,textCard,speak,reprompt);
    },
    'AMAZON.CancelIntent' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak('Alright. See you around.');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);

        this.response.speak("Sorry, I didn't get that. You can always try help.");
    }
};
