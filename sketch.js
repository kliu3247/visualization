let protestCrowd
let amp;
let myLevels = [];
let started  = false;
let loaded = false;

//set loaded to true
function setLoaded(){
  loaded = true;
}

//load sound
function preload(){
  console.log(loaded);
  //setLoaded is a function that will run after sound is loaded
  protestCrowd = loadSound('protestCrowd.mp3', setLoaded);
}

function setup() {
  console.log(loaded);
  createCanvas(400, 400);
  stroke(0);
// crteate new amplitude object
  amp = new p5.Amplitude();
}

function draw() {
  background(220);

  //if not started then draw some text
  // otherwise draw the amplitude
  if(!started){
    drawStartScreen();
  } else {
    if(loaded){
      drawAmplitude();
    }
   
  }
}

//a function to draw some text
function drawStartScreen(){
  fill(0);
  textSize(30);
  text('click screen to start sound', 10, 100);
}

//draw the amplitude
function drawAmplitude(){
//get the current amplitude
  let vol = amp.getLevel();
  if (vol > 0){
    //if current amplitude is greater than zero, push it to levels array
  myLevels.push(vol);
  }


    // no fill color ie just a line
    noFill();

//begin shape starts a new shape with any number of vertexes
    beginShape()
  
    myLevels.forEach((level, i) => {
      // remap the value
      let y = map(level, 0.001, 0.4, height, 0);
      console.log(y);
      vertex(i,y);
    })  

    //end the shape
    endShape();
  
    // if the number of levels is bigger than half of the screen, delete the first one
    // this creates the scrolling effect
    if(myLevels.length > width - 150){
      myLevels.splice(0, 1);
    }
  
  
}

//change the stroke color to a new random color
function changeStrokeColor(){
  stroke(random(255), random(255), random(255));
}


//start the sound and set started to true so that drawAmplitude will run
function mousePressed(){
started = true;
protestCrowd.play();

}