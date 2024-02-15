let classificar;

let imageModelUrl = 'https://teachablemachine.withgoogle.com/models/LO_algdhn/'


let video;
let flippedVideo;

let label = "";


function preload() {
    classificar = ml5.imageClassifier(imageModelUrl + 'model.json');
}

function setup() {
    createCanvas(320, 240);

    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);

    classifyVideo();
    
}

function draw() {
    background(0);

    image(flippedVideo, 0, 0);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);



}


function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classificar.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    console.log(results[0]);
    label = results[0].label;

    classifyVideo();
}