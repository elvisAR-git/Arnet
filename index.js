const http = require('http')
const fs = require('fs')
const media = require('./media')

const MediaHandler = new media.MediaHandler()

const server = http.createServer(
    function(req, res){
        if(req.url === '/'){
            fs.readFile('./views/index.html',(err, response)=>{
                if (err){
                    res.writeHead(404)
                    res.write("Page not Found");
                    res.end()
                }else{
                    res.writeHead(200)
                    res.write(response)
                    res.end()
                }
            })
        }
        if(req.url.includes('styles') || req.url.includes('images') || req.url.includes('js')){
            console.log('[GET...' + req.url + '] from' + req.socket.remoteAddress)
            file = req.url.split('/')
            file = file.slice(-1).pop()
            
            promise = new Promise((resolution,rejection)=>{
                MediaHandler.on('media',(data)=>{
                    var data = data
                    if (data){
                        resolution(data)
                    }else{
                        rejection('Error')
                    }
                })
                MediaHandler.getStyleOr404(file)
                
            })
            
            promise.then((data)=>{
                res.writeHead(data.code)
                res.write(data.data)
                res.end()
            })   
        }
    }
)
console.log("Server started at port 3000")
server.listen(3000)


