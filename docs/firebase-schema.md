# 🔥 StudyFlow Intelligence Architecture (Firebase Schema)

> **Philosophy**: "The System is Alive".
> Data isn't just stored; it evolves. We track not just *what* the user did, but *how* they did it (Time, Pattern, Consistency).
> The goal is to model the user's brain, not just their test scores.

---

## 1. Core Collections

### 👥 `users` (Collection)
**Document ID**: `auth.uid`
**Purpose**: The central nervous system of the user's profile.

```typescript
interface UserProfile {
  // Identity
  uid: string;
  email: string;
  handle: string; // @username (Unique)
  displayName: string;
  avatarUrl: string; // "Operator" Avatar
  
  // The "North Star" (Goal)
  targetPtn: string; // e.g., "ITB"
  targetMajor: string; // e.g., "STEI-K"
  
  // 🧠 The Genius Mechanic: Dual-Layer Mastery
  // Global "Sync Rate" (Overall Readiness 0-100%)
  globalXp: number; 
  level: number; // Calculated from XP (e.g., lvl = sqrt(XP))
  
  // Subtest Proficiency (The "Skill Tree")
  // Note: Implements "Knowledge Decay" logic.
  // If (now - lastPracticed > 3 days), score degrades visually.
  mastery: {
    [subtestId: string]: { // e.g., "PU", "PPU", "PBM", "PK"
      xp: number; 
      level: number;
      lastPracticedAt: Timestamp; 
      streakDays: number; // Multiplier source
    }
  };

  // ⚔️ Rivalry System (Social)
  comparisonCohort: string; // "ITB-STEI" (Auto-generated from target)
  weeklyRivalUid: string | null; // A user with similar ELO rating assigned weekly
  
  // Meta
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  isPremium: boolean; // "Armory Access"
}
```

---

### 📅 `missions` (Collection)
**Document ID**: `mission_YYYYMMDD` (Global daily missions) or `custom_ID`
**Purpose**: The daily grind content.

```typescript
interface GlobalMission {
  date: string; // "2025-12-25"
  topic: string;
  subtest: string;
  difficulty: "EASY" | "MEDIUM" | "HARD"; // XP Multiplier
  resources: {
    type: "VIDEO" | "PDF" | "THREAD";
    url: string;
    title: string;
    estimatedMinutes: number;
  }[];
}
```

---

## 2. The Feedback Loop (Analytics)

### 📝 `user_progress` (Subcollection: `users/{uid}/progress`)
**Document ID**: `mission_ID` or `material_ID`
**Purpose**: Granular tracking of daily tasks.

```typescript
interface UserProgress {
  status: "COMPLETED" | "SKIPPED";
  completedAt: Timestamp;
  
  // 🧘 Focus Mode Metrics (The "Ghost" Data)
  timeSpentSeconds: number; // Actual time in Focus Mode
  pomodoroSessions: number; // How many 25m blocks used?
  distractions: number; // Did they pause/leave tab? (Future feature)
}
```

### 🧠 `attempts` (Collection - Top Level)
**Document ID**: Auto-generated
**Purpose**: Deep storage for Tryout/Quiz results. **(Option B: Analytic Depth)**

```typescript
interface TryoutAttempt {
  userId: string;
  tryoutId: string; // Ref to `tryouts` collection
  startedAt: Timestamp;
  finishedAt: Timestamp;
  
  // The Scoreboard
  finalScore: number; // IRT (Item Response Theory) Score if applicable
  accuracy: number; // 0-100%
  
  // 🕵️‍♀️ The "Black Box" (Deep Analytics)
  // We record EVERY interaction per question.
  answers: {
    [questionId: string]: {
      selectedOption: string; // "A", "B", etc.
      isCorrect: boolean;
      
      // "Ghost Replay" Data 👻
      timeSpentMs: number; // Did they rush or overthink?
      changedAnswerCount: number; // Did they doubt themselves? (0 = confident)
      taggedConfidence: "SURE" | "GUESS"; // (Optional user input)
    }
  }[];
  
  // SWOT Analysis (derived by Cloud Function after submit)
  weaknessTags: string[]; // ["Aljabar", "Logika-Analitik"]
}
```

---

## 3. Social Dynamics (Rankings)

### 🏆 `leaderboards` (Collection)
**Document ID**: `global_weekly` or `cohort_{cohortId}_weekly`
**Purpose**: High-performance read-heavy ranking.
*Strategy*: Updated via Cloud Functions (Scheduled or Triggered), not direct client write.

```typescript
interface Leaderboard {
  period: "WEEKLY" | "ALL_TIME";
  type: "GLOBAL" | "COHORT";
  cohortId?: string; // e.g. "ITB-STEI"
  
  // Ordered Array of Top 100 (For fast reads)
  topUsers: {
    uid: string;
    displayName: string;
    avatarUrl: string;
    score: number; // XP or Tryout Avg
    change: number; // +2 positions (Visual trend)
  }[];
}
```

---

## ☁️ Cloud Functions Strategy (Brief)

1.  **`onAttemptSubmit`**:
    *   Trigger: New doc in `attempts`.
    *   Action: Calculate IRT Score -> Update `users.mastery` -> Check for `lastPracticed` -> Update Leaderboard.
    *   *Genius Touch*: If `answer.changedAnswerCount > 2` AND `isCorrect == false`, tag as "Second-Guessing" weakness.

2.  **`midnightEntropy`** (Scheduled):
    *   Trigger: Every 24h.
    *   Action: Scan active users. If `last_practiced > 3 days`, apply Decay (-5 XP). Push notification: "Your logic skills are rusting, Operator."

3.  **`matchmakeRivals`** (Weekly):
    *   Trigger: Sunday night.
    *   Action: Find users with similar Avg Score & Target PTN. Pair them in `users.weeklyRival`.

---

## Security Rules (Simplified)
- `users`: Read (Auth), Write (Self Only).
- `attempts`: Create (Self), Read (Self), Update (No - Immutable).
- `leaderboards`: Read (Public), Write (Admin/System Only).
