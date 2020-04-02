const fs = require('fs')
const MEDIA_DIR = './styles/'
const IMAGE_DIR = './images/'
const JS_DIR = './js/'
const APP_DIR = './node_modules/'
const EventEmitter = require('events')

class MediaHandler extends EventEmitter{
    getStyleOr404(filename,app=false,app_name=null,file_name=null, subfolders=[]){
        this.setMaxListeners(10000)
        // serves app imports
        if(app){
            var strmain = ''
            subfolders.forEach(element => {
                strmain =  strmain + element + '/'
            });
            fs.readFile(APP_DIR + app_name +'/'+ strmain +'/'+ file_name,(err, data)=>{
                if(err){
                    console.log('404 ---->' + '/'+ strmain +'/'+filename,'error' + err)
                    this.emit('media',{'code':404,'data':'file not found'})
                }else{
                    console.log('200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }else{
        // serves images
        if (filename.includes('.jpg') || filename.includes('.png') || filename.includes('.svg') || filename.includes('.jpeg') ){
            fs.readFile(IMAGE_DIR + filename,(err, data)=>{
                if(err){
                    console.log('404 ---->' + '/' +filename,'error' + err)
                    this.emit('media',{'code':404,'data':'file not found'})
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
                    this.emit('media',{'code':404,'data':'file not found'})
                }else{
                    console.log('200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }else if(filename.includes('.js')){
            // handle javascript
            fs.readFile(JS_DIR + filename,(err, data)=>{
                if(err){
                    console.log('[404 ---->' + '/' +filename,'error' + err)
                    this.emit('media',{'code':404,'data':'file not found'})
                }else{
                    console.log('[200 ---->' + '/' + filename)
                    this.emit('media',{'code':200,'data':data})
                }
            })
        }
    }}
}

module.exports.MediaHandler = MediaHandler