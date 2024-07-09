// "show-answer-button"というIDを持つボタン要素を取得
const showAnswerButton = document.getElementById("show-answer-button");
// "answer"というIDを持つ要素を取得
const answer = document.getElementById("answer");

// ボタンがクリックされたときのイベントリスナーを設定
showAnswerButton.onclick = () => {
  // 回答要素の表示スタイルを"block"に変更して表示する
  answer.style.display = "block";
  // ボタン自体の表示スタイルを"none"に変更して非表示にする
  showAnswerButton.style.display = "none";
};
