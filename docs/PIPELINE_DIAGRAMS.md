# EcoCycle Pipeline Diagrams (Compact for 5-Page Report)

**Use ONLY these 2 compact diagrams in your report.**

---

## Diagram 1: Overall CI/CD Pipeline (Section 3.1)

```mermaid
graph LR
    A[Developer Push/PR] --> B[CI Pipeline<br/>7 Stages]
    B --> C{Quality<br/>Gates Pass?}
    C -->|No| D[❌ Failed]
    C -->|Yes| E[Build & Push<br/>to Docker Hub]
    E --> F{release/*<br/>branch?}
    F -->|No| G([CI Complete])
    F -->|Yes| H[CD Staging]
    H --> I{Healthy?}
    I -->|No| J[Rollback]
    I -->|Yes| K[✅ Staging OK]
    K --> L{Deploy to<br/>Production?}
    L -->|No| M([Done])
    L -->|Yes| N[CD Production]
    N --> O{Healthy?}
    O -->|No| J
    O -->|Yes| P[✅ Production OK]
    
    style B fill:#fff4e6
    style E fill:#e6f3ff
    style H fill:#f0e6ff
    style N fill:#e6ffe6
    style D fill:#ffcccc
    style J fill:#fff3cd
    style K fill:#d4edda
    style P fill:#d4edda
```

**Pipeline Stages:** Validation → Code Quality (Checkstyle) → Testing (JUnit/JaCoCo) → Static Analysis (SpotBugs) → Security (OWASP/Hadolint/Trivy) → Docker Build → Summary

---

## Diagram 2: CD Deployment Flow (Section 3.3)

```mermaid
graph TB
    A[CI Success] --> B[Ansible Deploy]
    B --> C[Role: common<br/>Docker + Firewall]
    C --> D[Role: deploy<br/>Pull & Start]
    D --> E[Role: healthcheck<br/>Verify Services]
    E --> F{All<br/>Healthy?}
    F -->|Yes| G[✅ Deployed]
    F -->|No| H[Rollback]
    H --> I[Restore Previous<br/>Version]
    
    style B fill:#fff4e6
    style C fill:#e1f5ff
    style D fill:#ffe6e6
    style E fill:#f0e6ff
    style G fill:#d4edda
    style H fill:#fff3cd
```

**Ansible Roles:** common (VM setup), deploy (container deployment), healthcheck (service verification)

---

## How to Use

### Copy into Report (Recommended)
1. Copy Diagram 1 code → Paste in PROJECT_REPORT.md Section 3.1
2. Copy Diagram 2 code → Paste in PROJECT_REPORT.md Section 3.3

### Alternative: Export as Image
1. Go to https://mermaid.live
2. Paste the diagram code
3. Export as PNG (smaller file size for PDF)
4. Insert image in your report

---

## Optional: Text-Only Flow (if diagrams still too large)

If the diagrams make your report too long, use this simple text description instead:

**CI/CD Pipeline Flow:**
```
Developer Push → CI (7 stages) → Quality Gates → Docker Build → Docker Hub
                                       ↓ (if pass)
                              CD Staging → Health Check → ✅ Success
                                       ↓ (if approved)
                              CD Production → Health Check → ✅ Success
                                       ↓ (if fail)
                                    Rollback
```

**CD Deployment:**
```
CI Success → Ansible (3 roles) → Health Check
   ↓            ↓                    ↓
Setup VM → Deploy Containers → Verify → ✅ Success or ⚠️ Rollback
```

---

**That's it! Just 2 compact diagrams that fit nicely in a 5-page report.**
