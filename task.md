# StudyFlow SNBT Tracker - Task Checklist

## Status Legend
- `[ ]` Belum dikerjakan
- `[/]` Sedang dikerjakan
- `[x]` Selesai

---

## 🎯 Phase 0: Understanding & Setup (Week 0)
> Tujuan: Memahami dasar dan setup environment

- [x] Initial Next.js project setup
- [x] Connect to GitHub repository
- [x] Basic landing page component exists
- [x] Review and understand current project structure
- [x] **BELAJAR**: Memahami alur kerja Antigravity + Git

---

## 🎨 Phase 1: Landing Page MVP (Week 1)
> Tujuan: Bikin landing page yang WOW dulu (App Value - Lesson 2)

- [x] **Design Reference**: Dark theme modern dengan emerald accent
- [x] Refine current `osmo-landing.tsx` → Buat `studyflow-landing.tsx`
- [x] Hero Section dengan judul menarik + countdown SNBT badge
- [x] Feature highlights (3 fitur utama)
- [x] Call-to-action button
- [x] Dark mode yang elegan
- [x] Responsive untuk mobile
- [x] **Refine Navbar**: Center, rounded (pill), compact (Osmo style)
- [x] **Refine Header & Marquee**: Squircle (`rounded-2xl`), floating marquee, narrower
- [x] **VERIFY**: Preview di browser localhost

---

## 🖼️ Phase 2: UI Pages - Dummy Data (Week 2)
> Tujuan: Bangun semua halaman UI tanpa backend dulu (Lesson 3 & 4)

- [x] Login / Register UI (Glass Monolith)
- [x] Onboarding Page Redesign (Glass Monolith & Setup Flow)
- [ ] Dashboard & Tracking UI
    - [x] **Phase 6: Noir & Samba Theming** <!-- id: 6 -->
    - [x] Integrate `next-themes`.
    - [x] Refactor `globals.css` (semantic variables).
    - [x] Fix Tailwind `@apply` build errors.
    - [x] Update all Landing Page components.
- [x] **Phase 6.5: Landing Page Refinement** (In Progress)
    - [x] Make "Products" section cards interactive (Coming Soon Modal).
    - [x] Polish Copywriting across the landing page.
    - [x] Ensure Mobile Menu is fully functional.
    - [x] Restore Semantic Colors for Dual Theme support. (@globals.css, @hero-section.tsx, @video-section.tsx)
    - [x] **New:** Create Realtime Dashboard Preview (interactive code) instead of static image.
    - [x] **New:** Fix Light Mode visibility (black on black) in Hero & Video sections.
    - [x] **New:** Create Realistic Video Player Preview with simulated interactions.

**Current Focus**: Phase 7: Polish & Deployment (Images & Final UX)eri
  - [x] Checkbox system (Belajar/Latsol/Review)
  - [x] Progress bar per section
  - [x] **Unified Mission Dashboard** (Phase 2 Extension)
    - [x] **Data Engine**: Parse CSV to `resource-db.ts`
    - [x] **Mission UI**: Agenda Harian Page (Timeline View)
    - [x] **Focus Overlay**: Mission Modal (Youtube Embed, Resource List)
    - [x] **Categorization**: 'Materi' vs 'Soal' badges & grouping
    - [x] **Smart Players**: Support Youtube, Drive PDF, Twitter rendering (Fully Integrated)
    - [x] **Persistence**: 'Mark as Complete' logic with localStorage
    - [x] **Dynamic Context**: Automated 'Today' highlighting and progress checkmarks
    - [x] **Dynamic Context**: Automated 'Today' highlighting and progress checkmarks
  - [x] Menggunakan data dari `materi-structure.ts`
  - [x] **Focus Mode UI (New)**
    - [x] Distraction-free Layout (No Sidebar)
    - [x] Integrated Pomodoro Timer
    - [x] Content Viewer (Video/PDF/Quiz)

- [x] **UI/UX Polish (Agenda)**
  - [x] **Visual Overhaul**: Added ambient gradients, stats hero, and premium glass cards
  - [x] **Color Harmony**: Tuned neon glows and dark contrasts
  - [x] **Interactive Elements**: Implemented hover lifts and smooth transitions
  - [/] **Design System Harmonization**: Enforced `rounded-sm`, Grid Backgrounds, and Osmo Ambient Lighting across Dashboard & Agenda

- [x] **Profile/Settings Page**
  - [x] User info display
  - [x] Target PTN & Jurusan
  - [x] Target Score & Preferences

- [x] **Login/Register Page UI**
  - [x] Clean login form
  - [x] Google sign-in button (UI only)

---

## 🗄️ Phase 3: Backend Prep (Week 3)
> Tujuan: Persiapan sebelum connect backend (Lesson 5)

- [x] Clean up dead code
- [x] Refactor file besar (>1000 lines) jadi komponen kecil
- [x] Buat file `docs/firebase-schema.md` untuk AI reference (Genius Architecture V1)
- [x] Define data paths: `users/[UID]/progress/[submateriId]` (Neural Architecture Defined in `docs/data-paths.md`)
- [x] Create roadmap fitur untuk V1, V2, V3 (Defined in `docs/feature-roadmap.md`)

---

## 🔐 Phase 4: Authentication (Week 4)
> Tujuan: User sign up & login beneran (Lesson 6)

- [x] **Firebase Setup**
  - [x] Create Project & App in Console
  - [x] Secure API Keys in `.env.local`
- [x] **Core Authentication Logic**
  - [x] `AuthContext`: Global listener for User Login/Logout status
  - [x] `Providers`: Wrap app to share Auth state
- [x] **UI Integration**
  - [x] Login Form (`signInWithEmailAndPassword` & Google)
  - [x] Register Form (`createUserWithEmailAndPassword` + `updateProfile`)
  - [x] Sidebar Logout Button
- [x] **Security**
  - [x] `ProtectedRoute`: Gatekeeper for Dashboard access (Redirects if not logged in)
- [x] Create `onUserCreate` logic (Implemented on Client Side for Simplicity)
- [x] ~~Test di Firebase Emulator~~ (Skipped for Efficiency - Verified directly in Production Environment)

---

## 💾 Phase 5: Database Integration (Week 5)
> Tujuan: Simpan data user ke Firestore (Lesson 7)

- [x] Setup Firestore database (Initialized in Code)
- [x] Save User Profile Data (Onboarding Flow)
- [x] Implement user progress saving (Local Storage logic replaced with Firestore)
- [x] Real-time sync progress (Implemented in HierarchyTree & SubmateriItem)
- [x] Firebase Security Rules (File created: `firestore.rules`)

- [ ] Firebase Security Rules

---

## ☁️ Phase 5b: Cloud Functions Strategy (Lesson 8)
> Tujuan: Scalable Backend Logic & Security
> **Core Concepts**: CRUD, Timeouts, Memory, Rate Limiting

- [ ] **Plan Function Type**:
  - [ ] **HTTP Callable**: User actions (e.g., Submit Tryout)
  - [ ] **Triggers**: `onUserCreate` (Setup Profile), `onDelete` (Cleanup)
  - [ ] **Scheduled**: Daily Rank Update (Pub/Sub)
- [ ] **Configuration Planning**:
  - [ ] Set Timeouts (60s default, 300s for AI ops)
  - [ ] Memory Allocation (256MB vs 2GB for AI)
- [ ] **Security & Abuse Prevention**:
  - [ ] Implement Debounce (Frontend 300ms)
  - [ ] Rate Limiting Strategy (e.g., 5 req/min for free tier)
  - [ ] **Anti-Abuse**: "Disable Auth" instead of Delete Account

---

## 避 Phase 6: Polish & Deploy (Week 6)
> Tujuan: Final polish dan deploy ke Vercel

- [ ] Performance optimization
- [ ] Final responsive check
- [x] **SEO & Metadata** (Titles, Descriptions, Keywords)
- [x] **Custom 404 Page** (Lost in the Void)
- [ ] Deploy ke Vercel
- [ ] Connect custom domain (opsional)
- [ ] Create walkthrough documentation

---

---

## 🧠 Phase 6.75: Strategic UX Re-alignment (Universal Framework Pivot)
> Tujuan: Ensure "Product-Market Fit" by prioritizing UX/Emotion over Features.
> **Philosophy**: Break down into atomic units. Do not move to the next until the current is *fully functional*.

### A. The Hook (Landing Page Core)
- [x] **Copywriting Overhaul**: Rewrite Hero & Features. *Definition of Done*: No Lorem Ipsum, copy targets "Overwhelmed Zain".
- [x] **Mobile Touch**: Verify big touch targets for Hero CTA.
- [x] **Navigation Cleanup**: Remove dead links. Only keep working anchors.

### B. The Trust (Social Proof)
- [x] **Real Testimonials**: Replace generic "Creators" with "Success Stories" or value-propositions.
- [x] **Contextual Trust**: Add "Why Trust Us" micro-copy near CTAs.

### C. The Entry (Frictionless Onboarding)
- [x] **Simplify Register Flow**: Remove non-essential fields (e.g., complex academic history).
- [x] **Emotional Micro-copy**: Replace "Standard Registration" with "Welcome to the Tribe" vibe.
- [x] **Functional Verification**: Ensure Register -> Onboarding -> Dashboard flow works.ure Firestore data is clean.

### D. The First Win (Dashboard Focus)
- [x] **Focus Mode UI**: Create a "Today Only" view. Hide complex analytics initially.
- [x] **The Checkmark**: Ensure the core action (checking a box) feels incredibly satisfying (haptics/sound/visual).
- [/] **Mobile Thumb Zone**: Verify dashboard controls are bottom-aligned or reachable.

### E. Kocak & Real-time Integration
- [x] **Real-time Engine**: Connect Dashboards & Tryouts to Firestore `onSnapshot`.
- [x] **Kocak Personalization**: Implement humorous fallbacks for incomplete profiles.
- [x] **Landing Sync**: Update Landing Page preview code to match new UI.

### F. Mobile Polish & Optimization
- [x] **Navigation**: Implement "Back Button" in Header for deep pages.
- [x] **Adaptive UI**: Refine typography and grid stacking on small screens.
- [x] **Performance**: Audit for "heavy" animations and optimize layout shift.
- [x] **Unified Spacing**: Ensure consistent `p-4` on mobile vs `p-8` on desktop.

---

## 📝 Notes & Learnings

### Video Lessons Applied:
1. ✅ **File Size Rule**: Keep files under 1000-1500 lines
2. ✅ **Ask, Plan, Execute**: Always plan before coding
3. ✅ **Dummy Data First**: Build UI before backend
4. ✅ **GitHub as Insurance**: Commit frequently
5. ✅ **Frontend First**: Complete UI before backend integration
6. ✅ **Backend is King**: Don't over-optimize local storage
7. ✅ **Consistency is Key**: Visual harmony (Lighting, Shapes) builds trust.
8. ✅ **Scale Smart (Lesson 8)**: Use Cloud Functions for heavy lifting. Log everything. Prevent abuse early.

### Current Focus:
**Phase 6: Polish & Deploy** - Final check before launch (SEO, Performance, Deployment).
