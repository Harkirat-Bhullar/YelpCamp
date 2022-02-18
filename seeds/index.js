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
            author: "620db9d533f8164b63053967",
            location: `${cities[rand100].city}, ${cities[rand100].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum doloribus eius rem ab dolor fuga asperiores expedita molestias, blanditiis cum aut quam numquam deleniti officia, veniam necessitatibus iste explicabo. Sint.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dejpadjxf/image/upload/v1645103935/YelpCamp/s15yg7qcnvf9zryyhzsq.jpg',
                    filename: 'YelpCamp/s15yg7qcnvf9zryyhzsq',
                }
            ]
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close()
})