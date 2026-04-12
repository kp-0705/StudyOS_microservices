pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'kp0705'
        KUBECONFIG = '/home/kartavya-patel/.kube/config'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies for all services...'
                dir('services/auth-service') {
                    sh 'npm install'
                }
                dir('services/task-service') {
                    sh 'npm install'
                }
                dir('services/scheduler-service') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running frontend tests...'
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm test -- --watchAll=false --passWithNoTests'
                }

                echo 'Running backend service checks...'

                dir('services/auth-service') {
                    sh 'npm install'
                    sh 'npm test'
                }

                dir('services/task-service') {
                    sh 'npm install'
                    sh 'npm test'
                }

                dir('services/scheduler-service') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Load Images to Minikube') {
            steps {
                echo 'Loading images into Minikube...'
                sh '''
                    minikube image load student-task-pipeline-auth-service:latest
                    minikube image load student-task-pipeline-task-service:latest
                    minikube image load student-task-pipeline-scheduler-service:latest
                    minikube image load student-task-pipeline-frontend:latest
                '''
            }
        }

        stage('Ansible Deploy') {
            steps {
                echo 'Deploying with Ansible...'
                sh 'ansible-playbook -i ansible/inventory.ini ansible/playbooks/deploy.yml'
            }
        }

        stage('Minikube Health Check') {
            steps {
                echo 'Checking Minikube status...'
                sh '''
                    # Check if minikube is running
                    MINIKUBE_STATUS=$(minikube status --format='{{.Host}}' 2>/dev/null || echo "Stopped")
                    echo "Minikube Host Status: $MINIKUBE_STATUS"

                    if [ "$MINIKUBE_STATUS" != "Running" ]; then
                        echo "⚠️  Minikube is not running. Starting Minikube..."
                        minikube start --driver=docker
                    fi

                    # Ensure kubectl context is set to minikube
                    kubectl config use-context minikube

                    # Wait for API server to be responsive
                    echo "Waiting for Kubernetes API server to be reachable..."
                    timeout 60s bash -c 'until kubectl cluster-info; do echo "Waiting for cluster..."; sleep 2; done'
                    
                    echo "✅ Cluster is reachable and ready."
                '''
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                echo 'Deploying to Kubernetes cluster (Minikube)...'

                // Apply namespace first
                sh 'kubectl apply -f k8s/namespace.yaml --validate=false'

                // Apply ConfigMap and Secret
                sh 'kubectl apply -f k8s/configmap.yaml --validate=false'
                sh 'kubectl apply -f k8s/secret.yaml --validate=false'

                // Apply Storage (PV and PVC for MongoDB)
                sh 'kubectl apply -f k8s/storage/ --validate=false'

                // Apply MongoDB
                sh 'kubectl apply -f k8s/mongodb/ --validate=false'

                // Apply all backend microservices
                sh 'kubectl apply -f k8s/auth-service/ --validate=false'
                sh 'kubectl apply -f k8s/task-service/ --validate=false'
                sh 'kubectl apply -f k8s/scheduler-service/ --validate=false'

                // Apply Frontend
                sh 'kubectl apply -f k8s/frontend/ --validate=false'

                // Apply Ingress and ResourceQuota
                sh 'kubectl apply -f k8s/ingress.yaml --validate=false'
                sh 'kubectl apply -f k8s/resource-quota.yaml --validate=false'

                // Wait for rollouts to complete
                echo 'Waiting for deployments to roll out...'
                sh 'kubectl rollout status deployment/auth-service -n studyos --timeout=120s'
                sh 'kubectl rollout status deployment/task-service -n studyos --timeout=120s'
                sh 'kubectl rollout status deployment/scheduler-service -n studyos --timeout=120s'
                sh 'kubectl rollout status deployment/frontend -n studyos --timeout=120s'

                // Show final status
                echo 'Kubernetes deployment status:'
                sh 'kubectl get all -n studyos'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully! StudyOS is deployed.'
            mail(
                to: 'kpbhai0705@gmail.com',
                subject: "✅ StudyOS Pipeline SUCCESS - Build #${env.BUILD_NUMBER}",
                body: """
Hello,

Your StudyOS CI/CD Pipeline completed successfully!

Build Details:
- Job Name: ${env.JOB_NAME}
- Build Number: #${env.BUILD_NUMBER}
- Status: SUCCESS
- Duration: ${currentBuild.durationString}
- Build URL: ${env.BUILD_URL}

Stages completed:
✅ Checkout
✅ Install Dependencies
✅ Test
✅ Docker Build
✅ Ansible Deploy
✅ Kubernetes Deploy

StudyOS is now live at:
- Frontend (NodePort): http://localhost:30000
- Frontend (Ingress):  http://studyos.local
- Auth API (Ingress):  http://api.studyos.local/auth
- Task API (Ingress):  http://api.studyos.local/tasks

Regards,
Jenkins CI/CD
                """
            )
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
            mail(
                to: 'kpbhai0705@gmail.com',
                subject: "❌ StudyOS Pipeline FAILED - Build #${env.BUILD_NUMBER}",
                body: """
Hello,

Your StudyOS CI/CD Pipeline has FAILED!

Build Details:
- Job Name: ${env.JOB_NAME}
- Build Number: #${env.BUILD_NUMBER}
- Status: FAILED
- Duration: ${currentBuild.durationString}
- Build URL: ${env.BUILD_URL}

Please check the logs at:
${env.BUILD_URL}console

Regards,
Jenkins CI/CD
                """
            )
        }
        always {
            echo "Build #${env.BUILD_NUMBER} finished with status: ${currentBuild.result}"
        }
    }
}
