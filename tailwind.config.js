const mergeWith = require('lodash/mergeWith');
const isArray = require('lodash/isArray');

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const localTheme = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  purge: {
    content: [
      "./src/**/*.css",
      "./src/**/*.scss",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.html",
    ],
  },
  mode: 'jit',
  darkMode: false,
  ...mergeWith(localTheme, customizer)
}
