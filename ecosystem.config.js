module.exports = {
  apps: [
    {
      name: "inceptionpad-website",
      script: "./app.js",
      watch: true,
      env: {
        PORT: 8011,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 8010,
        NODE_ENV: "production",
      },
    },
  ],
};
