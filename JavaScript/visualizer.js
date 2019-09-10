function drawGraph(visualizerData){

  for(i=0; i < visualizerData["array"].length; i++){
    var width = parseInt(window.innerWidth, 10)/visualizerData["array"].length;
    var newItem = `
      <div style='height: ${visualizerData["array"][i]}px;width:50px;background-color: #555'>
      </div>
    `

    $("#arrayHolder").append(newItem);
  }
}

function initializeVisualizer(visualizerData){
  visualizerData["algorithm"] = "bubble";
  visualizerData["size"] = 50;
  visualizerData["array"] = generateRandomArray(50);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateRandomArray(size){
  var array = [];
  for(i = 1; i <= size; i++){
    array.push(i);
  }
  shuffleArray(array);

  return array
}

function getValue(visualizerData){
}
