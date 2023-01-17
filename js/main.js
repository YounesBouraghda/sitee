// DOM => Document Object Model


 
const els = {
    welcomeScreen: null,
    questionScreen: null,
    endScreen: null,
    welcomeBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};
 
let questionIndex = 0;
 
const questions = [{
    question: 'Préférez-vous travailler sur des projets en lien avec le développement d applications ou avec la gestion de systèmes d information?',
    answers: [{
        title: 'Développement d applications',
        house: 'SLAM'
    }, {
        title: 'Gestion de systèmes d information',
        house: 'SISR'
    },]
    },
    {
        question: 'Préférez-vous travailler en mode projet ou en mode maintenance?',
        answers: [{
            title: 'Mode projet',
            house: 'SLAM'
        }, {
            title: 'Mode maintenance',
            house: 'SISR'
        },]
    },
    {
        question: 'Préférez-vous travailler sur des aspects techniques tels que la sécurité et les réseaux ou sur des aspects fonctionnels tels que la gestion de projet et les processus métiers?',
        answers: [{
            title: 'Aspects techniques',
            house: 'SLAM'
        }, {
            title: 'Aspects fonctionnels',
            house: 'SISR'
        },]
    },
    {
        question: 'Préférez-vous travailler sur des projets en utilisant des méthodes agiles ou en utilisant des méthodes plus traditionnelles?',
        answers: [{
            title: 'Méthodes agiles ',
            house: 'SLAM'
        }, {
            title: ' Méthodes traditionnelles',
            house: 'SISR'
        },]
    },
    {
        question: 'Préférez-vous travailler sur des projets en utilisant des technologies web ou des technologies mobile?',
        answers: [{
            title: 'Technologies web ',
            house: 'SISR'
        }, {
            title: 'Technologies mobile',
            house: 'SLAM'
        },]
    },
    {
        question: 'Aimez-vous travailler en équipe et collaborer avec d autres professionnels de l informatique?',
        answers: [{
            title: 'Collaboration ',
            house: 'SISR'
        }, {
            title: 'Autonomie ',
            house: 'SLAM'
        },]
    },
    {
        question: 'Aimez-vous résoudre des problèmes techniques et trouver des solutions innovantes?',
        answers: [{
            title: 'Oui',
            house: 'SLAM'
        }, {
            title: 'Non',
            house: 'SISR'
        },]
    },
    {
        question: 'Aimez-vous apprendre et utiliser de nouvelles technologies pour améliorer vos projets?',
        answers: [{
            title: 'Oui',
            house: 'SLAM'
        }, {
            title: 'Non',
            house: 'SISR'
        },]
    },
];

const recordedAnswers = [];


const init = () => {
    console.log('Page has loaded');

    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const house = target.getAttribute('data-house');
        recordedAnswers.push(house);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const house = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('house', house);

    const houseInFrench = {
        SISR: 'SISR',
        SLAM: 'SLAM'
    };

    els.endScreen.querySelector('span').textContent = houseInFrench[house];
};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-house', answer.house);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.welcomeScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);

