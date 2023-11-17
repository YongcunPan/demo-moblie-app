## 营建平台 OMP 手持端子应用

### 环境准备

1. 安装 nodejs 版本需要 14 及以上，推荐使用 16
2. 执行安装依赖,统一使用 yarn,保持代码包依赖一致
   ```shell
   yarn
   ```
3. 代码风格 使用 VsCode 开发，安装 eslint 和 prettier 插件，设置默认格式化插件为 prettier

### 运行程序

```
yarn run dev
```

### 发布程序

```
yarn run build
```

### 文档目录

> config #配置目录
>
> > config.ts #总入口
>
> > plugin.ts #插件配置
>
> > proxy.ts #代理配置
>
> > qiankun.ts #微前端配置
>
> > route.ts #路由配置
>
> > theme.ts #主题配置
>
> src #源文件目录
>
> > assets #图标
>
> > components #公共组件
>
> > constants #常量和枚举
>
> > layouts #布局
>
> > models #dva model
>
> > pages #页面
>
> > services #公共接口
>
> > utils #工具
>
> app.tsx #运行时配置
>
> favicon.png #图标
>
> loading.tsx #懒加载页面
>
> package.json #依赖配置
>
> yarn.lock #依赖锁定
