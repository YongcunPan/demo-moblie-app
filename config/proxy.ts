/**
 * 代理配置
 */
const target = 'https://tfistoe.hwwt2.com/';
const target2 = 'https://uatfis.hwwt2.com/';
// const chatTarget = 'http://172.29.135.148:8081'; //宇晨
// const chatTarget = 'http://172.29.136.90:8081'; //新立
const target3 ='http://172.29.135.28:8012';
export default {
  '/fis-toe-filecenter/api/': {
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fis-toe-datacenter/api/': {
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fis-toe-facilityequip/': {
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fis-toe-workflow/': {
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fis-toe-omp/api/': {
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/omd/': {
    target: 'https://uatfis.hwwt2.com/omd2_repair_mobile/',
    changeOrigin: true,
    pathRewrite: { '^/omd': '' },
  },
  '/cmd/': {
    target: 'http://uat.fis.hwwt2.com/cmd2_mobile_interface_new/',
    changeOrigin: true,
    pathRewrite: { '^/cmd/': '' },
  },
  '/ws/': {
    target: 'ws://localhost:8022/',
    ws: true,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/ws2/': {
    target: 'ws://localhost:9500/',
    ws: true,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/him/': {
    // target: chatTarget,
    target: target,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/omd2_repair_mobile/api/': {
    target: target2,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fis-toe-retrofit': {
    target: target3,
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
};
