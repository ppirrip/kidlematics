'use strict';

module.exports = {
    'get' : function(wpIndx,location) {
        if (location == undefined) {
            return this.WAY_POINTS[wpIndx];
        } else {
            return this.WAY_POINTS[wpIndx].filter(x => x['LOCATION'] == location)[0];
        }
    },
    'COUNTRY_NAME': 'Kidlematica',
    'PUB_NAME': 'Blind Duck Pub',
    'FINAL_SCENE': 'Castle Ruin',
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
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
            {
                'LOCATION': 'cave',
                'CHALLENGE': 'bear',
                'DESC': ['You see a Bear is sleeping at the openning of a cave where you are supposed to enter.'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
            {
                'LOCATION': 'freeway',
                'CHALLENGE': 'bandit',
                'DESC': ['You see a bandit is guarding a blockade on the free way to where your destination is.'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
        ],
        [
            {
                'LOCATION': 'forrest',
                'CHALLENGE': '',
                'DESC': ['You are in a forrest crossing where to have to decide going left, or right'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
            {
                'LOCATION': 'underground maze',
                'CHALLENGE': '',
                'DESC': ['You are inside an underground maze where to have to decide take the left, or right'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
            {
                'LOCATION': 'ancient city ruin',
                'CHALLENGE': '',
                'DESC': ['You are inside an ancient city ruin where to have to decide going left, or right'],
                'INTRO': [],
                'MORE': [],
                'LAST': []
            },
        ]
    ]
};