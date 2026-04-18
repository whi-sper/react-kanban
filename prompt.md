# Prompts

本文档按时间顺序记录用户在本项目共创过程中发送给 Claude Code 和 Codex 的所有输入，仅收录用户侧内容。

---
## claude code 

### 1. 初始需求（`/plan`）

```
需求：
build a Kanban board React component with the following specs:

1. Three columns: To Do, In Progress, Done
2. Each card shows a title and a colored priority tag (high = red, medium = yellow, low = green)
3. Cards can be moved between columns via a dropdown or drag-and-drop
4. A simple input at the top to add new cards (title + priority select) to the To Do column
5. Persist state to localStorage so cards survive page refresh
有需要确认的请采访我
```

### 2. 对澄清问题的回答

- 项目脚手架：**Vite + React + TypeScript**
- 卡片移动方式：**Drag-and-drop 和 dropdown 同时支持**
- 样式方案：**Plain CSS / CSS Modules**
- 卡片额外功能：**Delete card button**

### 3. 功能验收 + 提交

```
基本功能ok，提交一下代码
```

### 4. 查询远端

```
git remote -v
```

### 5. 授权推送

```
推
```

### 6. Bug 报告

```
发现一个bug，确认并修复：
高危: localStorage 数据完全未做结构校验，坏数据会让应用启动即白屏，而且因为坏数据会持续留在浏览器里，问题会稳定复现。相关位置：
     src/hooks/useLocalStorage.ts:7、src/hooks/useLocalStorage.ts:10、src/components/KanbanBoard.tsx:18、src/components/
     KanbanBoard.tsx:31。
     代码现在直接把 JSON.parse 结果当成 Card[] 用，后续又默认每一项都有合法的 column。一旦存储值不是数组，for (const card of cards)
     会直接抛错；一旦数组里有未知 column，grouped[card.column].push(card) 会因为 grouped[xxx] 是 undefined 而崩溃。

     复现路径:
      2. 把 kanban-cards-v1 改成 {"bad":true}，或者改成 `[{"id":"1","title":"x","priority":"high","column":"archived"}]``。
```

### 7. 提交 bug 修复

```
提交
```

### 8. 推送 bug 修复

```
推送
```

### 9. 更新文档

```
根据实际代码功能，更新readme
```

### 10. 确认 README，提交

```
good!提交
```

## codex

### 11. 代码 Review

```
review代码,找出潜在的高优缺陷,并给出复现路径
```

### 12. 追问第一个高危问题

```
第一个高危问题的复现路径是什么?
```
