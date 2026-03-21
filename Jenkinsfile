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
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed! StudyOS is deployed.'
        }
        failure {
            echo 'Pipeline failed! Check the logs.'
        }
    }
}