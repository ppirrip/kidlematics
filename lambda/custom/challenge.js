'use strict';

module.exports = {
    'get': function (n) {
        const q = this.EN_US[n].question;
        const ans = this.EN_US[n].answers;
        const correctIdx = this.EN_US[n].correctIndex;
        return {
            'q': q,
            'a': ans,
            'i': correctIdx
        };
    },
    EN_US : [
        {
            'question': ['I am an odd number; take away an alphabet and I become even. What number am I?'],
            'answers': ['7','6','3','1'],
            'correctIndex': 0
        },
        {
            'question':[
                'I am setting out some snacks for friends coming over.',
                'I have 12 fishes and 10 rabbits.',
                'I want each plate to be identical, with no food left over, what is the greatest number of plates I can prepare?'
            ],
            'answers':['2','60','12','10'],
            'correctIndex':0
        },
        {
            'question':[
                'My mom bought cookbooks and travel books at a book sale.',
                'She spent $52 and bought 8 books.',
                'The cookbooks cost $5 apiece and the travel books cost $9 apiece.',
                'How many of each type of book did the friend buy?'
            ],
            'answers':[
                '5 cookbooks and 3 travel books',
                '3 cookbooks and 5 travel books',
                '9 cookbooks and 2 travel books',
                '1 cookbooks and 10 travel books'                
            ],
            'correctIndex':0
        },
        {
            'question':[
                'We are honouring 9 trolls and 12 goblins as winners of best minion contest.',
                'The plan is to take several group photographs, each with the same combination of trolls and goblins and no one left out.',
                'What is the greatest number of photos that can be taken?'
            ],
            'answers':['3','9','12','36'],
            'correctIndex':0
        },
        {
            'question':[],
            'answers':[],
            'correctIndex':0
        }
    ]
};