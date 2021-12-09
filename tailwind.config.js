module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      colors: {
        'link': '#ffedd1',
        'blue-middle': '#48c78e',
      }
    }
  },
  variants: {
    extend: {
      // ...
     backgroundColor: ['active'],
    }
  },
};
