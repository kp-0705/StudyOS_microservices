# StudyOS: Microservices-Based Student Management System

## Project Overview
StudyOS is a modern, containerized microservices application designed for students to manage their academic tasks and schedules. It leverages a full DevOps lifecycle, from containerized development with Docker to automated deployments using Jenkins and Kubernetes.

---

## 🏗️ Project Architecture & Flow

The application follows a **Microservices Architecture**, where each core functionality is isolated into its own service. This allows for independent scaling, deployment, and localized failures.

### 1. **Component Flow**
- **Frontend (React)**: The entry point for users. It communicates with backend services via REST APIs.
- **Auth Service (Node.js/Express)**: Manages Secure authentication.
  - *Flow*: User signs up/in -> Auth service verifies credentials -> Issues a **JWT (JSON Web Token)** -> Token is used by other services for authorization.
- **Task Service (Node.js/Express)**: Handles CRUD operations for study tasks.
  - *Flow*: User creates a task -> Frontend sends request with JWT -> Task service validates token -> Stores/Retrieves data from MongoDB.
- **Scheduler Service (Node.js/Express)**: Manages deadlines and scheduling logic.
  - *Flow*: It interacts with the Task Service to fetch upcoming deadlines and provide a structured schedule view.
- **MongoDB**: A NoSQL database that persists all application data (users, tasks, etc.). Each service can technically have its own collection or database for isolation.

---

## 🚀 How to Run the Project (End-to-End)

There are two primary ways to run the project. For a professor, showing the **Kubernetes (Minikube)** deployment is usually the most impressive as it demonstrates advanced orchestration.

### Option 1: The DevOps Way (Jenkins Pipeline)
The entire project is automated. To run the end-to-end flow:
1. **Trigger Jenkins**: Go to [Jenkins Dashboard](http://localhost:8080) and run the `study_os` pipeline.
2. **Automated Stages**:
   - **Checkout**: Pulls the latest code from GitHub.
   - **Install & Test**: Runs `npm install` and `npm test` across all services to ensure the build is healthy.
   - **Docker Build**: Packages each service into a Docker image.
   - **Load to Minikube**: Transfers the images into the Minikube environment.
   - **Kubernetes Deploy**: Applies the manifests in `k8s/` to deploy the database, services, and frontend to the cluster.
3. **Access**: Access the app at `http://localhost:30000` (NodePort) or `http://studyos.local` (Ingress).

### Option 2: Local Manual Deployment (Docker Compose)
For quick local testing without Kubernetes:
```bash
# From the root directory
docker-compose up --build
```
- Access at: `http://localhost:3000`

---

## 🛠️ DevOps & CI/CD Features
- **Containerization**: Every service has its own `Dockerfile`.
- **Orchestration**: Kubernetes manifests (Deployment, Service, Ingress, ConfigMap, PV/PVC) manage the application lifecycle.
- **Infrastructure as Code (IaC)**: Ansible playbooks are integrated for configuration management and deployment.
- **Automated Monitoring**: Post-deployment mail notifications are sent via Jenkins to keep the developer informed of the build status.

---

## 📂 Project Structure Walkthrough
- `/services`: Contains backend microservices (`auth`, `task`, `scheduler`).
- `/frontend`: The React application code.
- `/k8s`: Kubernetes YAML files for zero-downtime deployments.
- `/ansible`: Playbooks for server-side configuration.
- `Jenkinsfile`: The blueprint for the automated CI/CD pipeline.
- `docker-compose.yml`: For rapid local development setup.

---

> [!TIP]
> **Professor's Demo Focus**: Focus on the **Jenkins Pipeline** and the **Kubernetes `kubectl get all -n studyos`** command to show how the microservices are running in a resilient, managed environment.

---

## 🧹 Cleanup: ELK/EFK Stack Removal
As per the latest requirements, the **ELK/EFK (Elasticsearch, Filebeat, Kibana)** logging stack has been completely removed from the project.
- Deleted all Kubernetes manifests in `k8s/logging/`.
- Removed the `logging` namespace and associated storage configurations.
- Verified that no service-level dependencies on the logging stack remain.

> [!NOTE]
> The logging stack can be re-integrated in the future if centralized logging is required again.
