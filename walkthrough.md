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

## 💡 Innovative Solutions & Unique Approaches
- **Ansible and Vault Driven Deployments**: Kubenetes manifests are deployed securely through Ansible roles natively triggered by Jenkins, preventing plaintext secrets and direct kubectl dependencies in the pipeline.
- **Resource Constraints Tuning**: The ELK stack has been heavily optimized for Minikube, capping the JVM and Node.js environments to prevent memory thrashing.
- **Kubernetes HPA (Horizontal Pod Autoscaling)**: Microservices are equipped with HPA to scale efficiently during peak loads automatically.

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
Execute the standard Docker Compose command with the build flag from the root directory to stand up the local environment.
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

## 🎤 Viva Presentation Guide

When presenting this project to an examiner, follow this structured flow to maximize your marks and demonstrate your understanding of modern software engineering.

### 1. The Pitch (1 Minute)
*   **Start with**: "My project is StudyOS. It's a student management system built using a modern DevOps lifecycle and a Microservices architecture."
*   **Highlight**: "The goal wasn't just to write code, but to demonstrate how software is tested, containerized, and orchestrated in the real world using Docker, Jenkins, and Kubernetes."

### 2. Show the Automation (CI/CD & Tests)
*   **The Jenkinsfile**: Open Jenkins and show them a successful pipeline run. Explain that Jenkins automatically pulls code, runs tests, builds images, and deploys.
*   **Unit Testing (Quality Gate)**:
    *   Open `services/auth-service/src/__tests__/app.test.js`.
    *   Show how you use `jest` and `supertest` to automatically verify the health of your API endpoints.
    *   Run `npm test` inside the `auth-service` folder to show a live, passing test.

### 3. Show Kubernetes Orchestration (Live Demo)
*   **Run**: Execute the standard Kubernetes command to list all resources within the `studyos` namespace.
    *   *Explain*: "These are my independent microservices running as pods. Unlike a monolith, if one crashes, the others survive."
*   **Demonstrate Self-Healing**:
    *   Find a pod name and forcefully delete it using the Kubernetes pod deletion command within the specific namespace.
    *   Run the command to watch the pods in real-time, showing Kubernetes instantly spinning up a replacement pod.

### 4. ELK Logging Stack (Optimization & Monitoring)
*   **Run**: List all pods within the `logging` namespace to demonstrate the stack's status.
*   **Explain**: We implemented an ELK (Elasticsearch, Filebeat, Kibana) stack for centralized logging. 
*   **Highlight**: Mention that you heavily optimized the memory usage (e.g., restricting Elasticsearch heap to 256MB and Kibana Node.js limit to 512MB) to ensure the stack runs stably in a resource-constrained Minikube environment.

### 5. Common Viva Questions
*   **Q: Why use Kubernetes if you have Docker?**
    *   **A:** Docker just runs containers. Kubernetes is an orchestrator that manages them—handling auto-scaling, load balancing, and self-healing when they crash.
*   **Q: Why Microservices instead of a Monolith?**
    *   **A:** For fault isolation (one service crashing doesn't bring down the whole app) and independent scaling (you can scale just the Scheduler without scaling the Auth service).

---

## ☁️ Finalizing and Pushing Code to GitHub
To push all these final changes (optimized ELK manifests and new test cases) to your remote repository, execute the necessary Git commands to create a new branch (e.g., `FUll_SPE_project`), stage all changes, commit them with a descriptive message, and push the branch upstream to the origin repository.
