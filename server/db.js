const config  = require("./config.js");

const mongodb = require("mongodb").MongoClient;
const crypto  = require("crypto");

module.exports = async function() {
    const db = await mongodb.connect(config.dbURL);
    
    let bookingsCollection = await db.createCollection("bookings");

    let adminCollection = await db.createCollection("admins");
    
    async function addAdmin(username, password) {
        const salt = crypto.randomBytes(32); // 128-bits
        
        const passwordDigest = crypto.createHmac("sha256", salt).update(password).digest("hex");
        
        return await adminCollection.insert({
            name: username,
            password: passwordDigest,
            salt: salt.toString("hex")
        });
    }
    
    if ((await adminCollection.find({ name: config.defaultAdminUsername })).count() < 1) {
        addAdmin(config.defaultAdminUsername, config.defaultAdminPassword);
    }
    
    return {
        db: db,
        bookings: bookingsCollection,
        admins: adminCollection
    };
};