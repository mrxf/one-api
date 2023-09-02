const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://openai.thisjs.com', // 配置转发目标地址（能返回数据的服务器地址）
      changeOrigin: true, // 控制服务器接收到的请求头中host字段的值 //  changeOrigin 默认值为false 但我们一般将changeOrigin值设为true
      pathRewrite: { '^/api': '/api' }, // 去请求前缀，保证交给后台服务器是正常请求地址（必须配置）
    })
  );
};
