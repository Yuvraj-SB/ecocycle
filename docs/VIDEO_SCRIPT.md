# EcoCycle DevOps Project - Video Presentation Script (2-4 minutes)

**Target Duration**: 3-4 minutes (Hard limit: 5 minutes)  
**Structure**: Follow the Pipeline Figure from the report

---

## 🎬 **SCENE 1: Introduction (15-20 seconds)**

### What to Say:
> "Hi, I'm [Name]. This is our EcoCycle DevOps project - a fully automated CI/CD pipeline for a microservices marketplace application. We'll walk through how a single code change triggers automated quality gates, security scans, and deployments to staging and production."

### What to Show:
- **Screen**: Show the pipeline diagram from `PIPELINE_DIAGRAMS.md` (Diagram 1)
- **Highlight**: Point to the flow: Developer → CI → CD Staging → CD Production

**Timing**: 0:00 - 0:20

---

## 🎬 **SCENE 2: The Trigger Event (20-30 seconds)**

### What to Say:
> "Let's start with a code change. I'm creating a pull request to the main branch. This automatically triggers our 7-stage CI pipeline."

### What to Show:
1. **GitHub**: Open your repository
2. **Show**: Create a PR or show an existing PR
3. **Show**: GitHub Actions tab - CI workflow starting
4. **Highlight**: The workflow trigger (pull_request event)

**Screen Recording**:
```
1. Navigate to: https://github.ncsu.edu/mdshah5/ecocycle-project
2. Click "Pull Requests" tab
3. Show a PR (or create one quickly)
4. Click "Actions" tab
5. Show the CI workflow running
```

**Timing**: 0:20 - 0:50

---

## 🎬 **SCENE 3: CI Pipeline - Quality Gates (45-60 seconds)**

### What to Say:
> "Our CI pipeline has 7 stages. First, we validate the project structure and cache Maven dependencies - this speeds up builds by 80%. Then we run Checkstyle for code quality, JUnit tests with JaCoCo coverage, and SpotBugs for static analysis."

### What to Show:
1. **GitHub Actions**: Click on the running CI workflow
2. **Show**: The 7 jobs running in parallel/sequence
3. **Highlight**: 
   - ✅ Validation (green checkmark)
   - ✅ Code Quality (green checkmark)
   - ✅ Test (green checkmark)
   - ✅ Static Analysis (green checkmark)

**Screen Recording**:
```
1. Click on the CI workflow run
2. Show the job list on the left
3. Scroll through to show all 7 stages
4. Click on "Test" job to show JaCoCo coverage
```

**Timing**: 0:50 - 1:50

---

## 🎬 **SCENE 4: Security Scanning (30-40 seconds) - IMPORTANT FOR EXTRA CREDIT**

### What to Say:
> "Stage 5 is our security scanning - this is where we shine. We have three layers: OWASP Dependency Check scans for vulnerable dependencies with CVE detection, Hadolint checks our Dockerfiles for security best practices, and Trivy scans our Docker images for critical vulnerabilities. Any high-severity issue fails the pipeline immediately."

### What to Show:
1. **GitHub Actions**: Click on "Security Scanning" job
2. **Show**: 
   - OWASP Dependency Check output
   - Hadolint scanning Dockerfiles
   - Trivy scanning Docker images
3. **Highlight**: "All scans passed" or show a report artifact

**Screen Recording**:
```
1. Click "Security Scanning" job
2. Expand the steps:
   - "Run OWASP Dependency Check"
   - "Run Hadolint"
   - "Run Trivy"
3. Show the output (even if brief)
4. Scroll to show "✓ Security scans completed"
```

**Pro Tip**: If you have time, download and show an OWASP or Trivy report artifact

**Timing**: 1:50 - 2:30

---

## 🎬 **SCENE 5: Docker Build & Push (15-20 seconds)**

### What to Say:
> "Once all quality gates pass, we build multi-stage Docker images with non-root users for security, and push them to Docker Hub with automatic tagging."

### What to Show:
1. **GitHub Actions**: Show "Build & Push Docker Images" job
2. **Show**: Docker build logs (briefly)
3. **Switch to**: Docker Hub (https://hub.docker.com)
4. **Show**: Your images: `manavshah13/ecocycle-marketplace`, `ecocycle-users`, etc.
5. **Highlight**: The tags (latest, sha-xxx)

**Screen Recording**:
```
1. Show Docker build job (briefly)
2. Open Docker Hub in new tab
3. Navigate to your repositories
4. Show the 4 images with recent timestamps
```

**Timing**: 2:30 - 2:50

---

## 🎬 **SCENE 6: Ansible Setup & CD Staging (30-40 seconds)**

### What to Say:
> "With CI complete, our CD pipeline deploys to staging using Ansible. We have three roles: 'common' sets up the VM with Docker and firewall rules, 'deploy' pulls the images and starts containers, and 'healthcheck' verifies all services are healthy."

### What to Show:
1. **GitHub Actions**: Show CD Staging workflow
2. **Show**: 
   - SSH configuration step
   - Ansible ping (connectivity test)
   - "Run Ansible Playbook" step
3. **Highlight**: The three roles executing
4. **Show**: Health check success

**Screen Recording**:
```
1. Go to Actions tab
2. Click on "CD Staging" workflow
3. Show the workflow steps:
   - "Configure SSH"
   - "Test Ansible Connection"
   - "Deploy to Staging"
4. Expand "Deploy to Staging" to show Ansible output
5. Scroll to show "PLAY RECAP" with success
```

**Timing**: 2:50 - 3:30

---

## 🎬 **SCENE 7: Deployed Running System (30-40 seconds)**

### What to Say:
> "Let's verify the deployed system. Here's our staging environment - all four services are running. I'll hit the health endpoints to confirm they're healthy. The frontend is serving our marketplace UI, and all three backend microservices are responding."

### What to Show:
1. **Terminal or Browser**: 
   - SSH into your VM: `ssh deploy@<your-vm-ip>`
   - Run: `docker ps` to show running containers
   
2. **Browser**: Open your deployed application
   - Frontend: `http://<vm-ip>:80` (staging) or `:8080` (production)
   - Show the EcoCycle UI
   
3. **Browser/Postman**: Test health endpoints
   - `http://<vm-ip>:8081/actuator/health` (Marketplace)
   - `http://<vm-ip>:8082/actuator/health` (Users)
   - `http://<vm-ip>:8083/actuator/health` (Transactions)
   - Show JSON response: `{"status":"UP"}`

**Screen Recording**:
```
1. Open terminal, SSH to VM
2. Run: docker ps
3. Show 7 containers running (4 services + 3 databases)
4. Open browser
5. Navigate to frontend URL
6. Show the EcoCycle homepage
7. Open new tabs for health endpoints
8. Show "status: UP" responses
```

**Timing**: 3:30 - 4:10

---

## 🎬 **SCENE 8: Special Features & Conclusion (20-30 seconds)**

### What to Say:
> "What makes our pipeline special? We implemented 12+ security features including container hardening, vulnerability scanning, firewall configuration, and secrets management. We also have automated rollback capabilities if deployment fails. This pipeline reduced our deployment time from 2+ hours to 15 minutes while ensuring security and reliability at every step."

### What to Show:
1. **Quick montage** (5 seconds each):
   - Show Ansible firewall configuration file
   - Show a Dockerfile with non-root user
   - Show docker-compose.prod.yml with resource limits
   - Show GitHub Secrets page (Settings → Secrets)

2. **Final Screen**: Show the complete pipeline diagram again

**Screen Recording**:
```
1. VS Code: Open ansible/roles/common/tasks/main.yml
   - Scroll to UFW firewall section (lines 104-128)
2. VS Code: Open marketplace-service/Dockerfile
   - Show USER ecocycle line
3. VS Code: Open docker-compose.prod.yml
   - Show resource limits
4. GitHub: Settings → Secrets and variables → Actions
   - Show the secrets list (names only, not values)
5. Show pipeline diagram (final slide)
```

**Timing**: 4:10 - 4:40

---

## 🎬 **SCENE 9: Closing (10-15 seconds)**

### What to Say:
> "That's our EcoCycle CI/CD pipeline. Questions?"

### What to Show:
- **Screen**: Your GitHub repository homepage or the README
- **Optional**: Your names and contact info

**Timing**: 4:40 - 4:50

---

## 📋 **PREPARATION CHECKLIST**

### Before Recording:
- [ ] Ensure CI pipeline has a recent successful run
- [ ] Ensure CD staging has a recent successful deployment
- [ ] Verify services are running on VM (`docker ps`)
- [ ] Test all health endpoints in browser
- [ ] Open all necessary tabs/windows beforehand
- [ ] Practice the script 2-3 times
- [ ] Set browser zoom to 125-150% for visibility
- [ ] Close unnecessary browser tabs/notifications

### Files to Have Open:
- [ ] GitHub repository (Actions tab)
- [ ] Docker Hub (your repositories)
- [ ] VS Code with project open
- [ ] Terminal (SSH to VM ready)
- [ ] Browser tabs for health endpoints
- [ ] Pipeline diagram (PIPELINE_DIAGRAMS.md)

### Recording Setup:
- [ ] Use screen recording software (OBS, Zoom, Loom, or built-in)
- [ ] Record at 1080p resolution
- [ ] Use a good microphone (clear audio is critical)
- [ ] Speak clearly and at moderate pace
- [ ] Use cursor highlighting if possible
- [ ] Zoom in on important text/code

---

## 🎯 **KEY POINTS TO EMPHASIZE**

### Must Mention (for grading):
1. ✅ **Initial Event Trigger**: Pull request or push event
2. ✅ **Ansible Setup**: Three roles (common, deploy, healthcheck)
3. ✅ **Quality Gates**: 7 stages with specific tools
4. ✅ **Security Features**: OWASP, Trivy, Hadolint (12+ total features)
5. ✅ **Deployed System**: Show running containers and health endpoints

### What Makes Your Pipeline Awesome:
- 🔒 **12+ security features** (extra credit)
- ⚡ **80% faster builds** (Maven caching)
- 🔄 **Automated rollback** capability
- 🏗️ **Multi-stage Docker builds** (60% smaller images)
- 🔥 **Self-hosted runner** for full control
- 🎯 **Health checks** prevent broken deployments

---

## 🎥 **RECORDING TIPS**

### Do:
- ✅ Speak confidently and clearly
- ✅ Use "we" (team effort)
- ✅ Point out specific line numbers when showing code
- ✅ Explain WHY, not just WHAT (e.g., "This prevents privilege escalation")
- ✅ Show enthusiasm about your work
- ✅ Keep transitions smooth between scenes

### Don't:
- ❌ Rush through important parts
- ❌ Say "um" or "uh" excessively (edit these out)
- ❌ Show sensitive information (passwords, tokens)
- ❌ Spend too long on any one section
- ❌ Go over 5 minutes (hard limit)
- ❌ Forget to show the deployed running system

---

## ⏱️ **TIMING BREAKDOWN**

| Scene | Duration | Cumulative |
|-------|----------|------------|
| 1. Introduction | 20s | 0:20 |
| 2. Trigger Event | 30s | 0:50 |
| 3. CI Quality Gates | 60s | 1:50 |
| 4. Security Scanning | 40s | 2:30 |
| 5. Docker Build | 20s | 2:50 |
| 6. Ansible CD | 40s | 3:30 |
| 7. Running System | 40s | 4:10 |
| 8. Special Features | 30s | 4:40 |
| 9. Closing | 10s | 4:50 |

**Total**: ~4:50 (within 5-minute limit)

---

## 🔗 **QUICK REFERENCE URLS**

### GitHub (replace with your actual URLs):
- Repository: `https://github.ncsu.edu/mdshah5/ecocycle-project`
- CI Workflow: `https://github.ncsu.edu/mdshah5/ecocycle-project/actions/workflows/ci.yml`
- CD Staging: `https://github.ncsu.edu/mdshah5/ecocycle-project/actions/workflows/cd_staging.yml`

### Docker Hub:
- Your images: `https://hub.docker.com/u/manavshah13`

### Deployed Application (replace with your VM IP):
- Frontend: `http://<vm-ip>:80` (staging) or `:8080` (production)
- Marketplace Health: `http://<vm-ip>:8081/actuator/health`
- Users Health: `http://<vm-ip>:8082/actuator/health`
- Transactions Health: `http://<vm-ip>:8083/actuator/health`

---

## 🎬 **ALTERNATIVE: SHORTER 2-MINUTE VERSION**

If you need to cut down to 2 minutes:

1. **Introduction** (15s): Quick overview
2. **Trigger + CI** (30s): Show PR trigger and CI stages running
3. **Security Scanning** (25s): Emphasize OWASP, Trivy, Hadolint
4. **CD Deployment** (25s): Show Ansible deployment
5. **Running System** (20s): Show docker ps + health endpoints
6. **Closing** (5s): Quick summary

**Total**: 2:00

---

## 📝 **FINAL NOTES**

- **Practice makes perfect**: Run through the script 2-3 times before recording
- **Have a backup plan**: If something doesn't work during recording, have screenshots ready
- **Edit if needed**: Use video editing software to cut mistakes or add text overlays
- **Add captions**: Consider adding text overlays for key terms (OWASP, Trivy, Ansible)
- **Background music**: Optional, but keep it subtle if you add it

**Good luck with your video! 🎉**

