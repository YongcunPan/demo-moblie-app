import { defineConfig } from 'umi';
import routes from './route';
import proxy from './proxy';
import plugins from './plugin';
import theme from './theme';

/**
 * 配置
 */
export default defineConfig({
  title: 'OMP手持端',
  npmClient: 'yarn',
  hash: true,
  /**
   * 路由
   */
  routes: routes,
  /**
   * 代理
   */
  proxy: proxy,
  /**
   * 插件
   */
  plugins: plugins,
  /**
   * 主题
   */
  theme: theme,
  dva: {},
  request: {},
  base: '/mobile-app/',
  publicPath: '/mobile-app/',
  /**
   * 最大兼容性
   */
  targets: {
    chrome: 69,
    ios: 10,
  },
});
