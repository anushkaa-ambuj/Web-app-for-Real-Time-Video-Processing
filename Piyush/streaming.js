// console.log('Is it Working');

let video = document.getElementById("myVidPlayer")
let canvas = document.getElementById("outputCanvas")
let canvasContext = canvas.getContext('2d');

let videoBg = document.createElement("video")
videoBg.src ="pexels-rodnae-productions-8474604.mp4";


// console.log('Till now')

// streaming of video

navigator.mediaDevices.getUserMedia({
    video:true
}).then((value)=>video.srcObject=value).catch((err)=>console.log(err))


// processing the video
video.addEventListener('loadeddata',()=>{
    // we are keeping the same dimension of video and canvas
    let videoXPixels = video.videoWidth;
    let videoYPixels = video.videoHeight;
    canvas.width = videoXPixels;
    canvas.height = videoYPixels;
    // console.log(canvas.width, canvas.height)
    
    setInterval(() => {
    // here video is coming as a single frame
    canvasContext.drawImage(video, 0, 0, videoXPixels,videoYPixels);
    canvasContext.drawImage(videoBg,0,0,videoBg.videoWidth, videoBg.videoHeight);

    // console.log('Yep it is working')
    const videoFrameData = canvasContext.getImageData(0,0, canvas.width, canvas.height);
    const BgFrameData = canvasContext.getImageData(0,0,videoBg.videoWidth, videoBg.videoHeight);

    // console.log(videoFrameData) --> it is an object
    // to access the image pixel data
    let pixelLength = videoFrameData.data.length/4

    for (let pixel = 0; pixel < pixelLength; pixel++) {
        let interval = pixel*4
        let r  = videoFrameData.data[interval+0]
        let g  = videoFrameData.data[interval+1]
        let b  = videoFrameData.data[interval+2]
        let o  = videoFrameData.data[interval+3]
        // console.log(r,g,b,o)
        // condition to detect green background
        if (g>117) {
            if (g>b && g>r) {
                //videoFrameData.data[interval+3] = 0
                videoFrameData.data[interval+1] = BgFrameData.data[interval+1]
                videoFrameData.data[interval+2] = BgFrameData.data[interval+2]
                videoFrameData.data[interval+3] = BgFrameData.data[interval+3]
                // console.log('is this block Working')
            }
        }
        // console.log('checking the Processing');
        
        
    }
    canvasContext.putImageData(videoFrameData, 0,0);
    },15);
})
