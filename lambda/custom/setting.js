'use strict'
const npc = require('./npc');
const npcList = npc.NPC_LIST;

module.exports = {
    'get' : function(wpIndx,location) {
        if (location == undefined) {
            return this.WAY_POINTS[wpIndx-1];
        } else {
            return this.WAY_POINTS[wpIndx-1].filter(x => x['LOCATION'] == location)[0];
        }
    },
    'COUNTRY_NAME': 'Kidlematica',
    'PUB_NAME': 'Blind Duck Pub',
    'FINAL_SCENE': 'Castle Ruin',
    'WELCOME_MSG': [
        'Its a gloomy day, you have been walking through the foggy moors of Kidlematica, the soil damp from the recent rainfall.',
        `As you enter the village you see a tavern; the Blind Duck Pub', you enter in hopes of finding a bit of rest, and work.`,
        'You take a seat on the vacant stool as the barkeep pours you a glass of milk, and he tells you his name is Boko',
        'I want you to recover something for me, he said',
        'What would you like to do?',
        'if not sure, just say help'
    ],
    'WAY_POINTS': [
        [
            {
                'LOCATION': 'bridge',
                'CHALLENGE': 'troll',
                'DESC': [
                    'A huge human like creature stands before you.',
                    'Standing at the bridge looking down at you with a hunched back, skin green from mold, pockets of dirt laying in the mold beds have become home to different type bugs, lower jaw pulled forward reveling the lower decaying teeth.', 
                    'What you could call hair on it has become dreaded and would crunch if you could bring yourself to touch it.',
                    'The smell wafts off hitting your nose with a strong fowl smell.'
                ],
                'INTRO': npcList.troll.INTRO,
                'MORE': npcList.troll.MORE,
                'LAST': npcList.troll.LAST
            },
            {
                'LOCATION': 'cave',
                'CHALLENGE': 'bear',
                'DESC': ['You see a Bear is sleeping at the openning of a cave where you are supposed to enter.'],
                'INTRO': npcList.bear.INTRO,
                'MORE': npcList.bear.MORE,
                'LAST': npcList.bear.LAST
            },
            {
                'LOCATION': 'freeway',
                'CHALLENGE': 'bandit',
                'DESC': ['You see a bandit is guarding a blockade on the free way to where your destination is.'],
                'INTRO': npcList.bandit.INTRO,
                'MORE': npcList.bandit.MORE,
                'LAST': npcList.bandit.LAST
            },
        ],
        [
            {
                'LOCATION': 'forrest',
                'CHALLENGE': '',
                'DESC': ['You are in a forrest crossing where you have no idea where to go next.'],
                'INTRO': ['you found something marked on the tree.'],
                'MORE': ['you got lost.'],
                'LAST': ['you got out.']
            },
            {
                'LOCATION': 'underground maze',
                'CHALLENGE': '',
                'DESC': ['You are inside an underground maze where you have no idea where to go next.'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
            {
                'LOCATION': 'ancient city ruin',
                'CHALLENGE': '',
                'DESC': ['You are inside an ancient city ruin where you have no idea where to go next.'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
        ],
        [
            {
                'LOCATION': 'ruin',
                'CHALLENGE': '',
                'DESC': ['Finally you are at the ruin where the stolen treasure is.'],
                'INTRO': ['Before you can take it back. You have to do something'],
                'MORE': ['you failed'],
                'LAST': ['you got it!']
            }
        ]
    ]
};