# 🎨 Frontend Architecture

> **Stack**: Next.js 15+ (App Router) + TypeScript + Tailwind CSS

---

## 1. Directory Structure

```
src/
├── app/                    # Next.js App Router (Pages)
├── components/             # Reusable UI components
├── contexts/               # React Context providers
├── data/                   # Static data (resources, materi)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & configs
└── types/                  # TypeScript definitions
```

---

## 2. Routes (`src/app/`)

| Route | File | Description |
|-------|------|-------------|
| `/` | `page.tsx` | Landing page (redirect) |
| `/login` | `login/page.tsx` | Login form |
| `/register` | `register/page.tsx` | Registration form |
| `/onboarding` | `onboarding/page.tsx` | Profile setup wizard |
| `/dashboard` | `dashboard/page.tsx` | Main dashboard |
| `/dashboard/study` | `dashboard/study/page.tsx` | Study materials view |
| `/dashboard/daily` | `dashboard/daily/page.tsx` | Daily agenda/missions |
| `/dashboard/latihan` | `dashboard/latihan/page.tsx` | Quiz/Latihan Soal |
| `/dashboard/tryout` | `dashboard/tryout/page.tsx` | Tryout analytics |
| `/focus/[id]` | `focus/[id]/page.tsx` | Focus mode (learning) |
| `/settings` | `settings/page.tsx` | User settings |
| `/tasks` | `tasks/page.tsx` | Task management |

---

## 3. Component Library (`src/components/`)

### Core UI (`ui/`)

Base components from shadcn/ui:

- `button.tsx`, `card.tsx`, `dialog.tsx`
- `input.tsx`, `label.tsx`, `select.tsx`
- `progress.tsx`, `badge.tsx`, `tabs.tsx`

### Feature Components

| Folder | Purpose | Key Components |
|--------|---------|----------------|
| `auth/` | Authentication UI | `ProtectedRoute` |
| `landing/` | Landing page sections | `Hero`, `Features`, `Navbar` |
| `dashboard/` | Dashboard widgets | `ProgressCards`, `StatsGrid` |
| `daily/` | Daily agenda | `MissionCard`, `Timeline` |
| `tracking/` | Progress tracking | `HierarchyTree`, `StatusCheckbox` |
| `tryout/` | Tryout analytics | `ScoreChart`, `SubjectProgress` |
| `layout/` | App shell | `Sidebar`, `Header`, `MobileNav` |

---

## 4. Styling

### Design Tokens (`globals.css`)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --accent: 240 4.8% 95.9%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Tailwind Config

- Custom colors via CSS variables
- Dark mode: `class` strategy
- Animations: Framer Motion integration

---

## 5. State Management

| Context | File | Purpose |
|---------|------|---------|
| `AuthContext` | `contexts/auth-context.tsx` | User authentication state |
| `ThemeProvider` | `components/providers.tsx` | Dark/Light mode |

### Data Flow Pattern

```
Firebase Auth → AuthContext → Protected Routes → Dashboard
                                         ↓
                              Firestore listeners → UI
```

---

## 6. Key Patterns

### Protected Routes

```tsx
<ProtectedRoute>
  <DashboardLayout>
    <YourPage />
  </DashboardLayout>
</ProtectedRoute>
```

### Real-time Data

```tsx
useEffect(() => {
  const unsubscribe = onSnapshot(
    doc(db, `users/${uid}/progress/${materialId}`),
    (snapshot) => setProgress(snapshot.data())
  );
  return unsubscribe;
}, [uid, materialId]);
```
