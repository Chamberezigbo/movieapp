const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const port = process.env.PORT || 3000;


app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
       res.render('index')
})

app.get('/result', (req,res) => {
       let query = req.query.search
       let url = `https://api.themoviedb.org/3/search/movie?api_key=167d21d032ef70cb07c0222951c15d10&query=${query}`;
       request(url, (error,response,body) => {
              if (error) {
                     console.error(error);
              }
              let data = JSON.parse(body);
              res.render('movie', {data:data,searchQuery:query});
       })
       
})

app.listen(port, () => console.log(`Server started at port ${port}`))