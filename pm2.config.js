module.exports = {
  apps: [
    {
      name: 'jd-dict-server',
      script: 'npm run start',
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
