let video;
let poseNet;
//let noseX = 0;
//let noseY = 0;
//let eyelX = 0;
//let eyelY = 0;

let leftEye = 0;
let rightEye = 0;
let leftShoulder = 0;
let rightShoulder = 0;
let nose = [0,0];
let shoulderMiddlePoint = [0, 0];

let le2d = [0,0];
let re2d = [0,0];

function setup() {
  createCanvas(640, 480);
  button = createButton('Calibrate');
  button.position(19, 19);
  button.mouseClicked(changeBG);
  video = createCapture(VIDEO);
  video.hide();
  const poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose',gotPoses);
}

function changeBG() {
  let val = random(255);
  background(val);
}

function gotPoses(poses) {
  //console.log(poses);
  let onBreak = false;
  if (poses.length > 0) {
    let earScore = [poses[0].pose.leftEar.confidence, poses[0].pose.rightEar.confidence];
    const noAttention = (earScore[0] < 0.3) || (earScore[1] < 0.3);
    if(noAttention) {
      console.log("Distracted");
    }
    else {
      console.log("Attentive");
    }
    
    leftEye = [poses[0].pose.leftEye.x,poses[0].pose.leftEye.y];
    rightEye = [poses[0].pose.rightEye.x, poses[0].pose.rightEye.y];
    
    leftShoulder = [poses[0].pose.leftShoulder.x, poses[0].pose.leftShoulder.y];
    rightShoulder = [poses[0].pose.rightShoulder.x, poses[0].pose.rightShoulder.y];
    
    nose = [poses[0].pose.nose.x, poses[0].pose.nose.y];
    
    eyeDist = dist(leftEye[0],leftEye[1],rightEye[0],rightEye[1]);
    shoulderDist = dist(leftShoulder[0],leftShoulder[1],rightShoulder[0],rightShoulder[1]);
    //console.log(eyeDist);
    //console.log(shoulderDist);
    
    shoulderMiddlePoint = getMiddlePoint(leftShoulder,rightShoulder);
    
    le2d[0] = lerp(le2d[0], leftEye[0], 0.75);
    le2d[1] = lerp(le2d[1], leftEye[1], 0.75);
    re2d[0] = lerp(re2d[0], rightEye[0], 0.75);
    re2d[1] = lerp(re2d[1], rightEye[1], 0.75);
    console.log("Present")
  }
  else {
    onBreak = true;
    console.log("Absent")
  }
}

function getMiddlePoint(left,right) {
  return [(left[0] + right[0])/2,(left[1] + right[1])/2];
}

function modelReady() {
  console.log('model ready');
}

function eye(x, y, size, n) {
	let angle = frameCount * 0.2;
	
	fill(255);
	noStroke();
	ellipse(x, y, size);
	
	fill(56);
	noStroke();
	ellipse(x+cos(angle*n)*size/5, y+sin(angle*n)*size/5, size/2);
}


function draw() {
  image(video,0,0);
  noseDist = dist(nose[0],nose[1],shoulderMiddlePoint[0],shoulderMiddlePoint[1]);
  const isSlouch = noseDist < (170 -25);
  //console.log(noseDist);
  
  if(isSlouch == true) {
    let d = dist(nose[0], nose[1], le2d[0], le2d[1]);
    let distance = d*4/5;
    fill(255, 0, 0);
    ellipse(nose[0], nose[1], distance);
    eye(le2d[0], le2d[1], distance, 1);
    eye(re2d[0], re2d[1], distance, -1);
  } 
}