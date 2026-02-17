# 商品管理システム（ポートフォリオ）

## ■ 概要
JavaScriptで開発した商品管理アプリケーションです。  
商品の登録・編集・削除・検索機能を実装し、  
localStorageを使用してデータの永続化を行っています。

GitHub Pagesで公開しています。

---

## ■ デモURL
(https://keiko-t4m.github.io/steamship-product-management/)

---

## ■ 主な機能

- 商品の新規登録
- 編集・削除（CRUD機能）
- リアルタイム検索機能
- 半角数字バリデーション
- Enterキーでの登録操作
- localStorageによるデータ保存
- 一意IDによるデータ管理
- IDの5桁フォーマット表示（padStart使用）

---

## ■ 技術スタック

- HTML
- CSS
- JavaScript（DOM操作）
- localStorage

---
🎯 実装のポイント
① ID自動採番（5桁固定表示）
次のように padStart() を使用し、IDを5桁表示にしています。
function generateId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return String(id).padStart(5, "0");
}
nextIdを管理し、連番を生成
padStart() を使用し「00001」の形式で表示
nextIdをlocalStorageに保存し、リロード後も番号が継続
② 実務を意識したUI設計
ID列を細く調整し、主情報を強調
数値（価格・数量）を右寄せして可読性向上
色数を抑えたフラットデザイン
立体感を排除した業務システム寄りのボタン設計
③ データ永続化
localStorageを使用してデータ保存
ページリロード後も状態を保持

---
🚀 今後の改善予定
並び替え機能の追加
合計金額の自動計算
バリデーション強化
ダークモード対応

---
📌 制作背景
CRUD処理の理解を深めることを目的に制作しました。
単なる機能実装にとどまらず、「実務で使われる管理画面」を意識した設計を行いました。
特に、情報の優先順位・視認性・過度な装飾を避けたUI設計を重視しています。
自治体向けの商品管理システムを想定し、
実務を意識した設計で実装しました。
データ管理の整合性や再描画処理を意識して設計しています。
