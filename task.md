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

- [ ] **Dashboard Page**
  - [x] Progress overview cards
  - [x] Stats grid (dummy data)
  - [x] Today's agenda widget
  - [ ] Navigation sidebar

- [ ] **Tracking Page**
  - [ ] Hierarchy tree: Subtes → Materi → Submateri
  - [ ] Checkbox system (Belajar/Latsol/Review)
  - [ ] Progress bar per section
  - [ ] Menggunakan data dari `materi-structure.ts`

- [ ] **Profile/Settings Page**
  - [ ] User info display
  - [ ] Target PTN & Jurusan
  - [ ] Target date picker

- [ ] **Login/Register Page UI**
  - [ ] Clean login form
  - [ ] Google sign-in button (UI only)

---

## 🗄️ Phase 3: Backend Prep (Week 3)
> Tujuan: Persiapan sebelum connect backend (Lesson 5)

- [ ] Clean up dead code
- [ ] Refactor file besar (>1000 lines) jadi komponen kecil
- [ ] Buat file `docs/firebase-schema.md` untuk AI reference
- [ ] Define data paths: `users/[UID]/progress/[submateriId]`
- [ ] Create roadmap fitur untuk V1, V2, V3

---

## 🔐 Phase 4: Authentication (Week 4)
> Tujuan: User sign up & login beneran (Lesson 6)

- [ ] Setup Firebase project
- [ ] Enable Email/Password auth
- [ ] Enable Google Sign-In
- [ ] Connect frontend → Firebase Auth
- [ ] Create `onUserCreate` cloud function
- [ ] Test di Firebase Emulator

---

## 💾 Phase 5: Database Integration (Week 5)
> Tujuan: Simpan data user ke Firestore (Lesson 7)

- [ ] Setup Firestore database
- [ ] Implement user progress saving
- [ ] Real-time sync progress
- [ ] Firebase Security Rules

---

## 🚀 Phase 6: Polish & Deploy (Week 6)
> Tujuan: Final polish dan deploy ke Vercel

- [ ] Performance optimization
- [ ] Final responsive check
- [ ] Deploy ke Vercel
- [ ] Connect custom domain (opsional)
- [ ] Create walkthrough documentation

---

## 📝 Notes & Learnings

### Video Lessons Applied:
1. ✅ **File Size Rule**: Keep files under 1000-1500 lines
2. ✅ **Ask, Plan, Execute**: Always plan before coding
3. ✅ **Dummy Data First**: Build UI before backend
4. ✅ **GitHub as Insurance**: Commit frequently
5. ✅ **Frontend First**: Complete UI before backend integration
6. ✅ **Backend is King**: Don't over-optimize local storage

### Current Focus:
**Phase 1: Landing Page MVP** - Membuat landing page yang stunning dan siap untuk review.
