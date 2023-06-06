function setup() {
    canvas=createCanvas(280, 280);
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function clearCanvas() {
    background("rgb(250, 195, 86)");
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    var result=results[0].label;
    document.getElementById('label').innerHTML='Nome: '+result.replace('_', ' ');
    document.getElementById('confidence').innerHTML='Precisão: '+Math.round(results[0].confidence*100)+'%';
    utterThis=new SpeechSynthesisUtterance(result.replace('_', ' '));
    synth.speak(utterThis);
}