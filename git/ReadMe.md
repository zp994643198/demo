# git test  
  
  
## 创建git项目  
`git init`
***

## 复制git项目
`git clone`
***

## 添加到本地代码仓库
`git add`
***

## 提交到本地仓库
`git commit`
***

## 推送到远程仓库
`git push`
***

## 远程仓库拉取
`git pull`
***

## 创建远程连接
`git remote`
***

## 合并数据
`git merge`
***
***
***
## 生产环境git流程
1. 仓库复制到本地   
    git clone git@github.com:zp994643198/test-demo.git
2. 创建并切换分支  
    git checkout -b new-feature/t999  
3. 连接远程分支
    git push --set-upstream origin new-feture/t999
4. 进行开发
5. 代码合并到测试分支
    git checkout test
    git merge new-feature/t999
6. 测试完成推送到远程库
    git add .
    git commit -m "test commit"
    git push

## git rebase
1. commit打包  

    commit过多不利于代码的回溯和观察，将commit打包方便查看。  
    `git rebase -i [begin point] [end point]`  
    例如:  
    `git rebase -i 015a274^ d751db04`  
    '^' 符号代表包含

    操作指令：  
    pick(p)：保留该commit（缩写:p）  
    reword(r)：保留该commit，但我需要修改该commit的注释（缩写:r）  
    edit(e)：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）  
    squash(s)：将该commit和前一个commit合并（缩写:s）  
    fixup(f)：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）  
    exec(x)：执行shell命令（缩写:x）  
    drop(d)：我要丢弃该commit（缩写:d）


2. 复制其他分支的commit到本分支  
    方便在多人本地开发同一模块时快速共享别人提交的代码  
    `git rebase [begin point] [end point] --onto master`  
    例如:  
    `git rebase 015a274^ d751db04 --onto master`  

    复制了commit之后，还要执行`git reset --hard 0c72e64(新生成的序号)`，这样才能把主分支的head转移到复制之后的最新的commit上  


