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
                echo 'No tests written yet — skipping'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images...'
                bat 'docker-compose build'
            }
        }

       stage('Deploy') {
    steps {
        echo 'Deploying all services...'
        bat 'docker-compose down --remove-orphans'
        bat 'docker rm -f studyos-mongodb studyos-auth studyos-task studyos-frontend studyos-scheduler 2>nul || exit 0'
        bat 'docker-compose up -d'
    }
}

    }

    post {
        success {
            echo 'Pipeline completed successfully! StudyOS is deployed.'
            mail(
                to: 'your-email@gmail.com',
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
✅ Deploy

StudyOS is now live at http://localhost:3000

Regards,
Jenkins CI/CD
                """
            )
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
            mail(
                to: 'your-email@gmail.com',
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