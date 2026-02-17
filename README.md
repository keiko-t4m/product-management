# 在庫管理システム

## 概要
JavaScriptでCRUD機能を実装した在庫管理アプリです。
商品の追加・編集・削除・検索機能を実装しています。
IDは5桁の自動採番で、localStorageによりデータを保存しています。

---

## 主な機能
・商品追加  
・商品編集  
・商品削除  
・検索機能  
・5桁固定ID自動生成  
・localStorage保存  

---

## 使用技術
HTML  
CSS  
JavaScript  
localStorage  

---

## ID生成ロジック

IDは `localStorage` に保存された `nextId` をもとに自動採番し、
`padStart()` を使用して5桁固定の文字列として整形しています。

```javascript
function generateId() {
  const id = nextId;
  nextId++;
  localStorage.setItem("nextId", nextId);
  return String(id).padStart(5, "0");
}
```
