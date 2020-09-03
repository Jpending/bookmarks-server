
module.exports = {
  PORT: process.env.PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || '3a2f1db6-ea47-4585-bb93-c5cf47684401',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://hqniccwvdcsjmp:8d478bd444e394df5a35fc6ba2b8c0cf6b18030208aed18a81dd8f6091368f9a@ec2-54-175-77-250.compute-1.amazonaws.com:5432/dauffcvjc1os5b',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/bookmarks-test'
};
