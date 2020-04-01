const fs = require('fs')
const MEDIA_DIR = './styles/'
const EventEmitter = require('events')

class MediaHandler extends EventEmitter{
    getStyleOr404(filename){
        fs.readFile(MEDIA_DIR + filename,(err, data)=>{
            if(err){
                console.log('404 ---->' + '/' +filename)
                return {'code':404,'data':'Page not found'}
            }else{
                console.log('200 ---->' + '/' + filename)
                this.emit('media',{'code':200,'data':data})
            }
        })
    }
}

module.exports.MediaHandler = MediaHandler