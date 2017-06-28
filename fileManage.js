var topLine="";
var bottomLine="";

function handleTextChange(event){
  console.log("Recieved text");
  var id = event.target.id;
  var text = event.target.value;
  console.log(text);
  if(id == "topLine")
    topLine = text;
  else
    bottomLine = text;
  redrawMeme(window.imageSrc, topLine, bottomLine);
}

function handleFileSelect(event){
  // Callback from a <input type="file" onchange="handleFileSelect(event)">
    console.log("Handling file event");
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      // The file's text will be printed here
      var data = event.target.result;
      console.log("Reader load done..");
      var image = new Image();
      image.onload = function () {
          console.log("Image load done..");
          window.imageSrc = this;
          redrawMeme(window.imageSrc, topLine, bottomLine);
        }

       image.src = data;
       // console.log(imageSrc);
    };
    reader.readAsDataURL(file);
  
}

function handleSubmit(event){
  window.open(document.querySelector('canvas').toDataURL());
}

function redrawMeme(image, topLine, bottomLine){

  console.log("Starting redrawmeme..");
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  console.log("Loaded image");
  ctx.drawImage(image,0,0,canvas.width, canvas.height);

  ctx.font = "36pt Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(topLine ,canvas.width/2,50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeText(topLine ,canvas.width/2,50);

  ctx.font = "36pt Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(bottomLine ,canvas.width/2,canvas.height-50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeText(bottomLine ,canvas.width/2,canvas.height-50);
}