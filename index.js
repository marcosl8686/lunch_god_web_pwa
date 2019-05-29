const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//yelp Search API

app.get('/api/restaurant/:id', function(req, res){
    console.log(req.params.id)
    var API_KEY = 'bGZz4X0o65g0mqQjrImYz62mrk3et_ygxV52mVIiipWTVztBDUhth7rghNB2_hMgQBJTxYWDC0TMESHanRo2svXwKqzFXLLU5-U2HTzq8bImLQuev4YHGhIvNZhzXHYx';
        fetch(`https://api.yelp.com/v3/businesses/search?limit=16&${req.params.id}`,  {
            method: 'GET', 
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        .then(function(response) {
            return response.json();
          })
        .then(function(myJson) {
            res.send(myJson)
        }).catch(function(err){
            console.log(err)
        });
});

app.listen(PORT, function(){
    console.log(`Server Started on port ${PORT}`);
})