/// <reference path = "./types/index.d.ts"> />

import express from "express";
import 'dotenv/config';
import webRoutes from "src/routes/web";
import initDataBase from "config/seed";
import passport from "passport";
import configPassprotLocal from "src/middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import apiRoutes from "routes/api";

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


// Config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            // clear expired session every 1 day
            checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        })
}))

// config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassprotLocal();

// Config middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

// config routes
webRoutes(app);

// api routes
apiRoutes(app);

// Seeding data 
initDataBase();

// handle 404 not found
app.use((req, res) => {
    // res.send("404 not found")
    res.render("status/404.ejs")
})

app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);
})