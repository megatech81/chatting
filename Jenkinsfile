pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-docker-registry-url'
        NEXUS_REGISTRY = 'http://192.168.40.142:8081/repository/Muse-dockerimg/'
        NEXUS_USERNAME = 'jenkins'
        NEXUS_PASSWORD = 'kolla'
        IMAGE_NAME = 'angular-app'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build Angular project
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t $DOCKER_REGISTRY/$IMAGE_NAME ."
                    sh "docker tag $DOCKER_REGISTRY/$IMAGE_NAME $DOCKER_REGISTRY/$IMAGE_NAME:latest"
                }
            }
        }

        stage('Push to Nexus') {
            steps {
                script {
                    // Log in to Nexus Docker registry
                    sh "docker login -u $NEXUS_USERNAME -p $NEXUS_PASSWORD $NEXUS_REGISTRY"

                    // Push Docker image to Nexus
                    sh "docker push $NEXUS_REGISTRY/$IMAGE_NAME:latest"
                }
            }
        }
    }
}