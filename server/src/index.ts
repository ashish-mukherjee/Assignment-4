
import express from 'express';
const bodyParser=require("body-parser");
const fs=require('fs');
const app= express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import indexRoutes from './routes/index';
app.use(indexRoutes);


 
app.listen(2900);
console.log("server on port 2900");



