url = 'http://mylogger.io/log'

const EventEmitter = require('events')
const emitter = new EventEmitter()

function log(message){
    console.log(message)
}

emitter.on('error',(info=null)=>{
    console.log("Error", info, ' handled by logger')
})

module.exports.log = log
module.exports.url = url
module.exports.emitter = emitter