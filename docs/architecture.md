# 🏗️ System Architecture

> **Project**: StudyFlow SNBT Tracker  
> **Version**: 1.0  
> **Last Updated**: 5 Januari 2026

---

## 1. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐   │
│  │   Landing Page  │    │     Dashboard    │    │   Focus Mode    │   │
│  │   (Marketing)   │    │    (Main App)    │    │   (Learning)    │   │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘   │
│           │                     │                      │              │
│           └──────────┬──────────┴──────────────────────┘              │
│                      │                                                │
│              ┌───────▼───────┐                                        │
│              │  React Context │  (AuthContext, ThemeContext)          │
│              └───────┬───────┘                                        │
│                      │                                                │
└──────────────────────┼────────────────────────────────────────────────┘
                       │
                       │ Firebase SDK (Real-time Listeners)
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        FIREBASE BACKEND                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐   │
│  │  Firebase Auth  │    │    Firestore    │    │ (Future: Cloud  │   │
│  │ - Email/Pass    │    │ - users/{uid}   │    │   Functions)    │   │
│  │ - Google OAuth  │    │ - progress/     │    │                 │   │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘   │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
                       │
                       │ Vercel Hosting
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT                                    │
│  - Vercel (Frontend hosting, Edge functions)                          │
│  - GitHub (Version control, CI/CD trigger)                            │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # → Landing Page
│   ├── layout.tsx          # → Root layout (providers)
│   ├── globals.css         # → Design tokens & themes
│   ├── dashboard/          # → Main dashboard routes
│   ├── login/              # → Login page
│   ├── register/           # → Registration page
│   ├── onboarding/         # → Profile setup wizard
│   ├── focus/              # → Focus mode (learning)
│   ├── settings/           # → User settings
│   └── tasks/              # → Task management
│
├── components/
│   ├── ui/                 # → shadcn/ui base components
│   ├── landing/            # → Landing page sections
│   ├── dashboard/          # → Dashboard-specific components
│   ├── daily/              # → Daily agenda components
│   ├── tracking/           # → Progress tracking components
│   ├── tryout/             # → Tryout/quiz components
│   ├── layout/             # → Sidebar, Header, Navigation
│   └── auth/               # → Auth-related components
│
├── contexts/
│   └── AuthContext.tsx     # → Global auth state
│
├── lib/
│   ├── firebase/           # → Firebase config & helpers
│   ├── data/               # → Static data (materi structure)
│   └── utils.ts            # → Utility functions
│
└── types/                  # → TypeScript definitions
```

### 2.2 Component Hierarchy

```
<RootLayout>
  ├── <Providers>  (Theme, Auth contexts)
  │
  ├── [Landing Page]
  │   ├── <Navbar>
  │   ├── <HeroSection>
  │   ├── <FeaturesSection>
  │   └── <Footer>
  │
  └── [Protected Routes] → <ProtectedRoute>
      ├── <DashboardLayout>
      │   ├── <Sidebar>
      │   ├── <Header>
      │   └── <MainContent>
      │       ├── <ProgressCards>
      │       ├── <TodayAgenda>
      │       └── <HierarchyTree>
      │
      ├── <FocusMode>
      │   ├── <ContentViewer>
      │   ├── <PomodoroTimer>
      │   └── <ResourceList>
      │
      └── <Settings>
          └── <ProfileForm>
```

---

## 3. Data Flow Architecture

### 3.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────┐
│  Login   │ ──▶ │ Firebase │ ──▶ │ AuthContext │ ──▶ │ Protected│
│   Page   │     │   Auth   │     │  (onAuth    │     │  Routes  │
│          │     │          │     │   Change)   │     │          │
└──────────┘     └──────────┘     └─────────────┘     └──────────┘
                                         │
                                         ▼
                              ┌─────────────────┐
                              │ Redirect Logic  │
                              │ - To Dashboard  │
                              │ - To Onboarding │
                              └─────────────────┘
```

### 3.2 Progress Tracking Flow

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│ Checkbox │ ──▶ │ Update Local │ ──▶ │  Firestore  │ ──▶ │ onSnapshot│
│  Click   │     │    State     │     │  setDoc()   │     │ Listener │
└──────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                                 │
                                                                 ▼
                                                      ┌─────────────────┐
                                                      │ UI Auto-Update  │
                                                      │ (All clients)   │
                                                      └─────────────────┘
```

### 3.3 Daily Mission Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Resource DB │ ──▶ │ Filter by   │ ──▶ │  Agenda     │
│ (Static TS) │     │   Date      │     │   View      │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │   Focus Mode    │
                                      │ - Video Player  │
                                      │ - PDF Viewer    │
                                      │ - Resources     │
                                      └─────────────────┘
```

---

## 4. State Management

### 4.1 Global State (React Context)

| Context | Purpose | Scope |
|---------|---------|-------|
| `AuthContext` | User authentication state | Entire app |
| `ThemeProvider` | Dark/Light mode | Entire app |

### 4.2 Local State Patterns

| Pattern | Usage |
|---------|-------|
| `useState` | UI components, form inputs |
| `useEffect` | Firestore listeners, side effects |
| `localStorage` | Fallback progress (deprecated) |

### 4.3 Data Sources

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │   STATIC DATA   │    │  DYNAMIC DATA   │                 │
│  │                 │    │                 │                 │
│  │ - materi.ts     │    │ - Firestore     │                 │
│  │ - resource-db.ts│    │   onSnapshot()  │                 │
│  │ - (build-time)  │    │ - Real-time     │                 │
│  └─────────────────┘    └─────────────────┘                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Firebase Architecture

### 5.1 Collections Structure

```
firestore/
├── users/
│   └── {uid}/
│       ├── [profile fields]     # displayName, email, target, etc.
│       └── progress/
│           └── {materialId}/    # belajar, latsol, review, timestamp
│
├── questions/ (planned)
│   └── {questionId}/            # Quiz questions
│
└── attempts/ (planned)
    └── {attemptId}/             # User quiz attempts
```

### 5.2 Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 6. Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PIPELINE                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐     ┌──────────┐     ┌──────────────────────┐  │
│  │  GitHub  │ ──▶ │  Vercel  │ ──▶ │    Production        │  │
│  │  Push    │     │   Build  │     │  studyflow.vercel.app│  │
│  └──────────┘     └──────────┘     └──────────────────────┘  │
│                         │                                     │
│                         ▼                                     │
│                   ┌──────────┐                                │
│                   │ Preview  │  (Per-branch deployments)      │
│                   │ Deploy   │                                │
│                   └──────────┘                                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Environment Variables

| Variable | Purpose | Location |
|----------|---------|----------|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase config | Vercel + `.env.local` |

---

## 7. Performance Optimizations

### 7.1 Current Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Code Splitting** | Next.js automatic per-route |
| **Image Optimization** | Next.js Image component |
| **Lazy Loading** | Dynamic imports for heavy components |
| **Real-time Sync** | Firestore onSnapshot (avoids polling) |

### 7.2 Planned Optimizations

| Optimization | Description |
|--------------|-------------|
| **Dashboard Views** | Pre-computed aggregates in Firestore |
| **Caching** | SWR for static data |
| **Bundle Size** | Tree-shaking unused components |

---

## 8. Third-Party Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| **Firebase Auth** | Authentication | ✅ Active |
| **Firebase Firestore** | Database | ✅ Active |
| **Vercel** | Hosting | ✅ Active |
| **YouTube** | Video embeds | ✅ Active |
| **Google Drive** | PDF hosting | ✅ Active |
| **Cloud Functions** | Backend logic | 📋 Planned |

---

## 9. References

- [prd.md](./prd.md) - Product requirements
- [firebase-schema.md](./firebase-schema.md) - Database schema details
- [data-paths.md](./data-paths.md) - Data optimization strategy
- [latihan-soal-architecture.md](./latihan-soal-architecture.md) - Quiz system design
