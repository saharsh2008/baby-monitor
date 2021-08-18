img = "";
status = "";
song = "";
babyThere = false;
objects = [];

function preload() {
    song = loadSound("alarm.mp3");
    img1 = loadImage("baby.jpeg")
    img2 = loadImage("no-baby.jpeg")
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function switchPic() {
    if (babyThere = true) {
        babyThere = "";
    } else if (babyThere = "") {
        babyThere = true;
    }
}

function modelLoaded() {
    console.log("Model is loaded!");
    status = true;
    if (babyThere = true) {
        objectDetector.detect(img1, gotResult);
    } else if (babyThere != true) {
        objectDetector.detect(img2, gotResult);
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    if (babyThere = true) {
        img = img1
    } else if (babyThere != true) {
        img = img2
    }
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 12);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[0].label != "person") {
                document.getElementById("baby-info").innerHTML = "Baby not Found!"
                song.play();
                song
            } else {
                document.getElementById("baby-info").innerHTML = "Baby is here!"
            }
        }
    }
}