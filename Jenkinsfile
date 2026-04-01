pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'gaurav1374'
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
                    bat 'npm install'
                }
                dir('services/task-service') {
                    bat 'npm install'
                }
                dir('services/scheduler-service') {
                    bat 'npm install'
                }
            }
        }

        stage('Test') {
    steps {
        echo 'Running frontend tests...'

        dir('frontend') {
            bat 'npm install'
            bat 'npm test -- --watchAll=false'
        }

        echo 'Running backend service checks...'

        dir('services/auth-service') {
            bat 'npm install'
            bat 'npm test'
        }

        dir('services/task-service') {
            bat 'npm install'
            bat 'npm test'
        }

        dir('services/scheduler-service') {
            bat 'npm install'
            bat 'npm test'
        }
    }
}

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

        stage('Ansible Deploy') {
            steps {
                echo 'Deploying with Ansible...'
                bat 'wsl ansible-playbook -i ansible/inventory.ini ansible/playbooks/deploy.yml'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully! StudyOS is deployed.'
            mail(
                to: '1762003rajpurohitgaurav@gmail.com',
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

StudyOS is now live at http://localhost:3000

Regards,
Jenkins CI/CD
                """
            )
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
            mail(
                to: '1762003rajpurohitgaurav@gmail.com',
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
