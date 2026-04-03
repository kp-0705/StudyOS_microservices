pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'kp0705'
        KUBECONFIG = '/home/dell/.kube/config'
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
                sh 'docker-compose build'
            }
        }

        stage('Ansible Deploy') {
            steps {
                echo 'Deploying with Ansible...'
                sh 'ansible-playbook -i ansible/inventory.ini ansible/playbooks/deploy.yml'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                echo 'Deploying to Kubernetes cluster (Minikube)...'

                // Apply namespace first
                sh 'kubectl apply -f k8s/namespace.yaml'

                // Apply ConfigMap and Secret
                sh 'kubectl apply -f k8s/configmap.yaml'
                sh 'kubectl apply -f k8s/secret.yaml'

                // Apply Storage (PV and PVC for MongoDB)
                sh 'kubectl apply -f k8s/storage/'

                // Apply MongoDB
                sh 'kubectl apply -f k8s/mongodb/'

                // Apply all backend microservices
                sh 'kubectl apply -f k8s/auth-service/'
                sh 'kubectl apply -f k8s/task-service/'
                sh 'kubectl apply -f k8s/scheduler-service/'

                // Apply Frontend
                sh 'kubectl apply -f k8s/frontend/'

                // Apply Ingress and ResourceQuota
                sh 'kubectl apply -f k8s/ingress.yaml'
                sh 'kubectl apply -f k8s/resource-quota.yaml'

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
