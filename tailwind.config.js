module.exports = {
  purge: [],
  purge: {
      enabled: enablePurge,
      content: [
        './src/**/*.html',
        './src/**/*.scss'
      ]
    },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
