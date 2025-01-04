import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.91.150.183:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
