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

        stage('Ansible Infrastructure Deploy') {
            steps {
                echo 'Deploying shared infrastructure...'

                // Apply namespace
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/namespace.yaml"'

                // Apply ConfigMap and Secret
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/configmap.yaml"'
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/secret.yaml"'

                // Apply Storage (PV and PVC for MongoDB)
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/storage/"'

                // Apply MongoDB
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/mongodb/"'
                
                // Apply Ingress and ResourceQuota
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/ingress.yaml"'
                sh 'ansible-playbook ansible/playbooks/k8s-deploy.yml --vault-password-file .vault_pass -e "target_dir=k8s/resource-quota.yaml"'

                echo '✅ Infrastructure deployed successfully.'
            }
        }
    }

    post {
        success {
            emailext(
                to: "kpbhai0705@gmail.com",
                subject: "SUCCESS: ${currentBuild.fullDisplayName}",
                body: "The infrastructure deployment was successful. Check logs at ${env.BUILD_URL}"
            )
            echo 'Infrastructure deployment completed successfully.'
        }
        failure {
            emailext(
                to: "kpbhai0705@gmail.com",
                subject: "FAILURE: ${currentBuild.fullDisplayName}",
                body: "The infrastructure deployment failed. Check logs at ${env.BUILD_URL}"
            )
            echo 'Infrastructure deployment failed!'
        }
    }
}
