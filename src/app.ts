import express from "express";
import 'dotenv/config';
import webRoutes from "./routes/web";
import initDataBase from "config/seed";
import { z } from "zod"; 

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// config req.body
app.use(express.json()); // Để parse body dạng JSON
app.use(express.urlencoded({ extended: true }));

// config static files: images/css/js
app.use(express.static('public'));

// config routes
webRoutes(app)

// Seeding data 
initDataBase();

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);
})