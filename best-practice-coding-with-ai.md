---
description: Best Practice Coding with AI - Full Stack Web Developer Workflow
---

# 🚀 Best Practice Coding with AI (2026)

Workflow komprehensif untuk full-stack web development menggunakan AI sebagai coding assistant.
Alur linear dari **IDE** sampai **DEPLOYMENT** dengan cabang-cabang pendukung yang disisipkan sesuai kondisi.

> **📚 Validated by Research & Industry Practice**
> Workflow ini telah divalidasi dengan riset akademis (Haseeb et al. 2025, MASAI, CodePlan, HyperAgent) dan praktik industri (Addy Osmani, Anthropic, JetBrains, StackOverflow Survey 2024).

---

## ⚠️ PENTING: Prinsip Inti & Peringatan

### Prinsip Inti (Evidence-Based)

| Prinsip | Penjelasan | Sumber |
|---------|------------|--------|
| **Human-in-the-Loop WAJIB** | AI adalah "copilot", bukan "autopilot". Selalu review output AI. | Addy Osmani, Anthropic |
| **Plan → Small Tasks → Verify** | Breakdown ke tugas kecil, kerjakan satu per satu, verifikasi setiap langkah | Agile/TDD, JetBrains |
| **Context > Prompting** | Context engineering lebih krusial dari prompt engineering untuk agents | Anthropic (lihat diagram) |
| **Multi-Agent Supervised** | Agent bekerja baik dengan pengawasan, bukan autonomous penuh | Haseeb et al. 2025 |

### ⚠️ Klaim Tidak Realistis yang Harus Dihindari

| Klaim Tidak Realistis | Realita |
|-----------------------|---------|
| "AI 100% mengganti developer" | AI amplify, bukan replace. Human oversight wajib. |
| "Kode AI langsung production-ready" | SELALU butuh review, testing, dan iterasi |
| "Lebih cepat tanpa verifikasi" | METR study: -19% productivity tanpa proper review |
| "Semua fitur otomatis berfungsi" | Perlu tuning, iterasi, dan fallback plan |

### Fallback Plan (Jika AI Gagal)

```
IF (AI gagal / hasil tidak sesuai):
    |
    +--> 1. Review konteks yang diberikan (cukup lengkap?)
    |
    +--> 2. Pecah ke task lebih kecil
    |
    +--> 3. Reset conversation, mulai fresh
    |
    +--> 4. Switch model (Claude <-> Gemini <-> GPT)
    |
    +--> 5. FALLBACK: Kerjakan manual dengan AI sebagai assistant
```

### ⚠️ Vibe Coding Caution (ArXiv 2025)

> **Warning:** Paper ArXiv 2025 menemukan 970+ vulnerabilities di vibe-coded apps!

| Vibe Coding | Realita |
|-------------|---------|
| Cepat untuk MVP/prototype | ✅ Bagus untuk validasi ide |
| Langsung production | ❌ Tech debt tinggi, security nightmare |
| "Ship fast = profit" | ⚠️ Tanpa review = maintenance hell |
| Scale tanpa refactor | ❌ Sulit maintainnya |

**Best Practice:**
- Vibe coding untuk **prototype/MVP** saja
- Production butuh **human ownership 100%**
- Jika tidak bisa/mau tulis code: **hire dev** atau gunakan **no-code untuk production**

### 👤 Adaptasi Berdasarkan Skill Level

```
PILIH APPROACH SESUAI LEVEL
     |
     +--> BEGINNER / NON-CODER
     |    --> Vibe coding + No-code tools (Bubble/Softr)
     |    --> AI untuk custom logic saja
     |    --> Wajib hire dev untuk production
     |
     +--> INTERMEDIATE
     |    --> Rules file + Context files untuk konsistensi
     |    --> Human review 30% waktu
     |    --> Belajar debugging AI output
     |
     +--> ADVANCED / PRO
          --> Full agentic (multi-sub-agents)
          --> Parallel agents dengan git worktrees
          --> Custom MCP servers
```

| Level | Rekomendasi | Waktu Review |
|-------|-------------|--------------|
| Beginner | Vibe + No-code | 50%+ (atau hire dev) |
| Intermediate | Rules + Context | 30% |
| Advanced | Full Agentic | 20% (spot check) |

---

## 📊 MASTER WORKFLOW OVERVIEW

```
+-----------------------------------------------------------------------------+
|                     MASTER WORKFLOW FLOW (2026 Edition)                      |
+-----------------------------------------------------------------------------+
|                                                                              |
|  START --> PHASE 0: SETUP --> DISCOVERY --> DOCUMENTATION --> RANCANGAN     |
|                |                  |               |              |           |
|                |                  |               |              |           |
|           [Model AI]         [Prompting]      [Rules]        [Context]       |
|           [Tools AI]         [Multi-AI]                      [MCP/Tools]     |
|           [MCP Setup]                                                        |
|                                                                              |
|  --> DEVELOPMENT --> VERIFICATION & TESTING --> DEPLOYMENT --> ITERATION    |
|           |                    |                                             |
|           |                    +--> [Agentic Review]                         |
|       [IDE Mode]               +--> [Auto Testing]                           |
|       [Prompting]              +--> [Human Review]                           |
|                                                                              |
|  --> BACK TO PHASE 1: DISCOVERY (Feedback Loop)                              |
|                                                                              |
+-----------------------------------------------------------------------------+
```

---

# 🔵 PHASE 0: SETUP ENVIRONMENT

Sebelum memulai project apapun, pastikan environment siap.

## 0.1 IDE Setup

```
+---------------------------------------------------------------+
|                        IDE SETUP                               |
+---------------------------------------------------------------+
                              |
              +---------------+---------------+
              |                               |
              v                               v
     +-----------------+           +---------------------+
     | PILIH IDE       |           | PILIH MODE          |
     +-----------------+           +---------------------+
              |                               |
              v                               v
     +-----------------+           +---------------------+
     | - Cursor        |           | - Chat (diskusi)    |
     | - Windsurf      |           | - Inline (coding)   |
     | - Antigravity   |           | - Vision (UI review)|
     | - Cody/Continue |           | - Agentic (auto)    |
     +-----------------+           +---------------------+
```

## 0.2 Pemilihan Model AI

Pilih model berdasarkan task complexity dan budget.

### Gratis / Semi-Gratis (Starter)

| Model                  | Best For                 | Catatan                           |
|------------------------|--------------------------|-----------------------------------|
| Gemini 3 Flash/Low     | Quick tasks, context besar| Hemat token, gratis tier generous |
| Claude Sonnet          | General coding           | Good balance speed/quality        |
| GPT-4o-mini            | Balanced reasoning       | Fast, cheap                       |

### Premium / Top-Tier (Recommended untuk Pro)

| Model                    | Best For                   | Catatan                     |
|--------------------------|----------------------------|-----------------------------|
| Claude Opus 4.5/Thinking | Agentic, heavy tasks       | Best allrounder per dev di X|
| Gemini 3 Pro             | High-context, large codebases| Excellent for big projects|
| GPT-5.2 High             | Depth, complex bugfixing   | Strong reasoning            |
| o1/o3                    | Advanced reasoning         | For complex architecture    |

### Kriteria Pemilihan Model

```
+---------------------------------------------------------------+
| DECISION: Task Type?                                           |
+---------------------------------------------------------------+
                              |
         +--------------------+--------------------+
         |                    |                    |
         v                    v                    v
   +-----------+        +-----------+        +-----------+
   | PLANNING  |        |  CODING   |        | DEBUGGING |
   | AGENTIC   |        | IMPLEMENT |        | COMPLEX   |
   +-----------+        +-----------+        +-----------+
         |                    |                    |
         v                    v                    v
   +-----------+        +-----------+        +-----------+
   |  Claude   |        |  Gemini   |        |  GPT/o1   |
   |  Opus     |        |  3 Pro    |        |  Claude   |
   +-----------+        +-----------+        +-----------+
```

## 0.3 Tools AI (IDE & Extensions)

### Gratis / Starter

| Tool                   | Deskripsi                | Best For           |
|------------------------|--------------------------|---------------------|
| Antigravity (VS Code)  | AI integration sederhana | Newbie, learning    |
| GitHub Copilot Free    | Autocomplete             | Basic coding        |
| Continue               | Open source AI assistant | Privacy-conscious   |

### Premium / Top-Tier (Worth Trial) - 2026 Reality

| Tool        | Type           | Harga    | Best For                          | Notes dari Dev Experiences       |
|-------------|----------------|----------|-----------------------------------|----------------------------------|
| Cursor      | IDE (VS Code)  | $20/mo   | Solo/indie, fast prototyping      | Dominan, human-like partner      |
| Windsurf    | IDE (Codeium)  | $15/mo   | Large codebases, enterprise       | Proprietary models (SWE-1.5)     |
| Claude Code | CLI Agentic    | ~$100/mo | Terminal workflows, parallel      | Strong sub-agents/hooks          |
| Cline       | Extension/CLI  | Free/Pro | Transparent step-by-step          | Great debugging, MCP heavy       |

### Tips Setup

```
+---------------------------------------------------------------+
|                    RECOMMENDED PATH                            |
+---------------------------------------------------------------+
|                                                                |
|  1. START GRATIS                                               |
|     --> Antigravity + Gemini Flash + Claude Sonnet Free        |
|                                                                |
|  2. UPGRADE SAAT SIAP                                          |
|     --> Cursor ($20/mo) + Claude Opus + Gemini Pro             |
|         Worth it: ROI cepat via waktu hemat                    |
|                                                                |
|  3. PRO SETUP (Large Projects)                                 |
|     --> Claude Code + MCP + Full agentic workflow              |
|                                                                |
+---------------------------------------------------------------+
```

> **💡 Tip:** Jangan ragu coba trial berbayar (7-14 hari). Banyak dev bilang "unbeatable" untuk vibe/agentic coding setelah coba premium.

> **⚠️ Realita Budget:** Tidak semua orang bisa langsung upgrade. MIT 2025 study juga tunjukkan AI tools bisa slowdown experienced dev 19% karena review overhead. Mulai gratis, upgrade saat ROI jelas.

### 💰 Cost & Rate Limit Management

| Strategi | Penjelasan |
|----------|------------|
| **Track token usage** | Monitor via dashboard (Cursor/Claude) untuk hindari surprise bills |
| **Switch model dinamis** | Flash/Sonnet untuk inline autocomplete, Opus untuk complex reasoning |
| **Batasi context size** | Jangan dump semua file — curate yang relevan saja |
| **Set daily/weekly limits** | Hindari over-spending, terutama saat learning |

```
COST-EFFICIENT MODEL ROUTING
     |
     +--> QUICK TASKS (autocomplete, typo fix)
     |    --> Gemini Flash / GPT-4o-mini (cheap, fast)
     |
     +--> STANDARD CODING (implement features)
     |    --> Claude Sonnet / Gemini Pro (balanced)
     |
     +--> COMPLEX (architecture, debugging, agentic)
          --> Claude Opus / o1 (expensive but worth it)
```

**Token Hemat Tips (dari @mattpocockuk):**
- Tambah "Be extremely concise" di rules file
- English prompts 30-50% lebih hemat vs bahasa lain
- Summarize context daripada dump full file

## 0.4 MCP (Model Context Protocol)

MCP adalah standar terbuka (dari Anthropic) untuk menghubungkan AI agents ke tools eksternal.
Ini seperti "USB-C untuk AI tools" — satu integrasi bisa kerja di semua IDE/agent.

### Tujuan Utama MCP

```
+---------------------------------------------------------------+
|                    TUJUAN UTAMA MCP                            |
+---------------------------------------------------------------+
|                                                                |
|  1. ATASI KNOWLEDGE CUT-OFF DATE                               |
|     --> Fetch data/docs real-time (model punya batas waktu)    |
|                                                                |
|  2. BERI "TOOLS" KE AGENT                                      |
|     --> Browser control, testing, research                     |
|                                                                |
|  3. ENABLE MULTI-AGENT / SUB-AGENTS                            |
|     --> Parallel tasks, specialized roles                      |
|                                                                |
+---------------------------------------------------------------+
```

### Kategori 1: Atasi Cut-off Date & Research

| Server      | Fungsi                                      | Use Case                              |
|-------------|---------------------------------------------|---------------------------------------|
| Context7    | Fetch up-to-date docs/library               | React/Next.js API terbaru, hindari deprecated |
| Firecrawl   | Crawl website --> markdown clean            | Scrape docs/tutorial ke context besar |
| Exa         | Semantic search AI-focused                  | Research code examples terbaru        |
| Perplexity  | Web search + summarize                      | Riset cepat dengan source             |

**Contoh penggunaan:**
```
"Use context7 to fetch latest Next.js 15 App Router docs"
"Crawl this documentation site with firecrawl for reference"
```

### Kategori 2: Auto Testing & Browser Interaction

| Server          | Fungsi                                    | Use Case                           |
|-----------------|-------------------------------------------|------------------------------------|
| Chrome DevTools | Control live Chrome (inspect, automate)   | Verify fix, debug frontend, LCP audit |
| Playwright MCP  | Headless browser testing                  | CI testing, lebih stabil           |
| TestSprite      | Automated testing                         | Generate & run tests               |

**Chrome DevTools capabilities:**
- Inspect console/network/DOM
- Automate user flows (click, form)
- Performance audit (LCP, CLS)
- Verify fix langsung di browser

### Kategori 3: Database & Backend Tools

| Server      | Fungsi                    | Use Case                           |
|-------------|---------------------------|-------------------------------------|
| Supabase    | Database operations       | CRUD, RLS, migrations               |
| Firebase    | Firebase integration      | Firestore, Auth, Functions          |
| Linear      | Project management        | Create issues, track progress       |

### Kategori 4: Multi-Agent / Advanced Workflows

```
MULTI-AGENT WORKFLOWS
     |
     +--> Sub-agents (specialized roles)
     |    --> Planning agent + Implement agent + Review agent
     |
     +--> Parallel agents (non-conflicting tasks)
     |    --> Git worktrees + multiple sessions
     |
     +--> Custom MCP servers
          --> Bangun sendiri untuk Figma, internal tools
```

### Tips Praktis MCP

| Tip                          | Penjelasan                                    |
|------------------------------|-----------------------------------------------|
| Mulai di Cursor/Claude Code  | Tambah MCP via settings/mcp.json              |
| Security first               | Permissions strict, isolated Chrome profile   |
| Hemat token                  | Gunakan hanya saat butuh, jangan always-on    |
| Test locally first           | Pastikan MCP server jalan sebelum production  |

**Setup MCP di Antigravity:**
```json
// mcp_config.json
{
  "mcpServers": {
    "context7": { "command": "npx", "args": ["-y", "@context7/mcp"] },
    "firecrawl": { "command": "npx", "args": ["-y", "firecrawl-mcp"] }
  }
}
```

## 0.5 Rules (Aturan, Perintah, dan Larangan)

Rules adalah file reusable yang di-load setiap session untuk enforce standards dan hindari "hallucination" atau bad code.
Simpan di `.cursor/rules.md`, `clinerules`, `rules.md`, atau `CLAUDE.md` — version control via Git untuk team.

### Setup dan Management Rules

```
RULES MANAGEMENT
     |
     +--> Buat file reusable
     |    --> .cursor/rules.md atau clinerules (Git version control)
     |
     +--> Iterate secara berkala
     |    --> Review & update rules berdasarkan output AI
     |
     +--> Load setiap session
          --> Sertakan di system prompt atau /rules command
```

### Kategori 1: General Workflow Rules (Perintah Umum)

| Rule                                  | Penjelasan                                      |
|---------------------------------------|-------------------------------------------------|
| Plan dulu sebelum code                | Buat 2-3 implementation plans, pilih satu       |
| Task scoping                          | Pilih task tidak terlalu besar/kecil            |
| Full intent upfront                   | Jelaskan goals, constraints, why                |
| Jangan npm run build tanpa instruksi  | Fokus code gen, bukan execution                 |
| Minta konfirmasi untuk destructive ops| Hapus file, drop table, dll perlu approval      |

### Kategori 2: Code Quality Rules (Kualitas Kode)

| Rule                                  | Penjelasan                                      |
|---------------------------------------|-------------------------------------------------|
| Gunakan components/UI tersedia        | Hindari reinvent wheel, ikuti patterns          |
| Check linters sebelum final           | eslint, php checker, ts-check                   |
| TS: No type 'any'                     | Infer types atau gunakan unknown                |
| Ikuti SOLID, DRY, KISS                | Clean code principles                           |
| Batasi file/function size             | Auto-refactor jika terlalu besar                |
| Remove dead code                      | Unused vars/imports, clean up otomatis          |

### Kategori 3: Security dan Verification Rules

| Rule                                  | Penjelasan                                      |
|---------------------------------------|-------------------------------------------------|
| Dependency checks                     | Hindari insecure/outdated libs                  |
| No hardcoded secrets                  | Gunakan env vars atau secrets manager           |
| SQL/Input safety                      | Fix SQL injection, sanitize user input          |
| Self-verification                     | Run tests/lint/compile sebelum show code        |
| Jika ragu, verifikasi di internet     | Gunakan MCP (Context7/Firecrawl/Exa)            |

### Kategori 4: Advanced/Agent-Specific Rules

| Rule                                  | Penjelasan                                      |
|---------------------------------------|-------------------------------------------------|
| Minimal changes                       | Hanya edit yang diperlukan, no over-engineering |
| No extras tanpa instruksi             | No logging/TODOs/comments unless specified      |
| Context management                    | Summarize jika window penuh                     |
| Parallel agents                       | Scope non-overlapping, 1-3 agents max           |

### Template Rules File Lengkap

```markdown
# Project Rules

## 📋 GENERAL WORKFLOW
- Plan dulu sebelum code (2-3 options, breakdown steps)
- Jelaskan semua perubahan yang dilakukan
- Jangan npm run build kecuali diinstruksikan
- Minta konfirmasi untuk operasi destructive (hapus file, drop table)
- Jika task terlalu besar, breakdown ke sub-tasks

## ❌ JANGAN (Don'ts)
- Jangan gunakan `type: any` di TypeScript
- Jangan hapus file tanpa konfirmasi
- Jangan commit langsung ke main
- Jangan hardcode secrets/credentials
- Jangan over-engineer atau add extras tanpa instruksi
- Jangan abaikan linter warnings

## ✅ LAKUKAN (Do's)
- Selalu gunakan component UI yang tersedia
- Check eslint/linter sebelum selesai
- Ikuti patterns yang sudah ada di codebase
- Gunakan env vars untuk secrets
- Self-verify: run tests sebelum submit
- Jika ragu, verifikasi di internet (use MCP tools)

## 📦 TECH STACK
[Isi sesuai project - Frontend, Backend, Database]

## 🎨 CODE STYLE
[Isi sesuai preferensi - naming conventions, formatting]

## 🔗 REFERENCES
- Refer to prd.md for requirements
- Refer to database.md for schema
- Refer to architecture.md for system design
```

> **💡 Tip:** Iterate rules secara berkala. Developer sukses refine rules 50-100+ kali untuk optimize AI output.

---

# 🟡 PHASE 1: DISCOVERY & VALIDATION

**Tujuan:** Memahami masalah, validasi solusi, sebelum menulis satu baris code pun.

## 1.1 Multi-Model AI Chaining untuk Brainstorming

```
+---------------------------------------------------------------+
|               MULTI-MODEL AI CHAINING                          |
+---------------------------------------------------------------+
                              |
                              v
              +-------------------------------+
              |  STEP 1: BRAINSTORMING        |
              |  Model: Gemini/Claude/ChatGPT |
              |  Mode: Thinking/Deep Research |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  STEP 2: RISET REALITA        |
              |  Model: Grok/Gemini           |
              |  Task: Cari testimoni user,   |
              |  review kompetitor, Reddit/X  |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  STEP 3: VALIDASI ILMIAH      |
              |  Model: Perplexity/Claude     |
              |  Task: Data pasar, tren,      |
              |  Google Trends, studi kasus   |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  STEP 4: SYNTHESIS            |
              |  Model: Gemini/Claude         |
              |  Task: Rangkum jadi dokumen   |
              |  Needs, Pains, Gains          |
              +-------------------------------+
```

## 1.2 Identifikasi Kebutuhan (Framework JTBD)

| Kategori | Deskripsi                     | Contoh                         |
|----------|-------------------------------|--------------------------------|
| Needs    | Fitur wajib yang harus ada    | Login, dashboard, payment      |
| Pains    | Pain points user saat ini     | Proses manual lambat, UI ribet |
| Gains    | Outcome ideal yang diinginkan | Hemat waktu 50%, revenue naik  |

## 1.3 Riset Solusi

```
RISET SOLUSI
     |
     +--> Kompetitor Analysis (5-10 website serupa)
     |    --> Screenshot, catat kekuatan/kelemahan
     |
     +--> Market Validation
     |    --> Search volume, Reddit threads, X discussions
     |
     +--> Tech Feasibility
          --> Pilih stack berdasarkan timeline, budget, skill
```

### 🔗 [CABANG: PROMPTING] — Digunakan di sini

Saat berkomunikasi dengan AI untuk brainstorming:

```
+---------------------------------------------------------------+
|                    PROMPTING BEST PRACTICES                    |
+---------------------------------------------------------------+
|                                                                |
|  1. ENGLISH FIRST (Better output, hemat token 30-50%)          |
|     --> Jika limited: Draft ID -> Translate -> Prompt EN       |
|                                                                |
|  2. ROLE PROMPTING                                             |
|     --> "You are a senior product manager at a SaaS company"   |
|                                                                |
|  3. CHAIN OF THOUGHT                                           |
|     --> "Think step by step. Plan first before executing."     |
|                                                                |
|  4. STRUCTURED INPUT (XML/Markdown)                            |
|     --> <instructions>...</instructions>                       |
|                                                                |
+---------------------------------------------------------------+
```

---

# 🟢 PHASE 2: DOCUMENTATION (PRD)

**Tujuan:** Dokumentasikan semua requirement sebelum coding.

## 2.1 Required Documentation

```
+---------------------------------------------------------------+
|                    REQUIRED DOCS                               |
+---------------------------------------------------------------+
|                                                                |
|  prd.md -----------> Requirement & User Stories                |
|  backend.md -------> Folder structure, logic, API              |
|  database.md ------> Schema & Tables                           |
|  frontend.md ------> Reference, slicing guide                  |
|  architecture.md --> Techstack, Flow Sistem                    |
|  api.md -----------> Routes/Endpoints                          |
|  security.md ------> Auth, permission, testing plan            |
|                                                                |
+---------------------------------------------------------------+
```

## 2.2 PRD.md Template

```markdown
# Product Requirements Document

## 1. Overview
[Deskripsi singkat produk]

## 2. User Personas
- Persona A: [Deskripsi]
- Persona B: [Deskripsi]

## 3. User Stories
- As a [user], I want to [action] so that [benefit]

## 4. Tech Stack
- Frontend: [...]
- Backend: [...]
- Database: [...]

## 5. Fitur Utama
1. [Fitur 1]
2. [Fitur 2]

## 6. Timeline
- Week 1: [...]
- Week 2: [...]
```

### 🔗 [CABANG: RULES] — Digunakan di sini

Setelah PRD selesai, update Rules file dengan konteks project:

```
rules.md
    |
    +--> Tambahkan Tech Stack spesifik
    +--> Tambahkan Code Style preferences
    +--> Tambahkan Do's & Don'ts spesifik project
    +--> Link ke PRD: "Refer to prd.md for requirements"
```

---

# 🟠 PHASE 3: RANCANGAN (Design & Architecture)

**Tujuan:** Design sistem sebelum implementasi.

## 3.1 Alur Sistem

```
ALUR SISTEM
     |
     +--> Proses Bisnis End-to-End
     |    --> Gambar flowchart high-level
     |
     +--> User Flow & Journey Map
     |    --> Dari landing -> signup -> use feature -> exit
     |
     +--> Input -> Process -> Output
          --> Untuk setiap fitur utama
```

## 3.2 Database Design

```
DATABASE DESIGN
     |
     +--> Relasi Tabel
     |    --> ERD sederhana (bisa minta AI generate)
     |
     +--> Normalization
     |    --> Pastikan tidak ada redundant data
     |
     +--> Schema Final
          --> Definisi columns, types, constraints
```

## 3.3 Tech Stack Decision

### 🔗 [CABANG: CONTEXT MANAGEMENT] — Decision Point di sini

Context adalah "RAM" finite untuk AI. Treat seperti resource terbatas — curate high-signal tokens, hindari rot/poisoning.

#### Decision: Unlimited Token AI & Model Terbaik?

```
+---------------------------------------------------------------+
| DECISION: Unlimited Token AI & Model Terbaik?                  |
+---------------------------------------------------------------+
                              |
              +---------------+---------------+
              |                               |
            TIDAK                            YA
              |                               |
              v                               v
+-------------------------+     +---------------------------------+
| APPROACH:               |     | APPROACH:                       |
| Focus per Fitur/Design  |     | Skill Layer Method              |
|                         |     |                                 |
| - Model dasar (Sonnet/  |     | - Full vibe coding              |
|   Flash) untuk pahami   |     | - Cocok large codebases         |
|   limits (128K tokens)  |     | - Higher cost, hemat waktu      |
| - MVP < 4 minggu        |     | - Structured prompts wajib      |
| - Hemat token           |     |                                 |
+-------------------------+     +---------------------------------+
```

#### Skill Layer Method (Untuk Unlimited Token)

| Layer        | Deskripsi                                      |
|--------------|------------------------------------------------|
| Open Claude  | Mulai dengan basic Claude/Gemini               |
| SuperClaude  | Layer ke advanced dengan custom skills/tools   |
| BMAD Method  | Build-Measure-Analyze-Deploy (iterative curation)|
| Superpowers  | Long-horizon via sub-agents, dynamic retrieval |

#### 4 Pillars Context Engineering (2026 Best Practice)

```
4 PILLARS CONTEXT ENGINEERING
     |
     +--> 1. WRITING CONTEXT (Save di luar window)
     |    --> Scratch pads, notes, vector DBs untuk persist
     |
     +--> 2. SELECTING CONTEXT (Pull relevant saja)
     |    --> Smart tool selection via RAG, MCP/Context7/Exa
     |
     +--> 3. COMPRESSING CONTEXT (Retain esensial)
     |    --> Auto-summarization, trimming heuristics
     |
     +--> 4. ISOLATING CONTEXT (Split spaces)
          --> Multi-agent (sub-agents punya window sendiri)
```

#### Memory Types untuk Context

| Type        | Deskripsi                          | Contoh                      |
|-------------|------------------------------------|-----------------------------|
| Declarative | Apa kode lakukan (static)          | docs, README, API specs     |
| Procedural  | Bagaimana kerja (conventions)      | /ai/context.md, patterns    |
| Operational | Runtime state (dynamic)            | CI/CD, MCP fetch real-time  |

#### Alternatif Jika Context Overload

| Situasi               | Solusi                                        |
|-----------------------|-----------------------------------------------|
| Context window penuh  | Start conversation baru (reset)               |
| Perlu carry over      | Gunakan handoff docs/summaries                |
| AI mulai bingung      | Summarize progress, reduce scope              |
| Long project          | Buat context file (.md/.json) reusable        |

#### Tips Praktis Context Management

| Tip                              | Penjelasan                                   |
|----------------------------------|----------------------------------------------|
| Buat context file reusable       | context-yourproject.md, update tiap session  |
| Compression strategies           | Learned embeddings, adaptive triggering      |
| Hindari raw dumps                | Encode semantically, fetch via MCP           |
| Eval & iterate                   | Ukur relevance, refine berdasarkan failure   |

> **💡 Tip:** Context engineering = skill #1 untuk AI agents 2026. "Bigger context window ≠ better" karena cost/hallucination. Curate dynamically!

### Tech Stack Options 2026

| Opsi | Stack                          | Best For                 |
|------|--------------------------------|--------------------------|
| 1    | Laravel Filament + React/Next  | Admin-heavy apps         |
| 2    | Laravel Inertia (Starterkit)   | Monolithic SPA           |
| 3    | Laravel Octane + FrankenPHP    | High performance         |
| 4    | Supabase + Next.js             | Fastest MVP              |
| 5    | GO + React/Next.js             | Performance-critical     |
| 6    | Fullstack Next.js + Prisma     | Most popular indie 2026  |

---

# 🔴 PHASE 4: DEVELOPMENT

**Tujuan:** Build the actual product.

## 4.1 Development Strategy Decision

```
+---------------------------------------------------------------+
| DECISION: Project Type?                                        |
+---------------------------------------------------------------+
                              |
              +---------------+---------------+
              |                               |
        SMALL/MVP                       COMPLEX
              |                               |
              v                               v
     +-----------------+           +---------------------+
     | FRONTEND FIRST  |           | BACKEND FIRST       |
     |                 |           |                     |
     | UI + Mock Data  |           | API + Auth first    |
     | -> Replace real |           | -> Connect UI later |
     +-----------------+           +---------------------+
```

## 4.2 Backend Development

```
BACKEND
   |
   +--1--> Setup Migration & Seeding
   |
   +--2--> Setup Routing & Endpoints
   |
   +--3--> Model & Controller
   |
   +--4--> Business Logic
   |
   +--5--> Auth & Permission
   |
   +--6--> API Testing (Postman/Insomnia)
```

## 4.3 Frontend Development

```
FRONTEND
   |
   +--1--> Slicing Design -> HTML/Components
   |
   +--2--> Component Library Setup
   |        (shadcn, daisyUI, Tailwind)
   |
   +--3--> Pages & Routing
   |
   +--4--> State Management
   |
   +--5--> API Integration
   |
   +--6--> Responsive & Accessible
```

### 🔗 [CABANG: MCP/TOOLS] — Digunakan intensif di sini

```
+---------------------------------------------------------------+
|                    MCP TOOLS USAGE                             |
+---------------------------------------------------------------+
|                                                                |
|  context7 -----> Lookup docs library terbaru                   |
|                  "Bagaimana cara setup Prisma di Next 15?"     |
|                                                                |
|  Firecrawl ----> Scrape reference design                       |
|                  "Extract component structure dari site X"     |
|                                                                |
|  Chrome -------> Auto testing                                  |
|  Devtools        "Test form submission flow"                   |
|                                                                |
|  Supabase -----> Database operations                           |
|                  "Create table, setup RLS"                     |
|                                                                |
+---------------------------------------------------------------+
```

### 🔗 [CABANG: IDE MODE] — Pilih mode sesuai task

| Task                 | IDE Mode    | Kenapa                 |
|----------------------|-------------|------------------------|
| Diskusi arsitektur   | Chat        | Butuh conversation     |
| Writing code         | Inline      | Autocomplete cepat     |
| Review UI mockup     | Vision      | Screenshot analysis    |
| Multi-file refactor  | Agentic     | Autonomous execution   |

### 🔗 [CABANG: PROMPTING] — Apply saat coding

```
PROMPTING DURING DEVELOPMENT
     |
     +--> Role: "You are expert in [framework]"
     |
     +--> Context: "Refer to prd.md and rules.md"
     |
     +--> Specific: "Create component X with props Y"
     |
     +--> Iterative: "Ask for clarification if needed"
```

---

# 🧪 PHASE 5: VERIFICATION & TESTING (NEW 2026)

**Tujuan:** Pastikan code AI-generated reliable sebelum deploy. AI great untuk generate, tapi human oversight tetap kunci.

## 5.1 Three Pillars of Verification

```
+---------------------------------------------------------------+
|                VERIFICATION & TESTING                          |
+---------------------------------------------------------------+
                              |
         +--------------------+--------------------+
         |                    |                    |
         v                    v                    v
   +----------------+   +----------------+   +-------------------+
   | SELF-VERIFY    |   | AUTO TESTING   |   | HUMAN/AI REVIEW   |
   | (Run tests/    |   | (MCP: TestSprite|   | (Claude reviewer, |
   |  lint/compile) |   |  Chrome DevTools|   |  BugBot, PR check)|
   +----------------+   +----------------+   +-------------------+
                              |
                              v
                  +---------------------------+
                  | FIX LOOP (Iterate with AI) |
                  +---------------------------+
```

## 5.2 Self-Verification Checklist

- [ ] All tests pass (unit, integration)
- [ ] Linter clean (no warnings/errors)
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser
- [ ] Mobile responsive check

## 5.3 Auto Testing with MCP

| Tool            | What It Does                            | When to Use                |
|-----------------|-----------------------------------------|----------------------------|
| Chrome DevTools | Automate browser, inspect DOM/console   | Frontend verification      |
| TestSprite      | Generate & run automated tests          | Regression testing         |
| Playwright MCP  | Headless browser testing                | CI/CD pipeline             |

## 5.4 Human/AI Code Review

```
CODE REVIEW APPROACHES
     |
     +--> AI Reviewer (Claude/GPT as code reviewer)
     |    --> "Review this code for security vulnerabilities"
     |    --> "Check for performance issues in this function"
     |
     +--> Human Review (Engineer-in-the-Loop)
     |    --> Architecture decisions
     |    --> Complex business logic
     |    --> Security-critical code
     |
     +--> PR Review Tools
          --> BugBot, GitHub Copilot Review
          --> Automated code quality checks
```

## 5.5 Fix Loop Best Practices

| Step | Action                                        |
|------|-----------------------------------------------|
| 1    | Run tests → identify failures                 |
| 2    | Share error with AI → get fix suggestions     |
| 3    | Apply fix → re-run tests                      |
| 4    | Repeat until all pass                         |
| 5    | Human review final changes                    |

> **💡 Tip:** Jangan skip verification! METR study (2026) menunjukkan dev bisa **slower 19%** jika tanpa proper review. AI great untuk boilerplate, tapi human untuk critical logic.

## 5.6 🔒 Security Automation (WAJIB)

> **⚠️ WARNING:** ArXiv 2025 paper menemukan **970+ vulnerabilities** di vibe-coded apps!

| Security Check | Tool/Method | When |
|----------------|-------------|------|
| Dependency scan | npm audit / Snyk / Dependabot | Before deploy |
| Secret detection | git-secrets / Gitleaks | Before commit |
| SAST (Static Analysis) | Semgrep / CodeQL | CI/CD pipeline |
| Input validation | Manual + AI review | Every endpoint |

**Mandatory Security Rules:**
- ❌ JANGAN blind accept AI code tanpa review
- ❌ JANGAN hardcode secrets (gunakan env vars)
- ✅ SELALU sanitize user input
- ✅ SELALU run security scan sebelum deploy

## 5.7 Waktu Review Berdasarkan Skill Level

| Level | Time on Review | Focus Area |
|-------|----------------|------------|
| Beginner | 50%+ | Semua output AI |
| Intermediate | 30% | Business logic, security |
| Advanced | 20% | Architecture, edge cases |

**Prinsip Utama:**
> "AI as draft, human as owner" — Jangan pernah ship code yang tidak Anda pahami.

---

# 🟣 PHASE 6: DEPLOYMENT

**Tujuan:** Ship the product live.

## 5.1 Deployment Options

```
+---------------------------------------------------------------+
|                       DEPLOYMENT                               |
+---------------------------------------------------------------+
                              |
         +--------------------+--------------------+
         |                    |                    |
         v                    v                    v
    +---------+         +----------+         +---------+
    |   VPS   |         | FRONTEND |         | BACKEND |
    +---------+         +----------+         +---------+
         |                   |                    |
         v                   v                    v
+------------------+ +------------------+ +------------------+
| - Dokploy        | | - Vercel         | | - Supabase       |
| - Coolify        | | - Netlify        | | - Neon           |
| - CapRover       | | - Cloudflare     | | - PlanetScale    |
|                  | | - GCP/AWS        | | - Railway        |
+------------------+ +------------------+ +------------------+
```

## 5.2 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrated
- [ ] HTTPS/SSL enabled
- [ ] Domain connected
- [ ] CI/CD setup (GitHub Actions)
- [ ] Monitoring (Sentry/LogRocket) - optional MVP

---

# 🔄 PHASE 7: ITERATION LOOP

**Tujuan:** Improve based on real user feedback.

```
+---------------------------------------------------------------+
|                    ITERATION LOOP                              |
+---------------------------------------------------------------+
                              |
                              v
              +-------------------------------+
              |  1. LAUNCH MVP                |
              |     (Don't wait for perfect)  |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  2. COLLECT FEEDBACK          |
              |     (User interviews, analytics|
              |     support tickets, reviews) |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  3. MEASURE METRICS           |
              |     (Signups, retention,      |
              |     revenue, NPS)             |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  4. ANALYZE WITH AI           |
              |     (Summarize feedback,      |
              |     prioritize features)      |
              +---------------+---------------+
                              |
                              v
              +-------------------------------+
              |  5. BACK TO PHASE 1           |
              |     (New Discovery cycle      |
              |     for version 2)            |
              +-------------------------------+
```

---

# 💡 TIPS & BEST PRACTICES

## Dari Pengalaman Developer Sukses

| Tip                      | Penjelasan                                   |
|--------------------------|----------------------------------------------|
| Jangan over-engineer     | Pilih stack yang sudah dikuasai + cepat deploy|
| MVP < 4 minggu           | 80% proyek gagal karena terlalu lama build  |
| Tulis PRD meski solo     | Bantu AI paham konteks besar                 |
| Validasi masalah dulu    | Hemat waktu 10x                              |
| Ship early, iterate fast | Feedback real > asumsi                       |

## Context Management

```
IF (AI mulai error / bingung):
    |
    +--> Option A: Start New Conversation
    |    --> Bawa forward: rules, summary progress
    |
    +--> Option B: Reset Context
    |    --> Ringkas yang sudah done
    |
    +--> Option C: Reduce Scope
         --> Focus 1 fitur saja
```

## Security & Risks (2026 Best Practices)

| Tip                          | Penjelasan (dari 2026 Studies & Experiences)        |
|------------------------------|-----------------------------------------------------|
| Engineer-in-the-Loop         | Selalu human validate AI code — hindari hallucinations |
| No Over-Reliance             | AI great untuk boilerplate/debug, human untuk architecture |
| Security Rules               | No hardcoded secrets, sanitize inputs, enforce via rules |
| Dependency Scanning          | Check outdated/insecure libs sebelum production     |
| Code Review Mandatory        | Jangan skip review — security vulnerabilities sering muncul |

## AI Productivity Metrics (Research-Based)

| Metric                       | Finding                                             |
|------------------------------|-----------------------------------------------------|
| Speed Boost (with review)    | +20-50% productivity dengan proper oversight        |
| Speed Drop (without review)  | -19% productivity jika tanpa review (METR Study)    |
| Accuracy                     | +10-15% dengan optimized rules file                 |
| Token Efficiency             | English prompts 30-50% lebih hemat vs Indonesia     |

> **⚠️ Warning:** AI coding tools powerful, tapi bukan pengganti engineering judgment. Gunakan sebagai "copilot", bukan "autopilot".

---

# 📋 QUICK REFERENCE CHECKLISTS

## Before Starting Project
- [ ] IDE setup & mode selected
- [ ] Model AI dipilih (gratis/premium)
- [ ] MCP servers configured
- [ ] Rules file created

## Phase 1: Discovery
- [ ] Multi-AI brainstorming done
- [ ] Needs/Pains/Gains identified
- [ ] Competitor analysis complete
- [ ] Tech stack decided

## Phase 2: Documentation
- [ ] prd.md created
- [ ] database.md created
- [ ] Rules file updated with project context

## Phase 3: Rancangan
- [ ] User flow mapped
- [ ] Database schema designed
- [ ] Architecture documented

## Phase 4: Development
- [ ] Backend API complete
- [ ] Frontend components done
- [ ] Integration tested

## Phase 5: Verification & Testing (NEW)
- [ ] All tests pass (unit, integration)
- [ ] Linter clean (no warnings)
- [ ] Human/AI code review done
- [ ] Security check complete

## Phase 6: Deployment
- [ ] Environment configured
- [ ] Deployed to production
- [ ] Monitoring setup

## Phase 7: Iteration
- [ ] User feedback collected
- [ ] Metrics measured
- [ ] Next iteration planned

---

# 🗺️ VISUAL SUMMARY

```
+-----------------------------------------------------------------------------+
|                                                                              |
|   +===============+                                                          |
|   | PHASE 0:      |                                                          |
|   | SETUP ENV     |--> IDE + Model AI + Tools + MCP + Rules                  |
|   +===============+                                                          |
|           |                                                                  |
|           v                                                                  |
|   +===============+     +----------------------+                             |
|   | PHASE 1:      |     | [Prompting]          |                             |
|   | DISCOVERY     |<----| [Multi-AI Chaining]  |                             |
|   +===============+     +----------------------+                             |
|           |                                                                  |
|           v                                                                  |
|   +===============+     +----------------------+                             |
|   | PHASE 2:      |     | [Rules Update]       |                             |
|   | DOCUMENTATION |<----|                      |                             |
|   +===============+     +----------------------+                             |
|           |                                                                  |
|           v                                                                  |
|   +===============+     +----------------------+                             |
|   | PHASE 3:      |     | [Context Strategy]   |                             |
|   | RANCANGAN     |<----| [Tech Stack Choice]  |                             |
|   +===============+     +----------------------+                             |
|           |                                                                  |
|           v                                                                  |
|   +===============+     +----------------------+                             |
|   | PHASE 4:      |     | [MCP/Tools]          |                             |
|   | DEVELOPMENT   |<----| [IDE Mode]           |                             |
|   +===============+     | [Prompting]          |                             |
|           |             +----------------------+                             |
|           v                                                                  |
|   +===============+     +----------------------+                             |
|   | PHASE 5:      |     | [Agentic Review]     |  <-- NEW!                   |
|   | VERIFICATION  |<----| [Auto Testing]       |                             |
|   +===============+     | [Human Review]       |                             |
|           |             +----------------------+                             |
|           v                                                                  |
|   +===============+                                                          |
|   | PHASE 6:      |                                                          |
|   | DEPLOYMENT    |                                                          |
|   +===============+                                                          |
|           |                                                                  |
|           v                                                                  |
|   +===============+                                                          |
|   | PHASE 7:      |--------------------------------------+                   |
|   | ITERATION     |                                      |                   |
|   +===============+                                      |                   |
|           |                                              |                   |
|           +----------> BACK TO PHASE 1 <-----------------+                   |
|                                                                              |
+-----------------------------------------------------------------------------+
```

---

# 📖 VALIDASI AKADEMIS & PENELITIAN

## Tabel Validasi Pendekatan

| Pendekatan/Metode | Dukungan Riset/Praktik | Validitas |
|-------------------|----------------------|-----------|
| Perencanaan & Tugas Kecil | Disarankan praktisi (breakdown spec → tugas kecil). Sejalan Agile/TDD. | **Kuat**: Umum di dev modern |
| Prompting Best Practice | Panduan LLM (kunci spesifik, contoh, langkah) | **Kuat**: Meningkatkan akurasi output |
| Rules File (File Aturan) | Digunakan di Cursor/alat sejenis untuk pola kode | **Valid tapi baru**: Efektif untuk konsistensi |
| Multi-Agent Coding | Riset mutakhir (MASAI, CodePlan) tunjukkan multi-agen unggul | **Menjanjikan**: Riset kuat, praktik awal |
| Context Engineering/MCP | Dibahas Anthropic (fokus konteks). MCP servers ada. | **Kuat**: Krusial mengatasi keterbatasan LLM |
| Verifikasi & Testing | Direkomendasikan JetBrains (eval loop) dan Cursor (langkah verifikasi) | **Kuat**: Perlu mencegah kesalahan AI |
| Model & Tools (Claude, dll) | Claude Opus 4.5 unggul untuk coding. Penggunaan model top dianjurkan. | **Kuat**: Pilih model terbaik sesuai tugas |
| Integrasi IDE/DevOps | Industri sarankan CI/CD, cloud IDE, arsitektur modul | **Kuat**: Modernisasi dev toolchain diperlukan |

## Context Engineering vs Prompt Engineering

> **Insight Kunci dari Anthropic (2025):**
> Context engineering lebih penting dari prompt engineering untuk AI agents.
> Konteks lengkap (tools, dokumentasi, riwayat, memori) adalah sumber daya terbatas yang harus dikelola dengan hati-hati.

```
PROMPT ENGINEERING (Lama)         CONTEXT ENGINEERING (Sekarang)
+------------------+              +----------------------------------+
| System prompt    |              | System prompt                    |
| User message     |              | Docs (curated)                   |
|                  |    vs        | Memory files                     |
| --> Output       |              | Tools                            |
|                  |              | Comprehensive instructions       |
+------------------+              | Domain knowledge                 |
                                  | Message history                  |
                                  | --> Curated --> Context Window   |
                                  +----------------------------------+
```

## Temuan Riset Kunci (2025-2026)

| Studi/Sumber | Temuan | Implikasi |
|--------------|--------|-----------|
| Haseeb et al. (2025) | Multi-agent Claude Code lebih akurat dari agen tunggal | Gunakan multi-agent untuk task kompleks |
| METR Study (2026) | -19% productivity tanpa proper review | Jangan skip verification |
| StackOverflow Survey 2024 | 76% dev pakai AI, 72% positif | Adopsi tinggi, tapi tidak universal |
| Bain & Co. (2025) | Banyak proyek AI remang karena isu integrasi | Perlu strategi implementasi |
| Anthropic Guide | Context engineering lebih krusial dari prompting | Fokus pada konteks, bukan hanya prompt |

---

# 📚 REFERENSI & SUMBER

## Sumber Utama

1. **Addy Osmani** - "My LLM coding workflow going into 2026" (Medium, Dec 2025)
2. **Anthropic** - "Effective context engineering for AI agents" (2025)
3. **JetBrains** - "What Is an AI Coding Agent?" (Junie Blog, 2025)
4. **Trigger.dev** - "How to write great Cursor Rules" (2025)
5. **Haseeb et al.** - "Context Engineering for Multi-Agent LLM Code Assistants" (ArXiv 2508.08322, 2025)

## Tools & Protokol

- **MCP (Model Context Protocol)** - GitHub: github.com/modelcontextprotocol
- **Context7** - GitHub: github.com/upstash/context7
- **Cursor AI** - GitHub: github.com/cursor/cursor (32k+ stars)

## Survei & Laporan

- **StackOverflow Developer Survey 2024** - AI Section
- **Bain & Company** - "From Pilots to Payoff: Generative AI in Software Development" (2025)
- **Pragmatic Engineer** - "Two years of using AI tools for software engineering" (2025)

---

*Workflow ini dibuat berdasarkan Best Practice Coding with AI mindmap*
*Validated dengan riset akademis dan praktik industri nyata*

**Sources:**
- Addy Osmani (Medium/Substack)
- Anthropic/Claude Code guides
- JetBrains Junie Blog
- Trigger.dev Cursor Rules
- Haseeb et al. 2025 (ArXiv)
- StackOverflow Survey 2024
- Bain & Company Technology Report 2025

**MCP Status:** Open standard via Linux Foundation AAIF (2025)
**Disclaimer:** AI adalah "copilot", bukan "autopilot". Human oversight selalu diperlukan.

*Last updated: 2026-01-02*


