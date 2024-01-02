pipeline {
    agent any
    environment {
        NEXUS_CREDS = credentials('nexus')
        NEXUS_DOCKER_REPO = '192.168.68.72:8082'
    }

    stages {
       
       stage('Docker Build') {
        
            steps { 
                    echo 'Building docker Image'
                    sh 'docker build -t $NEXUS_DOCKER_REPO/fakeweb:$BUILD_NUMBER .'
                }
        }

       stage('Docker Login') {
            steps {
                echo 'Nexus Docker Repository Login'
                script{
                    withCredentials([usernamePassword(credentialsId: 'nexus', usernameVariable: 'jenkins', passwordVariable: 'jenkins' )]){
                       sh ' echo $PASS | docker login -u $USER --password-stdin $NEXUS_DOCKER_REPO'
                    }
                   
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Imgaet to docker hub'
                sh 'docker push $NEXUS_DOCKER_REPO/fakeweb:$BUILD_NUMBER'
            }
        }
    }
