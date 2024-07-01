const mongoose = require('mongoose');
const cities = require('./cities');  
const axios = require('axios');
const { places, descriptors } = require('./seedHelpers');   
const Campground = require('../models/campground');    //2 dot hai so that directory select kr ske

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
/*
async function seedImg() {
    try {
      const resp = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'UT9k4ZVnFF4-O6H8V21ZwuglrIwnqgzB5RPec9f074E',
          collections: 1114848,
        },
      })
      return resp.data.urls.small
    } catch (err) {console.error(err)  }
}*/
const seedDB = async () => {
    await Campground.deleteMany({});   //delete everything  
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);  //1000 cities in cities array
        const price = Math.floor(Math.random() * 20)+10; 
        const camp = new Campground({                   
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: await seedImg(),
            image : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
            description :'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eveniet ullam voluptates earum dignissimos qui. Nostrum earum inventore nam delectus neque aut mollitia voluptatibus, fugit in praesentium laborum nesciunt magni.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
  mongoose.connection.close();
})