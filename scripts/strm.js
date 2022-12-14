// console.log('Is it Working');
let video = document.getElementById("myVidPlayer");
let canvas = document.getElementById("outputCanvas");
let canvasContext = canvas.getContext('2d');
let tempcanvas = document.getElementById("tempCanvas");
let tempcanvasContext = tempcanvas.getContext('2d');
// console.log('Till now')
function set_bg(a){
    if (a==1){
        localStorage.setItem("image_id","first_1");
    }
    else if (a==2){
        localStorage.setItem("image_id","second_2");
    }
    else if (a==3){
        localStorage.setItem("image_id","third_3");
    }
    else if (a==4){
        localStorage.setItem("image_id","fourth_4");
    }
    else if (a==5){
        localStorage.setItem("image_id","fifth_5");
    }
    else if (a==6){
        localStorage.setItem("image_id","sixth_6");
    }
}

navigator.mediaDevices.getUserMedia({
    video:true
}).then((value)=>video.srcObject=value).catch((err)=>console.log(err));

// processing the video
video.addEventListener('loadeddata',()=>{
    // we are keeping the same dimension of video and canvas
    let videoXPixels = video.videoWidth/2;
    let videoYPixels = video.videoHeight/2;
    canvas.width = videoXPixels;
    canvas.height = videoYPixels;
    // console.log(canvas.width, canvas.height)

    tempcanvas.width = videoXPixels;
    tempcanvas.height = videoYPixels;
    
    setInterval(() => {
    // here video is coming as a single frame
    canvasContext.drawImage(video, 0, 0, videoXPixels,videoYPixels);
    // console.log('Yep it is working')
    const videoFrameData = canvasContext.getImageData(0,0, canvas.width, canvas.height);
    // console.log(videoFrameData) --> it is an object
    // to access the image pixel data
    let pixelLength = videoFrameData.data.length/4

    for (let pixel = 0; pixel < pixelLength; pixel++) {
        let interval = pixel*4
        let r  = videoFrameData.data[interval+0]
        let g  = videoFrameData.data[interval+1]
        let b  = videoFrameData.data[interval+2]
        // let o  = videoFrameData.data[interval+3]
        // console.log(r,g,b,o)
        // condition to detect green background
        if (g>127) {
            if (g>b && g>r) {
                videoFrameData.data[interval+3] = 0;
                // console.log('is this block Working')
            }
        }
        // console.log('checking the Processing');
    }
    canvasContext.putImageData(videoFrameData, 0,0);
    },15);
})