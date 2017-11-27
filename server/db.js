const config  = require("./config.js");

const mongodb = require("mongodb").MongoClient;
const crypto  = require("crypto");

module.exports = async function() {
    const db = await mongodb.connect(config.dbURL);
    
    // start --- Create/get collections
    
    let bookingsCollection = await db.createCollection("bookings");

    let adminCollection = await db.createCollection("admins");
    
    let daysCollection = await db.createCollection("days");
    
    // end --- Create/get collections
    
    // start --- Create indexes
    
    if (!await daysCollection.indexExists("date_ttl")) {
        await daysCollection.createIndex({
            "date": 1
        }, {
            name: "date_ttl",
            unique: true,
            expireAfterSeconds: 60 * 60 * 24 * 14
        });
    }
    
    // end --- Create indexes
    
    // start --- DB Functions
    
    async function addAdmin(name, password) {
        return await adminCollection.insertOne({
            name: name,
            password: null,
            salt: null
        }).then(() => {
            return changeAdminPassword(name, password)
        });
    }
    
    async function changeAdminPassword(name, newPassword) {
        const salt = crypto.randomBytes(32); // 128-bits
        
        const passwordDigest = crypto.createHmac("sha256", salt).update(password).digest("hex");
        
        return await adminCollection.updateOne({
            name: name
        }, {
            $set: {
                password: passwordDigest,
                salt: salt
            }
        });
    }
    
    async function addBooking(name, email, time, date, numPeople, text) {
        return await db.collection("bookings").insertOne({
            name: name,
            email: email,
            time: time,
            date: date,
            number: numPeople,
            text: text,
            submitted: new Date().getTime(),
            status: "pending",
            emails: []
        });
    }
    
    async function dayAvailable(date) {
        let result = await daysCollection.find({
            "date": date
        });
        
        if (await result.count() < 1) {
            return true;
        }
        
        return !(await result.next()).full;
    }
    
    // end --- DB Functions
    
    // start --- Default admin setup
    
    if (await adminCollection.count({ name: config.defaultAdminUsername }) < 1) {
        addAdmin(config.defaultAdminUsername, config.defaultAdminPassword);
    }
    
    // end --- Default admin setup
    
    // Exports
    
    return {
        addAdmin: addAdmin,
        changeAdminPassword: changeAdminPassword,
        addBooking: addBooking,
        dayAvailable: dayAvailable,
        debug: {
            db: db,
            bookings: bookingsCollection,
            admins: adminCollection,
            days: daysCollection
        }
    };
};