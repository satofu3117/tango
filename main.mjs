import fs from "node:fs";
import express from "express";
import { PrismaClient } from "@prisma/client";
import escapeHTML from "escape-html";

// Expressアプリケーションを作成
const app = express();
// URLエンコードされたデータの解析を有効にする
app.use(express.urlencoded({ extended: true }));
// 静的ファイルの提供ディレクトリを設定
app.use(express.static("static"));
// Prismaクライアントをインスタンス化
const prisma = new PrismaClient();

// インデックステンプレートファイルを読み込む
const indexTemplate = fs.readFileSync("./templates/index.html", "utf-8");

// ルートパスへのGETリクエストを処理
app.get("/", async (request, response) => {
  // データベースからカードデータを取得
  const cards = await prisma.card.findMany();
  // カードデータをHTML形式に変換してテンプレートに埋め込む
  const html = indexTemplate.replace(
    "<!-- cards -->",
    cards
      .map(
        (card) => `
          <tr>
            <td>${escapeHTML(card.question)}</td>
            <td>${escapeHTML(card.answer)}</td>
            <td>
              <form action="/delete" method="post">
                <input type="hidden" name="id" value="${card.id}" />
                <button type="submit">削除</button>
              </form>
            </td>
          </tr>
        `,
      )
      .join(""),
  );
  // HTMLをクライアントに送信
  response.send(html);
});

// エクササイズテンプレートファイルを読み込む
const exerciseTemplate = fs.readFileSync("./templates/exercise.html", "utf-8");

// /exerciseパスへのGETリクエストを処理
app.get("/exercise", async (request, response) => {
  // クエリパラメータのindexを取得し、該当するカードをデータベースから取得
  const card = await prisma.card.findFirst({
    where: { id: { gte: parseInt(request.query.index) || 0 } },
    orderBy: { id: "asc" },
  });
  // 前後のカードをデータベースから取得
  const previousCard = await prisma.card.findFirst({
    where: { id: { lt: card.id } },
    orderBy: { id: "desc" },
  });
  const nextCard = await prisma.card.findFirst({
    where: { id: { gt: card.id } },
    orderBy: { id: "asc" },
  });
  // ナビゲーションリンクを生成
  let controlsHtml = "";
  if (previousCard !== null) {
    controlsHtml += `<a href="/exercise?index=${previousCard.id}">前へ</a>`;
  }
  if (nextCard !== null) {
    controlsHtml += `<a href="/exercise?index=${nextCard.id}">次へ</a>`;
  }
  // テンプレートにカードデータとナビゲーションリンクを埋め込む
  const html = exerciseTemplate
    .replace("<!-- question -->", card.question)
    .replace("<!-- answer -->", card.answer)
    .replace("<!-- controls -->", controlsHtml);
  // HTMLをクライアントに送信
  response.send(html);
});

// /createパスへのPOSTリクエストを処理
app.post("/create", async (request, response) => {
  // フォームデータを使用して新しいカードをデータベースに作成
  await prisma.card.create({
    data: { question: request.body.question, answer: request.body.answer },
  });
  // ルートパスにリダイレクト
  response.redirect("/");
});

// /deleteパスへのPOSTリクエストを処理
app.post("/delete", async (request, response) => {
  // フォームデータを使用して指定されたIDのカードをデータベースから削除
  await prisma.card.delete({ where: { id: parseInt(request.body.id) } });
  // ルートパスにリダイレクト
  response.redirect("/");
});

// ポート3000でサーバーを起動
app.listen(3000);
