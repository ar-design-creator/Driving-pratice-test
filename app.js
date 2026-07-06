const appData = {
  appName: "NY Driver Practice",
  version: "1.0",
  questions: [
    {
      id: 1,
      chapter: "Driver Licenses",
      topic: "License Requirements",
      difficulty: "Easy",
      question: "What must you have to legally drive in New York State?",
      choices: [
        "A valid driver license",
        "A school ID",
        "A passport",
        "A vehicle title"
      ],
      correctAnswer: 0,
      explanation: "New York law requires a valid driver license to operate a motor vehicle."
    },
    {
      id: 2,
      chapter: "Traffic Control",
      topic: "Stop Signs",
      source: "mv21.pdf",
      difficulty: "Easy",
      question: "At a stop sign with a stop line, where must you stop?",
      choices: [
        "Before reaching the stop line",
        "In the middle of the crosswalk",
        "After entering the intersection",
        "Only after other drivers honk"
      ],
      correctAnswer: 0,
      explanation: "At a stop sign, stop before the stop line. If there is no stop line, stop before the crosswalk or before entering the intersection."
    },
    {
      id: 3,
      chapter: "Traffic Control",
      topic: "Traffic Signals",
      source: "mv21.pdf",
      difficulty: "Easy",
      question: "What does a flashing red traffic light mean?",
      choices: [
        "Slow down but keep moving",
        "Stop, yield, and go when it is safe",
        "The lane is closed ahead",
        "Only buses must stop"
      ],
      correctAnswer: 1,
      explanation: "A flashing red light is treated like a stop sign: stop, yield the right-of-way, and continue only when it is safe."
    },
    {
      id: 4,
      chapter: "Traffic Control",
      topic: "Pavement Markings",
      source: "mv21.pdf",
      difficulty: "Medium",
      question: "What do double solid lines between lanes usually mean?",
      choices: [
        "Passing is encouraged",
        "Only trucks may cross them",
        "You cannot pass or change lanes across them",
        "You may cross them anytime at night"
      ],
      correctAnswer: 2,
      explanation: "Double solid lines generally mean you may not pass or change lanes across them, except for allowed left turns into or out of a highway."
    },
    {
      id: 5,
      chapter: "Intersections and Turns",
      topic: "Right-of-Way",
      source: "mv21.pdf",
      difficulty: "Medium",
      question: "At an uncontrolled intersection, two drivers arrive at right angles at the same time. Who must yield?",
      choices: [
        "The driver on the right",
        "The driver on the left",
        "The driver going straight",
        "The driver with the newer vehicle"
      ],
      correctAnswer: 1,
      explanation: "When drivers reach an uncontrolled intersection at the same time from right angles, the driver on the left must yield to the driver on the right."
    },
    {
      id: 6,
      chapter: "Intersections and Turns",
      topic: "Crosswalks",
      source: "mv21.pdf",
      difficulty: "Easy",
      question: "What must drivers do for pedestrians legally using a crosswalk?",
      choices: [
        "Speed up to clear the intersection",
        "Yield and slow down or stop if needed",
        "Honk so the pedestrian moves faster",
        "Yield only if the crosswalk is painted"
      ],
      correctAnswer: 1,
      explanation: "Drivers must yield to pedestrians legally using marked or unmarked crosswalks and must slow down or stop when necessary."
    },
    {
      id: 7,
      chapter: "Passing",
      topic: "Lane Changes",
      source: "mv21.pdf",
      difficulty: "Medium",
      question: "Before changing lanes to pass another vehicle, what should you do?",
      choices: [
        "Signal, check mirrors, and look over your shoulder",
        "Flash your headlights only",
        "Move quickly before checking traffic",
        "Rely only on your rear-view mirror"
      ],
      correctAnswer: 0,
      explanation: "Before passing or changing lanes, signal, check your mirrors, and look over your shoulder because mirrors can leave blind spots."
    },
    {
      id: 8,
      chapter: "Passing",
      topic: "School Buses",
      source: "mv21.pdf",
      difficulty: "Easy",
      question: "When a stopped school bus flashes red lights, what must traffic approaching from either direction do?",
      choices: [
        "Pass slowly if no children are visible",
        "Stop before reaching the bus",
        "Stop only behind the bus",
        "Continue if the road is divided"
      ],
      correctAnswer: 1,
      explanation: "Traffic approaching from either direction must stop for a school bus with flashing red lights, including on divided highways in New York State."
    },
    {
      id: 9,
      chapter: "Defensive Driving",
      topic: "Following Distance",
      source: "mv21.pdf",
      difficulty: "Easy",
      question: "What rule can help you keep a safe space cushion behind another vehicle?",
      choices: [
        "The two-second rule",
        "The five-mile rule",
        "The horn-before-braking rule",
        "The left-lane rule"
      ],
      correctAnswer: 0,
      explanation: "Use the two-second rule in normal conditions, and increase the count in bad weather or when following large trucks."
    },
    {
      id: 10,
      chapter: "Alcohol and Other Drugs",
      topic: "Impaired Driving",
      source: "mv21.pdf",
      difficulty: "Medium",
      question: "How can alcohol affect your driving?",
      choices: [
        "It improves night vision",
        "It reduces reaction time and judgment",
        "It makes speed easier to judge",
        "It prevents glare from headlights"
      ],
      correctAnswer: 1,
      explanation: "Alcohol can slow reaction time, reduce clear vision, and weaken judgment about speed, distance, and safe decisions."
    },
    {
      id: 11,
      chapter: "Special Driving Conditions",
      topic: "Railroad Crossings",
      source: "mv21.pdf",
      difficulty: "Medium",
      question: "At a railroad crossing with flashing red lights or lowered gates, when may you proceed?",
      choices: [
        "As soon as the train passes your lane",
        "When the lights stop and gates are completely raised",
        "After waiting exactly 10 seconds",
        "When the vehicle behind you starts moving"
      ],
      correctAnswer: 1,
      explanation: "Do not cross until the warning lights and bell have stopped and the gates are completely raised."
    }
  ]
};

const state = {
  currentIndex: 0,
  selectedChoice: null,
  correct: 0,
  missed: 0,
  answeredIds: new Set()
};

const els = {
  progressFill: document.querySelector("#progressFill"),
  progressText: document.querySelector("#progressText"),
  correctCount: document.querySelector("#correctCount"),
  missedCount: document.querySelector("#missedCount"),
  restartButton: document.querySelector("#restartButton"),
  chapterLabel: document.querySelector("#chapterLabel"),
  topicLabel: document.querySelector("#topicLabel"),
  difficultyLabel: document.querySelector("#difficultyLabel"),
  questionText: document.querySelector("#questionText"),
  choices: document.querySelector("#choices"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  nextButton: document.querySelector("#nextButton")
};

function currentQuestion() {
  return appData.questions[state.currentIndex];
}

function renderQuestion() {
  const question = currentQuestion();
  const total = appData.questions.length;
  const questionNumber = state.currentIndex + 1;

  state.selectedChoice = null;
  els.chapterLabel.textContent = question.chapter;
  els.topicLabel.textContent = question.topic;
  els.difficultyLabel.textContent = question.difficulty;
  els.questionText.textContent = question.question;
  els.progressText.textContent = `Question ${questionNumber} of ${total}`;
  els.progressFill.style.width = `${((questionNumber - 1) / total) * 100}%`;
  els.nextButton.disabled = true;
  els.nextButton.textContent = questionNumber === total ? "Finish" : "Next";
  els.feedback.hidden = true;
  els.feedback.classList.remove("is-wrong");

  els.choices.innerHTML = "";
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <span class="choice__key">${String.fromCharCode(65 + index)}</span>
      <span class="choice__text"></span>
    `;
    button.querySelector(".choice__text").textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    els.choices.append(button);
  });
}

function selectAnswer(index) {
  const question = currentQuestion();
  const isCorrect = index === question.correctAnswer;
  const questionAlreadyAnswered = state.answeredIds.has(question.id);

  state.selectedChoice = index;
  if (!questionAlreadyAnswered) {
    state.answeredIds.add(question.id);
    if (isCorrect) {
      state.correct += 1;
    } else {
      state.missed += 1;
    }
  }

  Array.from(els.choices.children).forEach((button) => {
    const choiceIndex = Number(button.dataset.index);
    button.disabled = true;
    if (choiceIndex === question.correctAnswer) {
      button.classList.add("is-correct");
    }
    if (choiceIndex === index && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  els.correctCount.textContent = String(state.correct);
  els.missedCount.textContent = String(state.missed);
  els.feedbackTitle.textContent = isCorrect ? "Correct" : "Review this one";
  els.feedbackText.textContent = question.explanation;
  els.feedback.classList.toggle("is-wrong", !isCorrect);
  els.feedback.hidden = false;
  els.nextButton.disabled = false;
  els.progressFill.style.width = `${((state.currentIndex + 1) / appData.questions.length) * 100}%`;
}

function advance() {
  if (state.currentIndex < appData.questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  els.nextButton.disabled = true;
  els.nextButton.textContent = "Complete";
  els.progressText.textContent = `Completed ${appData.questions.length} of ${appData.questions.length}`;
}

function restart() {
  state.currentIndex = 0;
  state.selectedChoice = null;
  state.correct = 0;
  state.missed = 0;
  state.answeredIds.clear();
  els.correctCount.textContent = "0";
  els.missedCount.textContent = "0";
  renderQuestion();
}

els.nextButton.addEventListener("click", advance);
els.restartButton.addEventListener("click", restart);

renderQuestion();
