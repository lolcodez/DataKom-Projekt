const dbUsername = "snerikes-bordsbokning";
const dbPassword = "141c0c1f55580201";
const dbURL      = `mongodb://${dbUsername}:${dbPassword}@ds157185.mlab.com:57185/snerikes-bordsbokning`;

const defaultAdminUsername = 'admin';
const defaultAdminPassword = 'toor';

module.exports = {
    dbURL: dbURL,
    defaultAdminUsername: defaultAdminUsername,
    defaultAdminPassword: defaultAdminPassword
};