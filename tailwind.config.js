module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      colors: {
        'link': '#ffedd1',
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
