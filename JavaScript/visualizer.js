function drawGraph(currentData){
  $("#arrayHolder").empty();
  var maxHeight = 500;
  for(i=0; i < currentData["array"].length; i++){
    var height = maxHeight * (currentData["array"][i]/currentData["array"].length)
    var width = (parseInt(window.innerWidth, 10)/currentData["array"].length)-5;
    var newItem = `
      <div style='height: ${height}px;width:${width}px;background-color: #555;display:inline-block;'>
      </div>
    `
    $("#arrayHolder").append(newItem);
  }
}

function initializeVisualizer(data){
  data["algorithm"] = "bubble";
  data["size"] = 60;
  data["array"] = generateRandomArray(60);
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
