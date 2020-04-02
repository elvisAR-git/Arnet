const fs = require('fs')
const MEDIA_DIR = './styles/'
const IMAGE_DIR = './images/'
const JS_DIR = './js/'
const EventEmitter = require('events')

class MediaHandler extends EventEmitter{
    getStyleOr404(filename){
        this.setMaxListeners(10000)
        // serves images
        if (filename.includes('.jpg') || filename.includes('.png') || filename.includes('.svg') || filename.includes('.jpeg') ){
            fs.readFile(IMAGE_DIR + filename,(err, data)=>{
                if(err){
                    console.log('404 ---->' + '/' +filename,'error' + err)
                    return {'code':404,'data':'Page not found'}
                }else{
                    console.log('200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }else if(filename.includes('.css')){
            // serves CSS files
            fs.readFile(MEDIA_DIR + filename,(err, data)=>{
                if(err){
                    console.log('404 ---->' + '/' +filename)
                    return {'code':404,'data':'Page not found'}
                }else{
                    console.log('200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }else if(filename.includes('.js')){
            // handle javascript
            fs.readFile(JS_DIR + filename,(err, data)=>{
                if(err){
                    console.log('404 ---->' + '/' +filename,'error' + err)
                    return {'code':404,'data':'Page not found'}
                }else{
                    console.log('200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }
    }
}

module.exports.MediaHandler = MediaHandler