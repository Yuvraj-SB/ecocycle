# Status Report 2 — EcoCycle Project
**Team Members:**
- **Manav Shah (mdshah5)**
- **Yuvraj Singh Bhatia (ybhatia2)**

---

## 1. Accomplishments

During this sprint, we successfully implemented a **complete Continuous Integration (CI) pipeline** and **automated Continuous Deployment (CD) infrastructure for staging environment** using GitHub Actions and Ansible. Our work transforms the EcoCycle project from manual deployment to an automated DevOps pipeline.

### Technical Accomplishments

#### **Manav Shah's Contributions:**

- **Implemented Complete CI Pipeline** (`.github/workflows/ci.yml`):
  - Multi-job pipeline with 7 sequential stages: validation → code quality → testing → static analysis → security scanning → Docker builds → build summary.
  - Integrated Checkstyle, SpotBugs, for comprehensive code quality and security scanning.
  - Configured JUnit testing with JaCoCo code coverage.
  - Set up Docker Hub integration with automated image building and tagging.
  - Resolved self-hosted runner compatibility issues (Node.js versions, Docker permissions).

- **Infrastructure Improvements and Ansible Infrastructure Automation**:
  - Migrated from GitHub Container Registry to Docker Hub for accessibility.
  - Configured Maven plugins (Checkstyle, Spotless, JaCoCo) across all services.
  - Created three Ansible roles: `common` (VM provisioning), `deploy` (application deployment), and `healthcheck` (service verification).

#### **Yuvraj Singh Bhatia's Contributions:**

- **Ansible Infrastructure Automation**:
  - Developed deployment playbooks: `deploy_staging.yml`.
  - Implemented automated VM setup with Docker installation, directory structure, and environment configuration.
  - Created inventory files for staging and production environments with environment-specific variables.

- **Frontend Development**:
  - Created complete frontend project with HTML, CSS, and JavaScript for EcoCycle marketplace.
  - Implemented user authentication UI (login/register) with API integration.
  - Developed service integration for all three microservices (Users, Marketplace, Transactions).
  - Created Dockerfile with Nginx for frontend containerization.
  - Built interactive UI for testing and accessing backend services.

### Value Delivered

- **Automated Quality Gates**: Every code change automatically goes through linting, testing, static analysis, and security scanning.
- **Consistent Deployments**: Ansible automation ensures identical deployment processes across environments.
- **Infrastructure Reproducibility**: VM setup is now automated and repeatable, reducing setup time significantly.

### Example Non-Trivial Commits

- [Manav Shah — Complete CI pipeline with quality gates and security scanning.](https://github.ncsu.edu/mdshah5/ecocycle-project/commit/1320d125e35a7a5c644fd9e6309342448c7112e6)

- [Yuvraj Bhatia — Frontend Development and Ansible automation for VM provisioning and deployment.](https://github.ncsu.edu/mdshah5/ecocycle-project/commit/403396fce31ed0f59d3a262cdc4c048e2514bf1c)
---

## 2. Next Steps (Next Sprint Plan)

| Team Member       | Planned Work                                               | Details / Est. Effort                                                                                                                                             |
|-------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Manav Shah**    | **CD Pipeline Integration & Monitoring**                    | Implement GitHub Actions CD workflow (`.github/workflows/cd.yml`) for staging that triggers Ansible deployment on successful CI. Integrate with Ansible playbooks via SSH. Add deployment notifications and status reporting (if time permits). Estimate ~ 8 hours. |
| **Yuvraj Bhatia** | **Blue-Green Deployment & Advanced Ansible Features**      | Implement GitHub Actions CD workflow (`.github/workflows/cd.yml`) for production  that triggers Ansible deployment on successful CI. Implement blue-green deployment strategy. Add monitoring integration (Prometheus/Grafana if time permits). Estimate ~ 10 hours. |
| **Both**          | **End-to-End Testing & Documentation**                     | Test complete CI/CD pipeline from PR to production deployment. Create deployment runbooks. Document rollback procedures. Verify all error scenarios (failed tests, security issues, health check failures). Estimate ~ 7 hours. |

Both members will jointly verify the complete CI/CD pipeline end-to-end, test rollback scenarios, and ensure production deployment safety measures are working correctly.

---

## 3. Retrospective for the Sprint

### What Worked

- Manav focused on CI pipeline while Yuvraj focused on CD automation, enabling parallel development.
- Docker-based CI execution ensured consistent build environments.
- Ansible role-based architecture made deployment code reusable and maintainable.
- Docker Hub migration resolved accessibility issues with GitHub Enterprise.

### What Didn't Work

- GitHub Container Registry was not accessible on GitHub Enterprise, requiring migration to Docker Hub mid-sprint.
- Self-hosted runner compatibility issues (Node.js 24 not supported) required downgrading to compatible versions.
- Docker permission problems and `/tmp` directory access issues caused initial build failures.
- Initial Ansible Docker module conflicts required switching to `community.docker.docker_compose_v2`.

### Improvements for Next Sprint

- Test Docker Hub access and self-hosted runner compatibility at sprint start to avoid mid-sprint migrations.
- Integrate Ansible playbooks directly into GitHub Actions CD workflow for seamless automation.
- Add basic monitoring for health check dashboards and deployment status tracking.
- Implement blue-green deployment strategy for zero-downtime deployments.


