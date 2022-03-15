module.exports = {
  backend: {
    generator: 'nexus',
    output: 'src/crud',
    excludeFieldsByModel: {
      User: ['password'],
    }
  },
}
