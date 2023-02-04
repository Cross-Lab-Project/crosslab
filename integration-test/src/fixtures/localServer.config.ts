export const ENV = {
  common: {
    SECURITY_ISSUER: 'http://localhost',
    SECURITY_AUDIENCE: 'http://localhost',
    BASE_URL: 'http://localhost',
  },
  auth: {
    PORT: '3000',
    ALLOWLIST:
      'localhost:authservice,localhost:deviceservice,localhost:experimentservice,localhost:federationservice,localhost:updateservice',
  },
  device: {
    PORT: '3001',
  },
  experiment: {
    PORT: '3002',
  },
  federation: {
    PORT: '3003',
  },
  gateway: {
    AUTH_SERVICE_URL: '127.0.0.1:3000',
    DEVICE_SERVICE_URL: '127.0.0.1:3001',
    EXPERIMENT_SERVICE_URL: '127.0.0.1:3002',
    FEDERATION_SERVICE_URL: '127.0.0.1:3003',
    UPDATE_SERVICE_URL: '127.0.0.1:1',
    SERVER_NAME: 'localhost',
    NGINX_PID_PATH: 'nginx.pid',
  },
};
