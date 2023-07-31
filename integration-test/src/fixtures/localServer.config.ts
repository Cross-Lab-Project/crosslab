const DB_COMMON = {
  DB_HOST: 'localhost',
  DB_PORT: '3306',
  DB_USERNAME: 'service',
  DB_PASSWORD: 'service',
};

export const ENV = {
  common: {
    SECURITY_ISSUER: 'http://localhost',
    SECURITY_AUDIENCE: 'http://localhost',
    BASE_URL: 'http://localhost',
  },
  auth: {
    PORT: '3000',
    ALLOWLIST: [
      'superadmin:local:superadmin',
      'authservice:local:authservice',
      'bookingservice:local:bookingservice',
      'deviceservice:local:deviceservice',
      'experimentservice:local:experimentservice',
      'federationservice:local:federationservice',
    ].join(','),
    API_TOKEN: 'authservice',
    DB_NAME: 'auth_service',
    ...DB_COMMON,
  },
  device: {
    PORT: '3001',
    API_TOKEN: 'deviceservice',
    DB_NAME: 'device_service',
    ...DB_COMMON,
  },
  experiment: {
    PORT: '3002',
    API_TOKEN: 'experimentservice',
    DB_NAME: 'experiment_service',
    ...DB_COMMON,
  },
  federation: {
    PORT: '3003',
    API_TOKEN: 'federationservice',
    DB_NAME: 'federation_service',
    ...DB_COMMON,
  },
  gateway: {
    AUTH_SERVICE_URL: '127.0.0.1:3000',
    DEVICE_SERVICE_URL: '127.0.0.1:3001',
    EXPERIMENT_SERVICE_URL: '127.0.0.1:3002',
    FEDERATION_SERVICE_URL: '127.0.0.1:3003',
    UPDATE_SERVICE_URL: '127.0.0.1:1',
    SERVER_NAME: 'localhost',
    NGINX_PID_PATH: 'nginx.pid',
    NGINX_USER: 'www-data',
  },
  'booking-backend': {
    PORT: '3004',
    API_TOKEN: 'bookingservice',
  },
  'booking-frontend': {
    PORT: '3005',
    API_TOKEN: 'bookingservice',
  },
  'device-reservation': {
    PORT: '3006',
    API_TOKEN: 'bookingservice',
  },
  'schedule-service': {
    PORT: '3007',
    API_TOKEN: 'bookingservice',
  },
};
