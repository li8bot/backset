let video;
let poseNet;
let noseX = 0;
let noseY = 0;



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  const poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose',gotPoses);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.nose.x;
    let nY = poses[0].pose.nose.y;
    noseX = lerp(noseX,nX,0.5);
    noseY = lerp(noseY,nY,0.5);
  }
}

function modelReady() {
  console.log('model ready');
}



function draw() {
  image(video,0,0);
  fill(255,0,0);
  ellipse(noseX,noseY,100);
}