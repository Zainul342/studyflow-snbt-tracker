# Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string email
        string name
        datetime createdAt
        datetime updatedAt
    }
    
    UserProfile {
        string id PK
        string userId FK
        string targetUniversity
        string targetMajor
        datetime targetDate
        integer dailyGoalHours
        datetime createdAt
        datetime updatedAt
    }
    
    Subtes {
        string id PK
        string name
        string code
        integer order
        string description
    }
    
    Materi {
        string id PK
        string subtesId FK
        string name
        string code
        integer order
    }
    
    Submateri {
        string id PK
        string materiId FK
        string name
        string code
        integer order
        boolean isAdvanced
    }
    
    UserProgress {
        string id PK
        string userId FK
        string submateriId FK
        boolean belajar
        boolean latsol
        boolean review
        datetime lastUpdated
        index userId_submateriId
    }
    
    TryoutSession {
        string id PK
        string userId FK
        datetime testDate
        string platform
        json scores
        decimal averageScore
        datetime createdAt
    }
    
    StudyTask {
        string id PK
        string userId FK
        string submateriId FK
        string title
        text description
        string status
        datetime dueDate
        datetime completedAt
        text aiFeedback
        string sourcePlatform
        string sourceId
        datetime createdAt
    }
    
    Achievement {
        string id PK
        string userId FK
        string type
        string title
        string description
        integer points
        datetime unlockedAt
        json metadata
    }
    
    StudyMaterial {
        string id PK
        string submateriId FK
        string type
        string title
        string url
        string platform
        integer estimatedDuration
        datetime publishedAt
        boolean isActive
    }
    
    User ||--o{ UserProfile : has
    User ||--o{ UserProgress : tracks
    User ||--o{ TryoutSession : records
    User ||--o{ StudyTask : assigned
    User ||--o{ Achievement : unlocks
    
    Subtes ||--o{ Materi : contains
    Materi ||--o{ Submateri : contains
    Submateri ||--o{ UserProgress : tracked_in
    Submateri ||--o{ StudyTask : referenced_in
    Submateri ||--o{ StudyMaterial : has