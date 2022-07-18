
const http = require('http');
const fs = require('fs'); // to get data from html file
const fetchBalance = require('./src/controllers/fetchBalance');
const getLastOrders = require('./src/controllers/getLastOrders');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // req.url stores the path in the url
    var url = req.url;
    if (url === "/") {
        // fs.readFile looks for the HTML file
        // the first parameter is the path to the HTML page
        // the second is the call back function
        // if no file is found the function gives an error
        // if the file is successfully found, the content of the file are contained in pgres
        fs.readFile("index.html", function (err, pgres) {
            if (err)
                res.write("PAGE NOT FOUND");
            else {
                // The following 3 lines
                // are responsible for sending the html file
                // and ends the response process
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    } else {
        res.write("PAGE NOT FOUND");
    }

}).listen(3000, async function () {
    console.log("SERVER STARTED PORT: 3000");
    // const portfolio = await fetchBalance();
    // const orders = await getLastOrders(portfolio.balances);
    // console.log(portfolio)
    // console.log(orders)
});