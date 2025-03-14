// "show-answer-button"というIDを持つボタン要素を取得
const showAnswerButton = document.getElementById("show-answer-button");
// "answer"というIDを持つ要素を取得
const answer = document.getElementById("answer");
const correctButton = document.getElementById("correct-button");
const incorrectButton = document.getElementById("incorrect-button");
const numOfCorr = document.getElementById("num-of-corr");
const numOfIncorr = document.getElementById("num-of-incorr");
const button = document.getElementsByClassName("button");

let nOfCorr = 0;
let nOfIncorr = 0;
correctButton.disabled = true;
incorrectButton.disabled = true;

// ボタンがクリックされたときのイベントリスナーを設定
showAnswerButton.onclick = () => {
  // 回答要素の表示スタイルを"block"に変更して表示する
  answer.style.display = "block";
  // ボタン自体の表示スタイルを"none"に変更して非表示にする
  showAnswerButton.style.display = "none";
  //buttonを有効化
  correctButton.disabled = false;
  incorrectButton.disabled = false;
};

correctButton.onclick = () => {
  nOfCorr++;
  numOfCorr.innerHTML = nOfCorr;
  correctButton.disabled = true;
  incorrectButton.disabled = true;
};
incorrectButton.onclick = () => {
  nOfIncorr++;
  numOfIncorr.innerHTML = nOfIncorr;
  correctButton.disabled = true;
  incorrectButton.disabled = true;
}