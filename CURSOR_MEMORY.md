# 项目架构规则

## 环境要求
- 当前为windows环境，应该使用windows环境的命令，禁止使用linux的命令

## Ruby版本配置规则  
- 项目必须使用Ruby 3.1.0环境，确保依赖兼容性
- Vercel不支持Ruby 3.1.0环境，因此不能直接部署
- 所有版本配置文件必须统一为3.1.0：
  - Gemfile中ruby版本声明
  - .ruby-version文件
  - .tool-versions文件

## 部署策略（双平台方案）
- **GitHub Pages**: 使用Ruby 3.1.0环境构建Jekyll静态站点
- **Vercel**: 挂载GitHub构建好的静态文件作为镜像部署
- **流程**: GitHub Actions构建 → GitHub Pages部署 → Vercel镜像同步

## Jekyll依赖管理
- github-pages gem锁定了特定版本的依赖，需要Ruby 3.1.0兼容性
- 避免直接在Vercel构建，防止Ruby版本冲突
- 优先保证项目依赖稳定性，通过双平台解决部署问题

## Vercel配置策略
- 禁用Vercel原生构建，改为静态文件部署
- 通过GitHub Actions将构建结果推送到特定分支
- Vercel挂载构建分支作为静态资源

## 部署操作流程
1. **第一步**: 推送代码到GitHub main分支
   ```powershell
   git add .
   git commit -m "Update with Ruby 3.1.0 configuration"
   git push origin main
   ```

2. **第二步**: GitHub Actions自动构建并部署到gh-pages分支
   - 使用Ruby 3.1.0环境
   - 构建Jekyll静态站点
   - 推送到gh-pages分支

3. **第三步**: 在Vercel中连接gh-pages分支
   - Vercel Dashboard → Import Project
   - 选择GitHub仓库
   - 指定部署分支为gh-pages
   - 框架设置为Static

## 关键配置文件
- `.github/workflows/deploy.yml`: GitHub Actions构建配置
- `vercel.json`: Vercel静态部署配置
- `Gemfile`, `.ruby-version`, `.tool-versions`: Ruby 3.1.0版本锁定