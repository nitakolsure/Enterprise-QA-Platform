pipeline {
  agent any

  parameters {
    string(
      name: 'TAGS',
      defaultValue: '@addToCart',
      description: 'Cucumber tag expression. Examples: @smoke, @cart, @addToCart'
    )
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    CI = 'true'
    TAGS = "${params.TAGS}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'node -v && npm -v'
            sh 'npm ci'
          } else {
            bat 'node -v && npm -v'
            bat 'npm ci'
          }
        }
      }
    }

    stage('Install browsers') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright install chromium --with-deps'
          } else {
            bat 'npx playwright install chromium'
          }
        }
      }
    }

    stage('Run Cucumber tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm test'
          } else {
            bat 'npm test'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'cucumber-report/**,test-results/**', allowEmptyArchive: true

      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'cucumber-report',
        reportFiles: 'report.html',
        reportName: 'Cucumber HTML Report'
      ])
    }
  }
}
