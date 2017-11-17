const config = require("./config.js");

const mongodb = require("mongodb").MongoClient;
const crypto = require("crypto");

module.exports = async function() {
    const db = await mongodb.connect(config.dbURL);

    let bookingsCollection = await db.createCollection("bookings");

    let adminCollection = await db.createCollection("admins");

    async function addAdmin(name, password) {
        return await adminCollection
            .insertOne({
                name: name,
                password: null,
                salt: null,
            })
            .then(() => {
                return changeAdminPassword(name, password);
            });
    }

    async function changeAdminPassword(name, newPassword) {
        const salt = crypto.randomBytes(32); // 128-bits

        const passwordDigest = crypto
            .createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        return await adminCollection.updateOne(
            {
                name: name,
            },
            {
                $set: {
                    password: passwordDigest,
                    salt: salt,
                },
            }
        );
    }
    async function removeBooking(id) {
        var myquery = { _id: ObjectID(id) };
        db.collection("bookings").remove(myquery);
        //om status på den dagen är full behöver detta ändras
    }

    async function changeBooking(id, type, value) {
        var myquery = { _id: ObjectID(id) };
        var newvalues = { $set: { type: value } };
        db.collection("bookings").updateOne(myquery, newvalues);
    }

    async function getBookingsOnDate(date_) {
        db.collection("bookings").find({ date: date_ });
    }

    async function getStatus(date_) {
        //Är dagen full? True/False
    }

    async function markDayAsFull(date_) {
        //Markera hela dagen som full
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
            emails: [],
        });
    }

    if ((await adminCollection.find({ name: config.defaultAdminUsername })).count() < 1) {
        addAdmin(config.defaultAdminUsername, config.defaultAdminPassword);
    }

    return {
        addAdmin: addAdmin,
        changeAdminPassword: changeAdminPassword,
        addBooking: addBooking,
        debug: {
            db: db,
            bookings: bookingsCollection,
            admins: adminCollection,
        },
    };
};
