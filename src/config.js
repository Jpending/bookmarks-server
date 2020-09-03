
module.exports = {
  PORT: process.env.PORT || 8800,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || '3a2f1db6-ea47-4585-bb93-c5cf47684401',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://hqniccwvdcsjmp@localhost/bookmarks',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/bookmarks-test'
};
