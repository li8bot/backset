let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  const poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose',gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.nose.x;
    let nY = poses[0].pose.nose.y;
    let elX = poses[0].pose.leftEye.x;
    let elY = poses[0].pose.leftEye.y;
    noseX = lerp(noseX,nX,0.5);
    noseY = lerp(noseY,nY,0.5);
    eyelX = lerp(eyelX,elX,0.5);
    eyelY = lerp(eyelY,elY,0.5);
  }
}

function modelReady() {
  console.log('model ready');
}



function draw() {
  image(video,0,0);
  let d = dist(noseX,noseY,eyelX,eyelY);
  fill(255,0,0);
  ellipse(noseX,noseY,d);
  //fill(0,0,255);
  //ellipse(eyelX,eyelY,100);
}