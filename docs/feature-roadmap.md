# 🗺️ StudyFlow Evolution Roadmap

> **Vision**: From a Study Tracker to an "Academic Operating System".
> This roadmap defines the rollout phases for the data structures defined in `firebase-schema.md`.

---

## 🏁 Phase 1: "The Monolith" (MVP)
**Focus**: Personal Mastery & Habit Formation.
*Target: Launch Week 1-4*

### Core Features
- [x] **Mission Control**: Daily Generated Tasks (Mock/Manual).
- [ ] **Dual-Mastery System (Basic)**:
    - Tracking XP per Subtest.
    - Global Level computation.
- [ ] **Focus Mode (Zen)**:
    - Pomodoro Timer.
    - Content Viewer (PDF/Video).
- [ ] **Data Persistence**:
    - Save progress to Firestore (`users/{uid}/progress`).
    - Basic "Streak" protection.

### "Genius" Element V1
- **Neural Dashboard**: The "Single-Breath Load" architecture is implemented from Day 1 to ensure 0-lag performance.

---

## ⚔️ Phase 2: "The Arena" (Social & Gamification)
**Focus**: External Motivation & Social Pressure.
*Target: Month 2*

### Core Features
- [ ] **The Rivalry System**:
    - Weekly 1v1 matchmaking based on simple XP parity.
    - "Rival Radar": Real-time notifications when rival scores.
- [ ] **Cohort Leaderboards**:
    - Static Weekly views (`cohorts/{id}/views/leaderboard`).
    - Ranking by "Target Major" (e.g., Pejuang STEI ITB).
- [ ] **Knowledge Decay (Entropy)**:
    - Visual indicators (Rust/Standard) on Subtest Skill Tree.
    - Algorithm: `if (lastPracticed > 3 days) xp -= 5%`.

### "Genius" Element V2
- **Hot-Path Synapses**: Utilizing the optimization from `data-paths.md` to deliver Rival updates without querying heavy user documents.

---

## 🧠 Phase 3: "The Singularity" (AI & Deep Analytics)
**Focus**: Insight & Prediction.
*Target: Month 3+*

### Core Features
- [ ] **Tryout Analytics Engine**:
    - Implement `attempts` collection analysis.
    - **Ghost Replay**: Track time-per-question and answer-change frequency.
- [ ] **Weakness SWOT**:
    - Auto-tagging weak topics (e.g., "Weak in Paragraf Rumpang").
    - Suggest specific "Repair Missions" in the daily agenda.
- [ ] **Prediction Model**:
    - "Survival Check": Probability of passing SNBT based on historical cohort data.

### "Genius" Element V3
- **Predictive Intervention**: The system doesn't just display data; it *intervenes*. "Stop studying PU, your PK score will fail you. Switch now."

---

## 🛡️ Phase 4: "The Vault" (Monetization - Optional)
**Focus**: Premium Assets & Advanced Tools.

- [ ] **The Armory**: Cosmetic unlocks (Avatars, Themes) using earned XP.
- [ ] **Pro Analytics**: Deep-dive comparison vs. Top 1% of users.
