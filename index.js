const logger = require('./logger')
const path = require('path')
const os = require('os')
const fs = require('fs')

logger.log("Hello Elvis")

pth = path.parse(__filename)
// logger.log(pth)

// logger.log(`Free Memory ${os.freemem()}`)


var files = fs.readdirSync('./')
// console.log(files)

fs.readdir('./',(err, files)=>{
    if(err){
        console.log(err)
    }else{
        console.log(files)
    }
})