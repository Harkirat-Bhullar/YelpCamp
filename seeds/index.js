const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database Connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 50; i++) {
        const rand100 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[rand100].city}, ${cities[rand100].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close()
})