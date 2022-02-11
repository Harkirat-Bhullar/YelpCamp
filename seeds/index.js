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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[rand100].city}, ${cities[rand100].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloribus eius rem ab dolor fuga asperiores expedita molestias, blanditiis cum aut quam numquam deleniti officia, veniam necessitatibus iste explicabo. Sint.',
            price
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close()
})