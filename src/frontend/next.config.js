/** @type {import('next').NextConfig} */

const dotEnv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { resolve } = require('path');

const myEnv = dotEnv.config({
  path: resolve(__dirname, '../../.env'),
});
dotenvExpand.expand(myEnv);

const {
  AD_SERVICE_ADDR = '',
  CART_SERVICE_ADDR = '',
  CHECKOUT_SERVICE_ADDR = '',
  CURRENCY_SERVICE_ADDR = '',
  PRODUCT_CATALOG_SERVICE_ADDR = '',
  RECOMMENDATION_SERVICE_ADDR = '',
  SHIPPING_SERVICE_ADDR = '',
  ENV_PLATFORM = '',
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
  OTEL_SERVICE_NAME = 'frontend',
  RUM_REALM = '',
  RUM_AUTH = '',
  RUM_APP_NAME = '',
  RUM_ENVIRONMENT = '',
  RUM_DEBUG = '',
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.http2 = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  env: {
    AD_SERVICE_ADDR,
    CART_SERVICE_ADDR,
    CHECKOUT_SERVICE_ADDR,
    CURRENCY_SERVICE_ADDR,
    PRODUCT_CATALOG_SERVICE_ADDR,
    RECOMMENDATION_SERVICE_ADDR,
    SHIPPING_SERVICE_ADDR,
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
    NEXT_PUBLIC_RUM_REALM: RUM_REALM,
    NEXT_PUBLIC_RUM_AUTH: RUM_AUTH, 
    NEXT_PUBLIC_RUM_APP_NAME: RUM_APP_NAME, 
    NEXT_PUBLIC_RUM_ENVIRONMENT: RUM_ENVIRONMENT,
    NEXT_PUBLIC_RUM_DEBUG: RUM_DEBUG
  },
};

module.exports = nextConfig;
