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