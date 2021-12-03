const plugins = require('tailwind-react-ui/plugins')
module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  plugins: [
    ...Object.keys(plugins).map(name => plugins[name]()),
  ]
};
