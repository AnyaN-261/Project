song1= "";
song2= "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0; 
Song1Status = 0;
Song2Status=0;

function preload() {
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses)
}
function modelLoaded() {
    console.log("Model is Initialized");
}
function gotPoses(results) {
if (results.length > 0) {
    console.log(results);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("leftWristX="+ leftWristX + ", leftWristY="+ leftWristY);
    console.log("rightWristX="+ rightWristX + ", rightWristY="+ rightWristY);

}
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#9af5f2");
    stroke("#131717");
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        song2.stop();

        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";

        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan Theme Song";
            
        }
    }

}

