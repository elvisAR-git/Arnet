const fs = require("fs");
const media = require("./media");
const express = require("express");
const MediaHandler = new media.MediaHandler();

const app = new express();
const mongo = require("mongodb");

// This is my node http web server

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:2323";
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log("Error");
    } else {
        const db = client.db("test");
        db.collection('students').find().toArray((err, results) => {
            if (err) {
                console.log("exception")
            } else {
                data = JSON.stringify(results)
                data = JSON.parse(data)
            }
        })
    }
});

app.get("/", (req, res) => {
    fs.readFile("./views/index.html", (err, response) => {
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

app.get("/chat", (req, res) => {
    fs.readFile("./views/chat.html", (err, response) => {
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

app.get("/fetch", (req, res) => {
    fs.readFile("./Others/messages.txt", (err, response) => {
        if (err) {
            print("error");
            res.writeHead(404);
            res.send("Page not Found");
            res.end();
        } else {
            data = response.toString("utf-8");
            data = data.split("\n");
            var messages = [];
            var previous = 0;
            data.forEach(element => {
                if (element.includes("Elvis.:")) {
                    msg = {
                        sender: "Elvis",
                        message: element
                    };
                    messages.push(msg);
                    previous = 1;
                } else if (element.includes("My Good Lady 😎:")) {
                    msg = {
                        sender: "Angel",
                        message: element
                    };
                    messages.push(msg);
                    previous = 0;
                } else {
                    if (previous === 0) {
                        msg = {
                            sender: "Angel",
                            message: element
                        };
                        messages.push(msg);
                        previous = 0;
                    } else {
                        msg = {
                            sender: "Elvis",
                            message: element
                        };
                        messages.push(msg);
                        previous = 1;
                    }
                }
            });
            var json_block = JSON.stringify(messages);
            res.send(json_block);
            res.end();
        }
    });
});

app.get("/styles/:filename", (req, res) => {
    console.log("[GET..." + req.url + "] from" + req.socket.remoteAddress);
    file = req.params.filename;

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on("media", data => {
            if (data) {
                resolution(data);
            } else {
                rejection("Error");
            }
        });
        MediaHandler.getStyleOr404(file);
    });

    promise.then(data => {
        res.setHeader("Content-Type", "text/css");
        res.writeHead(data.code);
        res.write(data.data);
        res.end();
    });
});

app.get("/js/:filename", (req, res) => {
    console.log("[GET..." + req.url + "] from" + req.socket.remoteAddress);
    file = req.params.filename;

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on("media", data => {
            if (data) {
                resolution(data);
            } else {
                rejection("Error");
            }
        });
        MediaHandler.getStyleOr404(file);
    });

    promise.then(data => {
        res.setHeader("Content-Type", "text/javascript");
        res.writeHead(data.code);
        res.write(data.data);
        res.end();
    });
});

app.get("/images/:filename", (req, res) => {
    file = req.params.filename;
    console.log("[GET..." + req.url + "] from" + req.socket.remoteAddress);
    promise = new Promise((resolution, rejection) => {
        MediaHandler.on("media", data => {
            if (data) {
                resolution(data);
            } else {
                rejection("Error");
            }
        });
        MediaHandler.getStyleOr404(file);
    });

    promise.then(data => {
        res.writeHead(data.code);
        res.write(data.data);
        res.end();
    });
});

app.get("/node_modules/:app_name/dist/:filename", (req, res) => {
    console.log("[GET..." + req.url + "] from" + req.socket.remoteAddress);
    file = req.params.filename;

    promise = new Promise((resolution, rejection) => {
        MediaHandler.on("media", data => {
            if (data) {
                resolution(data);
            } else {
                rejection("Error");
            }
        });
        MediaHandler.getStyleOr404(
            file,
            true,
            req.params.app_name,
            req.params.filename,
            ["dist"]
        );
    });

    promise.then(data => {
        res.setHeader("Content-Type", "text/javascript");
        res.writeHead(data.code);
        res.write(data.data);
        res.end();
    });
});

PORT = process.env.PORT || 3000;
app.listen(PORT, "localhost", () =>
    console.log(`Listening on port ${PORT}...`)
);