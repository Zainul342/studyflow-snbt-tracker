# 🔧 Backend & Services

> **Stack**: Firebase (Firestore + Auth) - Serverless Architecture

---

## 1. Architecture Overview

StudyFlow menggunakan **serverless architecture** dengan Firebase sebagai backend utama:

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Next.js)                  │
│                                                      │
│   React Components ←→ Firebase SDK (Client-side)    │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                    FIREBASE                          │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐                 │
│  │  Firebase   │    │  Firestore  │                 │
│  │    Auth     │    │  Database   │                 │
│  └─────────────┘    └─────────────┘                 │
│                                                      │
│  ┌─────────────┐    ┌─────────────┐                 │
│  │   Cloud     │    │   Storage   │                 │
│  │  Functions  │    │   (Future)  │                 │
│  │  (Planned)  │    │             │                 │
│  └─────────────┘    └─────────────┘                 │
└─────────────────────────────────────────────────────┘
```

---

## 2. Firebase Configuration

### Location

```
src/lib/firebase/config.ts
```

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

---

## 3. Authentication

### Supported Methods

| Method | Status | Implementation |
|--------|--------|----------------|
| Email/Password | ✅ Active | `signInWithEmailAndPassword()` |
| Google OAuth | ✅ Active | `signInWithPopup()` + Google Provider |

### Auth Flow

```
Login Page → Firebase Auth → onAuthStateChanged → AuthContext → Redirect
                                                       ↓
                                              /dashboard (authenticated)
                                              /onboarding (new user)
```

### Key Files

- `src/contexts/auth-context.tsx` - Auth state provider
- `src/components/auth/ProtectedRoute.tsx` - Route guard

---

## 4. Database (Firestore)

### Collections

```
firestore/
├── users/
│   └── {uid}/
│       ├── displayName, email, targetPtn, targetMajor
│       └── progress/
│           └── {materialId}/
│               ├── belajar: boolean
│               ├── latsol: boolean
│               ├── review: boolean
│               └── lastUpdated: timestamp
│
├── questions/ (planned)
│   └── {questionId}/
│
└── attempts/ (planned)
    └── {attemptId}/
```

### Security Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 5. Data Operations

### Read Pattern (Real-time)

```typescript
// Subscribe to progress updates
const unsubscribe = onSnapshot(
  collection(db, `users/${uid}/progress`),
  (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProgress(data);
  }
);
```

### Write Pattern

```typescript
// Update progress
await setDoc(
  doc(db, `users/${uid}/progress/${materialId}`),
  {
    belajar: true,
    lastUpdated: serverTimestamp()
  },
  { merge: true }
);
```

---

## 6. External Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| YouTube | Video embeds | ✅ Active |
| Google Drive | PDF hosting | ✅ Active |
| Vercel | Hosting | ✅ Active |

---

## 7. Planned Features

| Feature | Description | Status |
|---------|-------------|--------|
| Cloud Functions | Backend logic (scoring, matchmaking) | 📋 Planned |
| Questions API | Quiz question management | 📋 Planned |
| Analytics | Usage tracking | 📋 Planned |
