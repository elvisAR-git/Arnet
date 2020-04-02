const fs = require('fs');
const media = require('./media');
const express = require('express');
const MediaHandler = new media.MediaHandler();

const app = new express();

// This is my node http web server

app.get('/', (req, res) => {
    fs.readFile('./views/index.html', (err, response) => {
        if (err) {
            res.writeHead(404);
            res.send("Page not Found");
            res.end();
        } else {
            res.writeHead(200);
            res.write(response);
            res.end();
        }
    });
});

app.get('/styles/:filename', (req, res) => {
    console.log('[GET...' + req.url + '] from' + req.socket.remoteAddress)
    file = req.params.filename;

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on('media', (data) => {
            if (data) {
                resolution(data);
            } else {
                rejection('Error');
            }
        });
        MediaHandler.getStyleOr404(file);

    });

    promise.then((data) => {
        res.setHeader("Content-Type", 'text/css');
        res.writeHead(data.code);
        res.write(data.data);
        res.end();
    });
});

app.get('/js/:filename', (req, res) => {
    console.log('[GET...' + req.url + '] from' + req.socket.remoteAddress)
    file = req.params.filename;

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on('media', (data) => {
            if (data) {
                resolution(data);
            } else {
                rejection('Error');
            }
        });
        MediaHandler.getStyleOr404(file);

    });


    promise.then((data) => {
        res.setHeader("Content-Type", 'text/javascript');
        res.writeHead(data.code)
        res.write(data.data)
        res.end()
    })
})

app.get('/images/:filename', (req, res) => {
    file = req.params.filename
    console.log('[GET...' + req.url + '] from' + req.socket.remoteAddress)
    promise = new Promise((resolution, rejection) => {
        MediaHandler.on('media', (data) => {
            if (data) {
                resolution(data)
            } else {
                rejection('Error')
            }
        })
        MediaHandler.getStyleOr404(file)

    })

    promise.then((data) => {
        res.writeHead(data.code)
        res.write(data.data)
        res.end()
    })
})

app.get('/node_modules/:app_name/dist/:filename', (req, res) => {
    console.log('[GET...' + req.url + '] from' + req.socket.remoteAddress)
    file = req.params.filename

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on('media', (data) => {
            if (data) {
                resolution(data)
            } else {
                rejection('Error')
            }
        })
        MediaHandler.getStyleOr404(file, true, req.params.app_name, req.params.filename, ['dist'])

    })

    promise.then((data) => {
        res.setHeader("Content-Type", 'text/javascript');
        res.writeHead(data.code)
        res.write(data.data)
        res.end()
    })
})

PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))