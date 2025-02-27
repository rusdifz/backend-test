import redisStore from 'cache-manager-redis-store';

export const redisConfig = () => ({
  redis: {
    store: redisStore,
    config: [
      {
        namespace: 'master',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        retryStrategy() {
          return 5000;
        },
        reconnectOnError() {
          return true;
        },
        maxRetriesPerRequest: 5,
      },
      {
        namespace: 'slave',
        host: process.env.REDIS_HOST_SLAVE,
        port: process.env.REDIS_PORT_SLAVE,
        password: process.env.REDIS_PASSWORD_SLAVE,
        retryStrategy() {
          return 5000;
        },
        reconnectOnError() {
          return true;
        },
        maxRetriesPerRequest: 5,
      },
    ],
  },
});
