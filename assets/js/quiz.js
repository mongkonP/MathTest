"use strict";

/** สร้างเลขจำนวนเต็มแบบรวมค่าต่ำสุดและสูงสุด */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * จัดการหน้าแบบทดสอบที่มีโจทย์คำนวณ
 * แต่ละข้อกำหนด generate() สำหรับข้อมูล และ answer(values) สำหรับคำตอบ
 */
class GeometryQuiz {
  constructor({ questions, containerId = "quizQuestions" }) {
    this.questions = questions;
    this.container = document.getElementById(containerId);
    this.values = [];

    if (!this.container) {
      throw new Error(`ไม่พบพื้นที่แสดงแบบทดสอบ: #${containerId}`);
    }
  }

  start() {
    this.newQuestions();
  }

  newQuestions() {
    this.values = this.questions.map((question) => question.generate());
    this.container.innerHTML = this.questions
      .map((question, index) => this.createQuestion(question, index))
      .join("");

    this.container.querySelectorAll("[data-check-answer]").forEach((button) => {
      button.addEventListener("click", () =>
        this.checkAnswer(Number(button.dataset.checkAnswer)),
      );
    });
  }

  createQuestion(question, index) {
    const number = index + 1;
    const inputId = `answer-${number}`;
    const values = this.values[index];
    const hint = question.hint
      ? `<small class="quiz-hint">${question.hint}</small>`
      : "";

    return `
            <section class="panel panel-default quiz-panel">
                <div class="panel-body">
                    <p class="quiz-question"><strong>${number}.</strong> ${question.prompt(values)} ${hint}</p>
                    <div class="quiz-answer-row">
                        <div class="form-group">
                            <label for="${inputId}">ตอบ:</label>
                            <input id="${inputId}" class="form-control" type="number" step="any" inputmode="decimal">
                        </div>
                        <button type="button" class="btn btn-success" data-check-answer="${index}">เช็คคำตอบ</button>
                        <span id="result-${number}" class="label result-label" aria-live="polite"></span>
                    </div>
                </div>
            </section>`;
  }

  checkAnswer(index) {
    const number = index + 1;
    const input = document.getElementById(`answer-${number}`);
    const result = document.getElementById(`result-${number}`);
    const answer = Number(input.value);
    const correct = this.questions[index].answer(this.values[index]);
    const tolerance = this.questions[index].tolerance ?? 0.01;
    const isCorrect =
      input.value.trim() !== "" &&
      Number.isFinite(answer) &&
      Math.abs(answer - correct) <= tolerance;

    result.textContent = isCorrect ? "ถูกต้อง" : "ผิด";
    result.className = `label result-label ${isCorrect ? "label-success" : "label-danger"}`;
  }
}

window.GeometryQuiz = GeometryQuiz;
window.randomInt = randomInt;
