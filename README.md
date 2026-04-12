# StudyOS: Microservices-Based Student Management System

[![Build Status](https://img.shields.io/badge/Jenkins-Build%20Success-brightgreen)](http://localhost:8080)
[![Technologies](https://img.shields.io/badge/Stack-Node.js%20%7C%20React%20%7C%20MongoDB-blue)](https://github.com/kp-0705/StudyOS_microservices)
[![Deployment](https://img.shields.io/badge/Deploy-Kubernetes%20%26%20Ansible-orange)](https://github.com/kp-0705/StudyOS_microservices)

## 📖 Project Overview
StudyOS is a robust, production-grade microservices application designed to help students manage their academic workloads. The project demonstrates a full modern DevOps lifecycle, integrating containerization, automated CI/CD, and cloud-native orchestration.

---

## 🏗️ Architecture & Flow

The system is built on a **Microservices Architecture**, ensuring scalability and fault isolation.

### Core Components
- **Frontend (React)**: Modern dashboard for student interactions.
- **Auth Service (Node.js/Express)**: Handles secure user registration and JWT-based authentication.
- **Task Service (Node.js/Express)**: Manages CRUD operations for academic tasks.
- **Scheduler Service (Node.js/Express)**: Logic for deadline tracking and calendar scheduling.
- **Database (MongoDB)**: Scalable NoSQL storage for user data and task management.

---

## 🚀 Deployment Options

### 1. **Kubernetes (Minikube) Deployment** (Recommended)
This uses the full orchestration layer with Kubernetes manifests.

1. **Start Minikube**:
   ```bash
   minikube start --driver=docker
   ```
2. **Apply Manifests**:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/
   ```
3. **Access the App**:
   - Ingress: `http://studyos.local`
   - NodePort: `http://localhost:30000`

### 2. **Docker Compose** (Local Development)
Ideal for rapid development and testing.

```bash
docker-compose up --build
```
Access at: `http://localhost:3000`

### 3. **Ansible Deployment**
Used for configuration management on Ubuntu servers.

```bash
ansible-playbook -i ansible/inventory.ini ansible/playbooks/deploy.yml
```

---

## ⚙️ CI/CD Pipeline (Jenkins)
The project features a fully automated Jenkins pipeline (`Jenkinsfile`) that handles:
- **Code Checkout**: Pulls from GitHub.
- **Quality Gates**: Automated testing for both frontend and backend services.
- **Image Management**: Docker builds and local registry pushes.
- **K8s Orchestration**: Automated rollout to Minikube.
- **Notifications**: Real-time email status updates (Success/Failure).

---

## 📂 Repository Structure
- `/services`: Backend microservices (Auth, Task, Scheduler).
- `/frontend`: React frontend application.
- `/k8s`: Kubernetes Deployment, Service, and Ingress manifests.
- `/ansible`: Playbooks for automated infrastructure setup.
- `Jenkinsfile`: Pipeline as Code definition.
- `docker-compose.yml`: Local multi-container orchestration.

---

## 🛠️ Tech Stack
- **Frontend**: React, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **DevOps**: Docker, Kubernetes (Minikube), Jenkins, Ansible, Git

---

## 👥 Contributors
- **Kartavya Patel** ([kp-0705](https://github.com/kp-0705))

---

*This project was developed for the SPE Final Submission.*
