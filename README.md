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

1. **Start Minikube**: Initialize your Minikube environment using the appropriate driver (such as docker) to simulate the Kubernetes cluster locally.
2. **Apply Manifests**: Deploy the foundational namespace manifest followed by all other configuration, storage, and service manifests located in the k8s directory using the standard Kubernetes application command.
3. **Access the App**:
   - Ingress: `http://studyos.local`
   - NodePort: `http://localhost:30000`

### 2. **Docker Compose** (Local Development)
Ideal for rapid development and testing.

Ideal for rapid development and testing.

Use the Docker Compose tool with the build flag to orchestrate and run the multi-container setup locally based on the provided configuration file.
Access at: `http://localhost:3000`

### 3. **Ansible Deployment**
Used for configuration management on Ubuntu servers.

Used for configuration management on Ubuntu servers.

Execute the Ansible playbook specifically designed for deployment, pointing it to the inventory file to target the correct hosts.

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

## 💡 Innovative Solutions & Unique Approaches

This project implements several advanced DevOps practices:
- **Centralized Deployment via Ansible and Jenkins**: Instead of coupling deployment manifests directly into CI/CD logic, Ansible Roles and Ansible Vault are utilized to decouple orchestration and securely manage secrets, triggered seamlessly by the Jenkins Pipeline.
- **Resource Optimization in Minikube**: To ensure stable ELK stack logging within a constrained Minikube environment, aggressive Java Heap memory limits and Node.js limits were applied, alongside fine-tuned resource quotas.
- **Microservices Fault Tolerance & Autoscaling**: The architecture leverages Kubernetes Horizontal Pod Autoscaler (HPA) to dynamically adjust pod counts based on CPU and memory utilization, ensuring robust performance under fluctuating loads.
- **End-to-End Test Automation Quality Gates**: The pipeline guarantees code quality by ensuring test scripts are reliably executed as a prerequisite quality gate before image build and container registry push.

---

*This project was developed for the SPE Final Submission.*
