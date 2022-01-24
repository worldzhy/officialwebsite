module.exports = {
  apps : [
      {
        name: "inceptionpad-website",
        script: "./app.js",
        watch: true,
        env: {
            "PORT": 3581,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 3580,
            "NODE_ENV": "production",
        }
      }
  ]
}