// Массив вопросов и ответов
const questions = [
    {
        question: 'Вы предпочитаете проводить время...',
        answers: ['В одиночестве', 'С друзьями'],
        type: 'introvert'
    },
    {
        question: 'Когда у вас есть свободное время, вы обычно...',
        answers: ['Читаете книгу или смотрите фильм дома', 'Встречаетесь с друзьями или посещаете мероприятия'],
        type: 'introvert'
    },
    {
        question: 'Как вам больше нравится отдыхать?',
        answers: ['Путешествовать в одиночку или с близким человеком', 'Отправляться в путешествие с большой компанией'],
        type: 'introvert'
    },
    {
        question: 'Что бы вы предпочли делать вечером?',
        images: ['https://images.unsplash.com/photo-1588193809319-70d7fafbe57e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ', 'https://images.unsplash.com/photo-1526948128573-703eeb484658?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'],
        type: 'introvert'
    },
    {
        question: 'Какой вид деятельности вам больше по душе?',
        images: ['https://images.pexels.com/photos/935869/pexels-photo-935869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/207634/pexels-photo-207634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'],
        type: 'introvert'
    }
];

let currentQuestionIndex = 0;
let introvertScore = 0;

function startQuiz() {
    document.querySelector('button').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    // Если все вопросы пройдены, показать результаты
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];

    // Создаем элемент вопроса
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.textContent = question.question;
    quizContainer.appendChild(questionEl);

    // Если вопрос с изображениями
    if (question.images) {
        question.images.forEach((imageUrl, index) => {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'answer';
            radioInput.value = index.toString(); // Значения ответов теперь индексы изображений

            const label = document.createElement('label');
            const imageEl = document.createElement('img');
            imageEl.src = imageUrl;
            imageEl.alt = `Вариант ${index + 1}`;
            imageEl.classList.add('image-option'); // Новый класс для стилей

            label.appendChild(radioInput);
            label.appendChild(imageEl);
            quizContainer.appendChild(label);
        });
    } else {
        // Текстовые ответы
        question.answers.forEach(answer => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = answer;

            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            quizContainer.appendChild(label);
        });
    }

    // Добавляем кнопку "Далее"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Далее';
    quizContainer.appendChild(nextButton);

    nextButton.addEventListener('click', () => {
        const selectedAnswer = quizContainer.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Пожалуйста, выберите ответ.');
            return;
        }

        if (parseInt(selectedAnswer.value) === 0) {
            introvertScore++;
        }

        currentQuestionIndex++;
        renderQuestion();
    });
}

function showResult() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';

    let resultText;
    if (introvertScore > Math.floor(questions.length / 2)) {
        resultText = 'Вы скорее интроверт.';
    } else {
        resultText = 'Вы скорее экстраверт.';
    }
    resultText.concat(' Ваш результат: ', introvertScore, ' из ', questions.length);

    document.getElementById('result-text').textContent = resultText;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    introvertScore = 0;
    document.getElementById('quiz-container').innerHTML = '';
    document.getElementById('result-container').style.display = 'none';
    document.querySelector('button').style.display = 'inline-block';
}

function recordConsultation() {
    window.location.href = 'https://mind-analysis.tilda.ws/';
}
