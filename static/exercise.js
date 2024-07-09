// "show-answer-button"というIDを持つボタン要素を取得
const showAnswerButton = document.getElementById("show-answer-button");
// "answer"というIDを持つ要素を取得
const answer = document.getElementById("answer");
const correctButton = document.getElementById("correct-button");
const incorrectButton = document.getElementById("incorrect-button");
const numOfCorr = document.getElementById("num-of-corr");
const numOfIncorr = document.getElementById("num-of-incorr");
const button = document.getElementByClass("button");

// ボタンがクリックされたときのイベントリスナーを設定
showAnswerButton.onclick = () => {
  // 回答要素の表示スタイルを"block"に変更して表示する
  answer.style.display = "block";
  // ボタン自体の表示スタイルを"none"に変更して非表示にする
  showAnswerButton.style.display = "none";
};

correctButton.onclick = () => {
  n = 0;
  n++;
  numOfCorr.innerHTML = n;
  button.disabled = true;
};
incorrectButton.onclick = () => {
  n = 0;
  n++;
  numOfIncorr.innerHTML = n;
  button.disabled = true;
}