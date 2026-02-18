# 在庫管理システム

## 概要
在庫管理業務を想定し、商品データの登録・編集・削除・検索機能を実装したCRUDアプリケーションです。

データは localStorage に保存し、ブラウザ上で永続管理できる仕組みを構築しています。
業務効率化を意識し、データの一元管理と検索性向上を目的として設計しました。

---

## 主な機能

- 商品登録
- 商品編集
- 商品削除
- 商品検索（リアルタイム検索）
- 5桁固定IDの自動採番
- localStorageによるデータ永続化
- 全データ初期化機能

---

## 使用技術

- HTML
- CSS（レスポンシブ対応）
- JavaScript（Vanilla JS）
- localStorage

---

## 設計のポイント

### 1. データ管理
- 配列によるデータの一元管理
- JSON形式でlocalStorageに保存

### 2. UI更新の統一
- 再描画関数（render）を用いて画面更新を一元化
- 状態変更後は必ず再描画する構造

### 3. セキュリティ対策
- `innerHTML` を使用せず、`createElement` と `textContent` を使用
- ユーザー入力値を直接HTMLとして解釈しない構造
- インラインイベントを排除し、`addEventListener` に統一

これにより、XSS（クロスサイトスクリプティング）リスクを抑えた実装としています。

### 4. ID自動採番ロジック

`localStorage` に保存された `nextId` を基に採番し、
`padStart()` を使用して5桁固定の文字列に整形しています。

```javascript
function generateId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return String(id).padStart(5, "0");
}
