# ⚡ Neural Data Pathways (Firestore Structure)

> **Architectural Philosophy**: "The Single-Breath Load"
> A standard app queries 5-10 collections to load a dashboard (User, Progress, Missions, Leaderboard, etc.).
> **Our Approach**: We treat the database like a Neural Network. Information is pre-processed and aggregated into "Synapses" (Hot Paths).
> **Result**: The Client reads **1 Document** to render the entire Dashboard. Instant load. Zero lag.

---

## 1. The "Hot Path" (Dashboard & Home)
> **Efficiency**: 99.9% Read optimization.

### 🔴 `users/{uid}/views/dashboard` (Read-Only for Client)
**Concept**: This is NOT the raw data. This is a *Projection*.
**Updated By**: Cloud Functions (`onMissionComplete`, `onMidnight`, `onRivalAction`)
**Contains**:
```json
{
  "identity": { "displayName": "Zain", "avatar": "optimus-prime.jpg", "level": 5 },
  "entropy": { 
    "currentIntegrety": 87, // Global health of knowledge
    "decayingSubtests": ["PU", "PBM"] // Alert these in UI!
  },
  "today": {
    "missionId": "20251225",
    "status": "PENDING", // PENDING | COMPLETED | FAILED
    "rivalStatus": "AHEAD" // AHEAD | BEHIND | TIED
  },
  "streak": { "current": 12, "freezeAvailable": 1 },
  "quickActions": [
    { "label": "Repair PU Logic", "action": "/focus/drill-pu", "urgency": "HIGH" }
  ]
}
```
*Client Logic*: Listen to this **ONE** document. The UI reflects the entire state of the user's "academic existence" in real-time.

---

## 2. The "Deep Memory" (Raw Data Storage)
> **Purpose**: Source of Truth, Analytics, and Write Operations.

### 📂 `users/{uid}`
- **`profile`**: Private settings, email, phone.
- **`inventory`**: Unlocked avatars, themes, items.

### 📂 `users/{uid}/academics`
- **`missions/{missionId}`**:
  - `status`: "COMPLETED"
  - `evidence`: Link to PDF/Screenshot (if required)
  - `xpEarned`: 150
  
- **`mastery/{subtestId}`** (The Skill Tree):
  - `xp`: 4500
  - `lastPracticed`: Timestamp
  - `decayFactor`: 0.0 - 1.0 (Calculated periodically)

### 📂 `users/{uid}/attempts/{attemptId}` (The Black Box)
- **Path**: `users/{uid}/attempts/tryout_ros_1`
- **Why Subcollection?**: Scales indefinitely. Easy to delete user data (GDPR).
- **Data**: Granular question logs, timing, hesitation markers.

---

## 3. The "Hive Mind" (Social & Cohort)
> **Challenge**: Leaderboards are expensive to query.
> **Solution**: Sharded Static Views.

### 🌍 `cohorts/{cohortId}/views/leaderboard_current`
**Concept**: A "Snapshot" updated every 15-60 minutes.
**Why**: We don't need real-time sorting of 10,000 users. We need a static list of Top 100.
```json
{
  "updatedAt": "2025-12-23T14:00:00Z",
  "top100": [
    { "uid": "abc", "name": "Rizki", "xp": 9900, "change": +2 },
    { "uid": "def", "name": "Siti", "xp": 9850, "change": -1 }
  ],
  "myRank": { "rank": 450, "percentile": "Top 15%" } // Injected if queried by specific user logic
}
```

### ⚔️ `rivalries/{pairId}`
**Concept**: 1v1 Isolated Battles.
**Path**: `rivalries/2025_w52_uidA_uidB`
**Data**:
```json
{
  "userA": { "uid": "uidA", "score": 150, "lastActive": "10m ago" },
  "userB": { "uid": "uidB", "score": 120, "lastActive": "2h ago" },
  "stakes": "200 XP"
}
```
*Genius Move*: Both clients subscribe to this small doc. When Rival A scores, Rival B gets a toast notification *instantly*. "Rival A just overtook you!"

---

## 4. System & Config (The Puppet Master)

### ⚙️ `sys/config`
- **`decay_rates`**: Control how fast knowledge rots per subtest.
- **`client_features`**: Kill switch for features (e.g., disable 'Live Chat' if server overloaded).
- **`prompts`**: Dynamic detailed motivators ("Academic Warlord" quotes) rotated daily without app update.

---

## Summary of Optimization
| Interaction | Standard App Cost | **StudyFlow Neural App** | Improvement |
| :--- | :--- | :--- | :--- |
| **Load Dashboard** | 7-10 Reads | **1 Read** | **10x Cheaper & Faster** |
| **Leaderboard** | N * log(N) (Heavy Query) | 1 Read (Static View) | **Infinite Scale** |
| **Rival Update** | Query User Doc | Listen 1 Shared Doc | **Real-time Latency** |

This structure shifts the "Brain" from the Phone (Client) to the Cloud (Server). The phone just displays the result of the thinking.
