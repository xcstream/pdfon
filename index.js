const puppeteer = require('puppeteer');
const express = require('express');
const serveStatic = require('serve-static')
const static = serveStatic('public')
const bodyParser = require("body-parser");

app = express()
app.use(bodyParser.json({ type: 'application/json',limit:'50mb' }))
app.use(bodyParser.urlencoded({ extended: false,limit:'50mb' }));
app.use(static);

s = app.listen(5700)
s.timeout = 0;

app.use('/pdfon/create',async (req, res) => {

    var url = req.query.url;
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    var p = 'pdfon/pdf/' + new Date().getTime()+''+parseInt( Math.random()*1000000)+'.pdf'
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({path: 'public/'+p, format: 'A4'});
    await browser.close();

    res.send({code:200,url:p})
})

// app.use('/',(req,res)=>{
//     res.redirect('/pdfon')
// })
console.log('http://localhost:5700/pdfon')
// (async () => {

// })();
//
