const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
// Cheerio lets us manipulate DOM by reading elements on page.

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

// const PORT = process.env.port || 8000;

const website = 'https://thegoodnewshub.com/news/';

// Get text and the link to headlines

try {
    axios(website).then((res) => {
        const data = res.data;
        const $ = cheerio.load(data);

        let content = [];

        $('.entry-title', data).each(function () {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');

            content.push({
                title,
                url,
            });

            app.get('/items', (req, res) => {
                res.json(content);
            });
        });
    });
} catch (error) {
    console.log(error, error.message);
}

// app.use('/', (req, res, next) => {
//     res.send("test!!!!")
// });

app.listen(8000, () => {
    console.log(`server is running on port 8000`);
});

module.exports = app;