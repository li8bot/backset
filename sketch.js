let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X = 0, eye1Y = 0, eye2X = 0, eye2Y = 0;

function setup() {
  createCanvas(640, 460);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);
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

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX, nX, 0.75);
    noseY = lerp(noseY, nY, 0.75);
    
    let e1X = poses[0].pose.keypoints[1].position.x;
    let e1Y = poses[0].pose.keypoints[1].position.y;
    eye1X = lerp(eye1X, e1X, 0.75);
    eye1Y = lerp(eye1Y, e1Y, 0.75);
    
    let e2X = poses[0].pose.keypoints[2].position.x;
    let e2Y = poses[0].pose.keypoints[2].position.y;
    eye2X = lerp(eye2X, e2X, 0.75);
    eye2Y = lerp(eye2Y, e2Y, 0.75);
  }
  else {
    noseX = -10;
    noseY = -10;
    eye1X = -10;
    eye1Y = -10;
    eye2X = -10;
    eye2Y = -10;
  }
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eye1X, eye1Y);
  
  let distance = d*4/5;

  fill(255, 0, 0);
  ellipse(noseX, noseY, distance);
  
  eye(eye1X, eye1Y, distance, 1);
  eye(eye2X, eye2Y, distance, -1);
}