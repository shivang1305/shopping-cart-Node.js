/* This file is just to manually create products array and save these products into the database. This will only 
   run when - cd ../seeds, node product_seeder.js */


const mongoose = require('mongoose');
const Product = require('../models/Product');

//Database Connection
mongoose.connect('mongodb://localhost:27017/Shopping_cart_proj', {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if(err) throw err;
    console.log('Database Connection Setup Successfully');
});

//Manually created products & stored in an array
var products = [
    new Product({
        imagepath:'https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg',
        title:'Captain America First Avenger',
        description:'Awesome Movie',
        price:20
   }),
   new Product({
       imagepath:'https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg',
       title:'Captain America First Avenger',
       description:'Awesome Movie',
       price:20
   }),
   new Product({
       imagepath:'https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg',
       title:'Captain America First Avenger',
       description:'Awesome Movie',
       price:20
   }),
   new Product({
       imagepath:'https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg',
       title:'Captain America First Avenger',
       description:'Awesome Movie',
       price:20
   }),
   new Product({
       imagepath:'https://upload.wikimedia.org/wikipedia/en/f/fb/Steve_Rogers_%26_Captain_America_MCU.jpg',
       title:'Captain America First Avenger',
       description:'Awesome Movie',
       price:20
   })
];

//Saving products into database
var done = 0;
for(var i=0; i<products.length; i++)
{
    products[i].save((err, result) => {
        if(err) throw err;
        done++;

        if(done === products.length){ // since this is asynchronus process connection can be withdrwan before saving all the data thats why we put this condition
            mongoose.disconnect();   // disconnect with the database only when all data is inserted into the database
            console.log('Data Inserted');  
        }
    });
    
}