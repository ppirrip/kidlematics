'use strict';

const Boko_Dialog = {
    'DESC': ['A middle age man cleaning the bar as you walk in.'],
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
    'DESC': ['a big green monster'],
    'INTRO': [
        'you must pay to cross the bridge.', 
        'I don\'t want your gold, but I want your wit.',
    ],
    'MORE': ['you are dumber than I am.', 'maybe I should eat you.'],
    'LAST': ['good, that sounds right.', 'the troll walks away from the bridge.']
};

const Bear_Dialog = {
    'DESC': ['a sleepy bear slept at the entrance of the cave openning.'],
    'INTRO': [
        'I am hungry and I am too lazy to go hunt.',
        'I can\'t go home without food.',
        'but I don\'t need your food, I need food for my brain',
        'answer me this correctly and I will be on my way home.'
    ],
    'MORE': ['your brain is emptier than mine, maybe you should go and learn something.'],
    'LAST': ['ah, now I can go home to share this with my kids. Bye.']
};

const Bandit_Dialog = {
    'DESC': ['a dangerous looking man guarding the a blockade across the highway.'],
    'INTRO': [
        'you look as poor and I am, but matter not.',
        'it is your smart that matter most.',
        'share me with your brainy lot.',
        'I will be leaving in a haste'
    ],
    'MORE': ['your lack of knowledge is more so than your lack of gold, you are not ready for this road to future.'],
    'LAST': ['much ligher than gold, but knowledge is what tips the balance. you are ready for the future ahead.']
};

const Grinchearna_Dialog = {
    'DESC': [],
    'INTRO': [],
    'MORE': [],
    'LAST': []
};

module.exports = {
    'NPC_LIST': {
        'boko': Boko_Dialog, 
        'sozea': Sozea_Dialog, 
        'dihpaz': Dihpaz_Dialog,
        'jia': Jia_Dialog, 
        'munden': Munden_Dialog, 
        'troll': Troll_Dialog, 
        'bear': Bear_Dialog, 
        'bandit': Bandit_Dialog,
        'grinchearna': Grinchearna_Dialog
    }
}