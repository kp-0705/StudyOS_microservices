pipeline {
    agent any

    environment {
        KUBECONFIG = '/home/kartavya-patel/.kube/config'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Kubernetes Infrastructure Deploy') {
            steps {
                echo 'Deploying shared infrastructure...'

                // Apply namespace
                sh 'kubectl apply -f k8s/namespace.yaml --validate=false'

                // Apply ConfigMap and Secret
                sh 'kubectl apply -f k8s/configmap.yaml --validate=false'
                sh 'kubectl apply -f k8s/secret.yaml --validate=false'

                // Apply Storage (PV and PVC for MongoDB)
                sh 'kubectl apply -f k8s/storage/ --validate=false'

                // Apply MongoDB
                sh 'kubectl apply -f k8s/mongodb/ --validate=false'
                
                // Apply Ingress and ResourceQuota
                sh 'kubectl apply -f k8s/ingress.yaml --validate=false'
                sh 'kubectl apply -f k8s/resource-quota.yaml --validate=false'

                echo '✅ Infrastructure deployed successfully.'
            }
        }
    }

    post {
        success {
            echo 'Infrastructure deployment completed successfully.'
        }
    }
}
