module.exports = {
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { selector: ':root' }
      }]
    }
  }
}
