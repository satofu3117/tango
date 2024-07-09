const showAnswerButton = document.getElementById("show-answer-button");
const answer = document.getElementById("answer");
const correctButton = document.getElementById("correct-button");
const incorrectButton = document.getElementById("incorrect-button");
const numOfCorr = document.getElementById("num-of-corr");
const numOfIncorr = document.getElementById("num-of-incorr");

showAnswerButton.onclick = () => {
  answer.style.display = "block";
  showAnswerButton.style.display = "none";
};

correctButton.onclick = () => {
  n = 0;
  n++;
  numOfCorr.innerHTML = n;
};
incorrectButton.onclick = () => {
  n = 0;
  n++;
  numOfIncorr.innerHTML = n;
}