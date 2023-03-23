const shortid = require('shortid');

const nextConfig = {
  env: {
    version: shortid.generate(),
  },
  reactStrictMode: false,
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
  async headers() {
    return [
      {
        source: 'http://94.131.246.109:5555/v1/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Expect-CT',
            value: 'enforce, max-age=86400',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'no-cors',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge; chrome=1',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*).(avif|jpg|jpeg|png|webp|gif|ico|woff2|svg|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536777, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
