---
title: Jenkins
lastUpdated: true
---

# Jenkins

大多数最基本的持续交付 Pipeline 至少会有三个阶段：构建、测试、部署

## 创建流水线

[流水线语法参考](https://www.jenkins.io/zh/doc/book/pipeline/syntax/)

### 定义执行环境

- agent: 定义执行环境，告诉 Jenkins 在哪里以及如何执行 Pipeline 或者 Pipeline 子集，所有 Pipeline 都需要 agent 指令
  - 所有在块（block） 中的步骤（steps）会被 Jenkins 保存在一个执行队列中，一旦一个执行器（excutor）是可用的，这些步骤就会开始执行
    代理方式可以是 node、docker、label、none、any 等
  - 一个工作空间（workspace）将被分配，工作空间中回包含来自远程仓库的文件和一些用于 Pipeline 的工作文件
    [参考](https://www.jenkins.io/doc/book/pipeline/syntax/#agent)
  - 可以配置全局的 agent，也可以配置单个 stage 的 agent

### 定义环境变量

- environment: 环境变量，配置环境变量很有用，也可以配置 stage 级别的环境变量，但是直接把凭证信息写入 Jenkinsfile 文件显然不安全，所以 Jenkins Pipeline 允许用户在 Jenkinsfile 中访问预定义的参数，无需知道值 [参考](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#handling-credentials)，Jenkins 网页中创建流水线任务时就可以配置

### 流水线工作阶段

- stages: 所有工作阶段

  - stage: 某个工作阶段

    - steps: 执行多个步骤（step），任何一个步骤失败，Pipeline 的执行结果也为失败，Pipeline 将会标记在该 `stage` 失败

    `timeout` `retry` 步骤中可以嵌套其他步骤
    `input` 人工确认

### 执行完毕

- post: Pipeline 运行完成时，可能需要做一些清理工作，或者基于 Pipeline 的运行结果执行不同的操作（以下只是命令（junit 等）一般用在什么情况下，其他情况下或者阶段都可以使用）
  - always: 运行结束就执行
    - junit 单元测试
    - deleteDir() 清理工作空间
    - archiveArtifacts 保存打包结果
  - success：只有运行成功才执行
  - failure：只有失败才执行
    - mail hipchat slack 等方式通知
  - unstable：只有运行被标记为 unstable 才会执行，不稳定
  - changed：只有 Pipeline state 被改动了才执行，比如之前失败了，现在成功了

```Jenkinsfile
pipeline {
  agent {
    docker {
      image 'node:7-alpine'
      label 'my-defined-label'
     }
  }

  environment {
    DISABLE_AUTH = 'true'
    DB_ENGINE = 'sqlite'
  }

  options {}

  triggers {}

  // 所有工作阶段
  stages {
    // 打包阶段
    stage('build') {
      // 执行多个步骤
      steps {
        // 一个步骤可以是单行命令
        sh 'echo "Hello World"'
        // 也可以是多行命令
        sh '''
            echo "Multiline shell steps works too"
            ls -lah
        '''

        // 重试
        retry(3) {
          sh './flakey-deploy.sh'
        }

        // 超时
        timeout(time: 3, unit: 'MINUTES') {
          sh './health-check.sh'
        }

        // 重试 5 次，总共不超过 3 分钟
        timeout(time: 3, unit: 'MINUTES') {
          retry(5) {
            sh './flakey-deploy.sh'
          }
        }
      }
    }
    // Windows 环境中，用 `bat` 步骤表示执行批处理命令
    stage('windowBuild') {
      steps {
        bat 'set'
      }
    }
    // exit
    stage('Test') {
      steps {
        sh 'echo "Fail!"; exit 1'
      }
    }
  }

  // Pipeline 运行完成时
  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
  // 在 post 阶段记录测试和构建结果
  post {
    always {
      // 获得单元测试结果，如果存在失败的测试用例，Pipeline 会被标记成 `UNSTABLE` 网页用黄色表示
      junit 'build/reports/**/*.xml'
      // 存储构建结果，可以指定三个参数 文件路径、文件名、figerprint
      archiveArtifacts: artifacts:'build/libs/**/*.jar', fingerprint: true
    }

    // 失败时发送邮件
    failure {
      mail to : 'huli66@qq.com',
            subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
            body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
```

## 安装

**可以跑一个 Docker 容器来作为 Jenkins 服务器，模拟生产环境**

推荐镜像[https://hub.docker.com/r/jenkinsci/blueocean/](https://hub.docker.com/r/jenkinsci/blueocean/)

```sh
docker run \
  -u root \
  --rm \ # 关闭时删除容器
  -d \ # 后台运行，如果不指定则终端窗口中会输出正在运行的容器日志
  -p 8080:8080 # 容器的端口
  -p 50000:50000 # 进行通信
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

[参考文档](https://www.jenkins.io/zh/doc/tutorials/)
