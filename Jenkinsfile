pipeline {
	agent {
		node {
			label "encyclopedia-project-agent"
		}
	}
	triggers {
		// this means once per minute. Change it later to once per 5 mins, or more
		pollSCM "* * * * *"
	}
	stages {
		stage("Build") {
			steps {
				sh "npm install"
			}
		}
		stage("Test") {
			steps {
				sh "npm test"
			}
		}
		stage("Push Image") {
			steps {
			    withCredentials([
			        string(credentialsId: 'docker-login-password', variable: 'DOCKER_PASSWORD')
			        ]) {
			        sh "docker build -t reactjs-encyclopedia-project:notpacked -f Dockerfile.start ."
			        sh "docker tag reactjs-encyclopedia-project:notpacked thisisnothappening/reactjs-encyclopedia-project:notpacked"
			        sh 'docker login --username thisisnothappening --password $DOCKER_PASSWORD'
			        sh "docker push thisisnothappening/reactjs-encyclopedia-project:notpacked"
			        sh "docker image prune -a -f"
			    }
			}
		}
		stage("Deploy") {
		    steps{
		        withCredentials([
					sshUserPrivateKey(credentialsId: 'amazon-linux-vm-key', keyFileVariable: 'KEYFILE'),
					string(credentialsId: 'ec2-ssh-user-and-dns', variable: 'TOKEN')
					]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $KEYFILE $TOKEN '
                        cd .server &&
                        sudo docker-compose stop backend &&
                        sudo docker container prune -f &&
                        sudo docker-compose up -d &&
                        sudo docker image prune -a -f
                        '
                    '''
				}
		    }
		}
	}
}