 const quizData = 
 [
  {
    question: "What is the main purpose of Java Virtual Machine (JVM)?",
    options: [
        "To compile Java source code",
        "To execute Java bytecode",
        "To interpret Java source code",
        "To optimize Java applications"
    ],
    correctAnswer: "To execute Java bytecode"
},
{
    question: "Explain the difference between '== 'and 'equals()' in Java.",
    options: [
        "They are the same and can be used interchangeably",
        "'==' compares object references, 'equals()' compares object content",
        "'==' is used for primitive types, 'equals()' for objects",
        "There is no difference between them"
    ],
    correctAnswer: "'==' compares object references, 'equals()' compares object content"
},
{
    question: "What is the purpose of the 'final' keyword in Java?",
    options: [
        "To indicate the end of a program",
        "To specify that a class cannot be extended, a method cannot be overridden, or a variable cannot be changed",
        "To declare a constant",
        "To mark a method as abstract"
    ],
    correctAnswer: "To specify that a class cannot be extended, a method cannot be overridden, or a variable cannot be changed"
},
{
    question: "What is the difference between 'ArrayList' and 'LinkedList' in Java?",
    options: [
        "ArrayList is synchronized, LinkedList is not",
        "ArrayList allows random access, LinkedList allows sequential access",
        "ArrayList is more memory-efficient than LinkedList",
        "There is no difference between them"
    ],
    correctAnswer: "ArrayList allows random access, LinkedList allows sequential access"
},
{
    question: "Explain the concept of method overloading in Java.",
    options: [
        "It allows a method to be overridden by a subclass",
        "It allows a method to have multiple implementations with different parameter types or numbers",
        "It allows a method to call another method",
        "It allows a method to be declared in multiple classes"
    ],
    correctAnswer: "It allows a method to have multiple implementations with different parameter types or numbers"
}
  ];
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].correctAnswer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].correctAnswer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:
      ${incorrectAnswersHtml}</p>
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
