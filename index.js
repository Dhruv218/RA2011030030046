const express = require('express');
const axios = require('axios');

const app = express();

app.get('/number', async(req, res) => {
    const urls=req.query.url;
    const results = await Promise.allSettled(urls.map(url => axios.get(url)));
console.log(results);
    const combinedNumbers = results
        .filter(result => result.status === 'fulfilled')
        .reduce((acc, result) => {
            return acc.concat(result.value.data);
        }, []);
        console.log('asd');

    const uniqueSortedNumbers = [...new Set(combinedNumbers)].sort((a, b) => a - b);
   res.send(uniqueSortedNumbers)
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
