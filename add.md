### 需要到客户端管理的功能
1. 导入文件后要点击启用按钮
2. 忘记密码
Realm-->Login-->Forgot password=true

---

### 需要在代码中管理的功能
1. 发送验证邮箱的用户需要修改配置
main.js文件下第71行----->smtpServer的{user,password,from}属性
2. 163需要开启smtp服务，授权码代替smtpServer的{password}属性