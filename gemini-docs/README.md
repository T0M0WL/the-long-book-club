# 🤖 The Long Book Club — Gemini & NotebookLM Knowledge Hub

Welcome to your dedicated AI documentation hub. All files in this folder are specifically formatted and maintained for you to share with your **Gemini Agents, Gemini Gems, and NotebookLM** without cluttering the project root.

---

## 📂 Quick File Index & Where to Use Each File

| File | What It Is | Best Used In |
| :--- | :--- | :--- |
| **[`TLBC_Gemini_Agent_Content_Spec.md`](./TLBC_Gemini_Agent_Content_Spec.md)** | **Master Strategy & Content SOP:** The core rulebook covering the 3-stage funnel, 4-tier anti-duplicate copy hierarchy, field character limits, and the complete live 463-book inventory. | **NotebookLM** (Source) & **Gemini Gem** (System Instructions) |
| **[`TLBC_Weekly_Agent_Prompt_Guide.md`](./TLBC_Weekly_Agent_Prompt_Guide.md)** | **Weekly Research Brief Prompt:** The recurring Monday prompt that directs your Gemini agent to propose either a new Collection (Week A) or a new Journal Article (Week B). | **Gemini Chat / Scheduled Automation** (Run every Monday) |
| **[`TLBC_Full_Reviews_For_NotebookLM.md`](./TLBC_Full_Reviews_For_NotebookLM.md)** | **Brand Voice & Review Training:** 59 gold-standard full curator reviews and 3 journal articles demonstrating our signature voice, pacing, and narrator critiques. | **NotebookLM** (Primary Voice & Style Source) |
| **[`TLBC_Complete_Catalog_For_Agent.md`](./TLBC_Complete_Catalog_For_Agent.md)** | **Extended Catalog Database:** Comprehensive markdown reference of books with runtimes, genres, and series notes. | **NotebookLM** (Catalog Reference Source) |
| **[`TLBC_Collections_And_Journal_Directory.md`](./TLBC_Collections_And_Journal_Directory.md)** | **Live Collections & Journal Index:** Complete list of all 17 collections and journal articles so agents never pitch duplicate themes. | **NotebookLM** (Collection Verification Source) |

---

## 🎯 How to Set Up Your External AI Workflow

### 1. NotebookLM (For Research & Review Drafting)
When creating or updating your NotebookLM notebook for *The Long Book Club*:
1. Add **`TLBC_Gemini_Agent_Content_Spec.md`** as a core source (provides the rules, character counts, and live 463-book catalog).
2. Add **`TLBC_Full_Reviews_For_NotebookLM.md`** as the style guide source (teaches the AI how to write in your signature voice).
3. Whenever drafting a new collection or batch of reviews, ask NotebookLM to output entries matching the **Section 6 Copy-Paste Template** inside `TLBC_Gemini_Agent_Content_Spec.md`.

### 2. Gemini Gem / Custom Agent (For Brainstorming & Monday Briefs)
If you have a dedicated Gemini Gem for *The Long Book Club*:
1. In the **Instructions** panel, paste the Core Positioning, Funnel Rules, and Tone from `TLBC_Gemini_Agent_Content_Spec.md`.
2. Every Monday morning, paste the prompt from **`TLBC_Weekly_Agent_Prompt_Guide.md`** to get your weekly editorial proposal delivered directly to your inbox.
