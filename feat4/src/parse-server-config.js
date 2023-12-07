const ParseServer = require('parse-server').ParseServer;
const S3Adapter = require('parse-server-s3-adapter');

const parseServerConfig = {
  databaseURI: 'mongodb://localhost:27017/dev', // replace with your MongoDB URI
  cloud: './cloud/main.js', // optional, include your cloud code functions
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'http://localhost:1337/parse', // change accordingly

  // File storage configuration using S3
  filesAdapter: new S3Adapter(
    process.env.S3_ACCESS_KEY,
    process.env.S3_SECRET_KEY,
    process.env.S3_BUCKET_NAME,
    { directAccess: true }
  ),
};

module.exports = parseServerConfig;