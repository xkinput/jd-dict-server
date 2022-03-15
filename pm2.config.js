module.exports = {
  apps: [
    {
      name: 'dict-online',
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
