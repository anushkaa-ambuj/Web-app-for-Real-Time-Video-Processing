console.log('Is it Working');

let video = document.getElementById("myVidPlayer")
let canvas = document.getElementById("outputCanvas")
let canvasContext = canvas.getContext('2d');


console.log('Till now')

// streaming of video

navigator.mediaDevices.getUserMedia({
    video:true
}).then((value)=>video.srcObject=value).catch((err)=>console.log(err))