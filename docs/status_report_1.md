# Status Report 1 — EcoCycle Project
**Team Members:**
- **Manav Shah (mdshah5)**
- **Yuvraj Singh Bhatia (ybhatia2)**

---

## 1. Accomplishments

During this sprint, we completed the foundational setup for the EcoCycle DevOps Reinforcement project, focusing on repository architecture, branch strategy, and secure environment preparation for our CI/CD pipeline.  
Our work lays the groundwork for automated builds, testing, and deployment in later stages.

### Technical Accomplishments
- **Initialized project repository** `EcoCycle-DevOps-Reinforcement` with complete microservice folder structure:
  - `marketplace-service/`, `transaction-service/`, `user-service/` (each with Dockerfile + Maven pom).
  - Added `/ansible/` folder with sub-directories for `inventory/`, `roles/`, and templates.
  - Added `/github/workflows/` directory for upcoming CI/CD pipeline YAMLs.
- **Configured protected branches**:
  - `main` → production only (PR + status checks + no force-push).
  - `develop` → integration branch for active work.
  - `release/*` → triggers automated deployment.
- **Added GitHub Actions secrets** for secure deployment:
  - `GHCR_USERNAME`, `GHCR_TOKEN`, `SSH_PRIVATE_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`
- **Created initial README, .gitignore, and project board** (`To Do → In Progress → Review → Done`) for task tracking.
- **Connected NCSU VM** (`csc519-###-host.csc.ncsu.edu`) as the unified deployment target; verified Docker installation and SSH access.
- **Linked Ansible and Docker Compose design** to ensure future blue-green deployment compatibility.

### Example Non-Trivial Commits
- [Manav Shah — Initial repo structure & CI Workflow.](https://github.ncsu.edu/mdshah5/ecocycle-project/commit/59d1ca3a4036cc82e20d0954aa589977fa6cf2b7)
- [Yuvraj Bhatia — Ansible inventory and branch protection rules.](https://github.ncsu.edu/mdshah5/ecocycle-project/commit/868ac7ec63f230554705559e707f22604190dc51)


---

## 2. Next Steps (Next Sprint Plan)

| Team Member       | Planned Work                                               | Details / Est. Effort                                                                                                                                             |
|-------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Manav Shah**    | Implement **Continuous Integration (CI) Workflow**        | Implement `.github/workflows/ci.yml`. Build + test + static analysis + security scan + push Docker images to GHCR. Estimate ~ 8 hours.                            |
| **Yuvraj Bhatia** | Implement **Continuous Deployment (CD) Staging Workflow** | Develop Ansible playbook (`roles/deploy/tasks/main.yml`) and `cd_staging.yml` to deploy tested images to VM host using blue/green strategy. Estimate ~ 10 hours. |
| **Both**          | **Documentation and Testing**                    | Estimate ~ 4 hours.                                                                                                                                               |

Both members will jointly verify environment provisioning, health checks, and rollback behavior on the VM host.

---

## 3. Retrospective for the Sprint

### What Worked
- Clear division of responsibilities (repo setup vs deployment structure).
- Smooth creation of each microservice.
- GitHub project board improved transparency in task progress.
- Early branch-protection rules prevented accidental direct commits to main.

### What Didn’t Work
- VM access from home was not supportive. Had to troubleshoot several times and use VPN.
- Faced issues in running the CI workflow.
- Faced challenges to configure the public key set up at the VM.

### Improvements for Next Sprint
- Smooth functioning of CI/CD workflow across all environments.
- Schedule shorter, daily syncs between team members to keep pipeline work in sync.
- Begin automated testing and security scan integration early to avoid last-minute pipeline errors.
