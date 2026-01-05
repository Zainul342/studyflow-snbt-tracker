# 📘 Product Requirements Document (PRD)

> **Project**: StudyFlow SNBT Tracker  
> **Version**: 1.0 (MVP)  
> **Last Updated**: 5 Januari 2026

---

## 1. Overview

**Tagline**: "From Spreadsheet to Supercharged SNBT Preparation"

**Target User**: Pelajar SNBT 2026 yang ingin tracking progress belajar dengan lebih interaktif dan terstruktur.

**Core Value Proposition**:

- Upgrade manual spreadsheet tracking → dashboard interaktif
- Real-time progress visualization
- Gamification untuk motivasi belajar
- Integrasi resources (video, PDF) dalam satu platform

---

## 2. User Personas

### Primary Persona: Zain (Active SNBT Preparer)

| Attribute | Detail |
|-----------|--------|
| **Background** | SMA kelas 12, target masuk ITB STEI |
| **Technical Comfort** | Familiar dengan spreadsheet, basic apps |
| **Study Style** | Visual learner, needs structure |

**Pain Points**:

1. Spreadsheet TTL statis dan tidak interaktif
2. Tidak ada reminder atau sistem tugas terintegrasi
3. Analytics manual, harus hitung sendiri progress
4. Tidak ada motivasi/gamification

**Goals**:

- Efisiensi waktu tracking
- Insight otomatis tentang progress
- Sistem belajar terstruktur
- Motivasi lewat visual feedback

---

## 3. Core Features (MVP Scope)

### 3.1 Authentication & Profile

| Feature | Status | Description |
|---------|--------|-------------|
| Email/Password Login | ✅ Done | Firebase Auth |
| Google OAuth | ✅ Done | One-click login |
| Profile Setup | ✅ Done | Target PTN, Jurusan, preferences |
| Protected Routes | ✅ Done | ProtectedRoute component |

### 3.2 Materi Tracking

| Feature | Status | Description |
|---------|--------|-------------|
| Hierarchy Tree | ✅ Done | 7 Subtes → Materi → Submateri |
| Boolean Checkboxes | ✅ Done | Belajar / Latsol / Review |
| Progress Aggregation | ✅ Done | Persentase per subtes |
| Real-time Sync | ✅ Done | Firestore onSnapshot |

### 3.3 Dashboard

| Feature | Status | Description |
|---------|--------|-------------|
| Progress Overview | ✅ Done | Cards, charts |
| Today's Agenda | ✅ Done | Mission-based daily view |
| Daily Mission | ✅ Done | Timeline view dengan resources |
| Focus Mode | ✅ Done | Distraction-free learning |

### 3.4 Content Delivery

| Feature | Status | Description |
|---------|--------|-------------|
| YouTube Embed | ✅ Done | In-app video player |
| PDF Viewer | ✅ Done | Google Drive integration |
| Resource Lists | ✅ Done | Per-mission resources |

### 3.5 Latihan Soal (In Planning)

| Feature | Status | Description |
|---------|--------|-------------|
| Quiz Engine | 📋 Planned | Mode Santai & Mode Waktu |
| Question Bank | 📋 Planned | Firestore `questions` collection |
| Scoring System | 📋 Planned | IRT-based scoring |
| Gamification (Focus Points) | 📋 Planned | XP multiplier system |

---

## 4. Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Framework** | Next.js 16 (App Router) | SSR + Client components |
| **Language** | TypeScript | Strict mode |
| **Styling** | Tailwind CSS 4 | Dark theme by default |
| **UI Components** | shadcn/ui + Radix | Accessible components |
| **Database** | Firebase Firestore | Real-time sync |
| **Auth** | Firebase Auth | Email + Google |
| **Animations** | Framer Motion + GSAP | Premium feel |
| **Hosting** | Vercel | Auto-deploy from GitHub |

---

## 5. Data Model Summary

> Detail: See [firebase-schema.md](./firebase-schema.md)

### Primary Collections

- `users/{uid}` - User profile & settings
- `users/{uid}/progress/{materialId}` - Learning progress
- `users/{uid}/attempts/{attemptId}` - Quiz attempts (planned)
- `questions/{questionId}` - Question bank (planned)

### Key Optimizations

- "Single-Breath Load" architecture (See [data-paths.md](./data-paths.md))
- Real-time listeners for progress updates
- Client-side calculations for responsiveness

---

## 6. User Flows

### 6.1 New User Flow

```
Landing Page → Register → Onboarding (Profile Setup) → Dashboard
```

### 6.2 Daily Learning Flow

```
Dashboard → Today's Agenda → Pick Mission → Focus Mode → Mark Complete → Progress Update
```

### 6.3 Latihan Soal Flow (Planned)

```
Dashboard → Latihan Soal → Setup Config → Quiz Engine → Submit → Results
```

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to First Interaction** | < 3 seconds | LCP measurement |
| **Daily Active Users** | Track | Firebase Analytics |
| **Completion Rate** | > 50% per week | Progress aggregation |
| **User Satisfaction** | > 4/5 stars | In-app feedback |

---

## 8. Roadmap Summary

| Phase | Focus | Timeline |
|-------|-------|----------|
| **Phase 1** | MVP - Personal Mastery | Week 1-4 ✅ |
| **Phase 2** | The Arena - Social & Gamification | Month 2 |
| **Phase 3** | The Singularity - AI & Analytics | Month 3+ |
| **Phase 4** | The Vault - Monetization | Future |

> Full roadmap: See [feature-roadmap.md](./feature-roadmap.md)

---

## 9. References

- [firebase-schema.md](./firebase-schema.md) - Database schema
- [data-paths.md](./data-paths.md) - Data optimization paths
- [feature-roadmap.md](./feature-roadmap.md) - Feature evolution
- [latihan-soal-architecture.md](./latihan-soal-architecture.md) - Quiz system design
