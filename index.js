const puppeteer = require('puppeteer');
const express = require('express');
const serveStatic = require('serve-static')
const static = serveStatic('public')
const bodyParser = require("body-parser");

const util = require('util')
const exec = util.promisify(require('child_process').exec);

app = express()
app.use(bodyParser.json({ type: 'application/json',limit:'50mb' }))
app.use(bodyParser.urlencoded({ extended: false,limit:'50mb' }));
app.use(static);

s = app.listen(5700)
s.timeout = 0;

app.use('/pdfon/create',async (req, res) => {

    var url = req.query.url;
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    var p = new Date().getTime()+''+parseInt( Math.random()*1000000)+'.pdf'
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({path: '/tmp/'+p, format: 'A4'});

    var cmd= (`ossutil cp ${'/tmp/'+p} oss://aomengassets/upup/files/`)
    console.log(cmd)
    exec(cmd)

    await browser.close();

    res.send({code:200,url:'https://cdn.all-dream.com/upup/files/'+p})
})

// app.use('/',(req,res)=>{
//     res.redirect('/pdfon')
// })
console.log('http://localhost:5700/pdfon')
// (async () => {

// })();
//
