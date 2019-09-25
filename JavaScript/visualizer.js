function drawGraph(currentData){
  $("#arrayHolder").empty();
  var maxHeight = 500;
  for(i=0; i < currentData["array"].length; i++){
    var height = maxHeight * (currentData["array"][i]/currentData["array"].length)
    var width = (parseInt(window.innerWidth, 10)/currentData["array"].length)-5;
    var newItem = `
      <div class='arrayElement' arrayValue='${currentData["array"][i]}' style='height: ${height}px;width:${width}px;background-color: #555;display:inline-block;'>
      </div>
    `
    $("#arrayHolder").append(newItem);
  }
}

function clearUnderlines(){
  elements = document.getElementsByName("algorithm");

  for (i = 0; i < elements.length; i++){
    elements[i].style.textDecoration = "none";
  }
}

function getSpeedWeight(algorithm){
  var speedWeight;
  if (algorithm == "bubble"){
    speedWeight = 100;
  }
  else if(algorithm == "select"){
    speedWeight = 150;
  }
  else if (algorithm == "quick"){
    speedWeight = 150;
  }
  else if (algorithm == "merge"){
    speedWeight = 100;
  }
  return speedWeight;
}

function updateOptions(algorithm, curElement){
  if(curElement != undefined){
    clearUnderlines();
    curElement.style.textDecoration = "underline";
  }
  var speedWeight = getSpeedWeight(algorithm);
  visualizerData["algorithm"] = algorithm;
  visualizerData["size"] = parseInt($("#arraySize").val()) + 10;
  visualizerData["array"] = generateRandomArray(parseInt($("#arraySize").val()) + 10);
  visualizerData["speed"] = speedWeight - parseInt($("#arraySize").val())

  if("id" in visualizerData){
    clearInterval(visualizerData["id"]);
  }

  drawGraph(visualizerData);
  document.getElementById("start").setAttribute("onClick", "run();");
}

function generateNewGraph(){
  updateOptions(visualizerData["algorithm"]);
  drawGraph(visualizerData);
  document.getElementById("start").setAttribute("onClick", "run();");
}

function initializeVisualizer(data){
  data["algorithm"] = "bubble";
  data["size"] = 60;
  data["array"] = generateRandomArray(60);
  data["speed"] = 100;
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

function getListOfElements(){
  var array = document.getElementsByClassName("arrayElement");
  var returnable = [];

  for (var i = 0; i < array.length; i++){
    returnable.push(parseInt(array[i].getAttribute("arrayvalue")));
  }

  return returnable;
}


function switchElement(array, index1, index2){
  var tempHeight = array[index1].style.height;
  var tempValue = array[index1].arrayValue;
  var tempBackgorundColor = array[index1].style.backgroundColor;
  array[index1].style.height = array[index2].style.height;
  array[index1].arrayValue = array[index2].arrayValue
  array[index1].style.backgroundColor = array[index2].style.backgroundColor;
  array[index2].style.height = tempHeight;
  array[index2].arrayValue = tempValue;
  array[index2].style.backgroundColor = tempBackgorundColor;
}

function clearPrevHighlight(curIndex, switches, array){
  if(curIndex != 0){
    prevIndex1 = switches[curIndex-1][0];
    prevIndex2 = switches[curIndex-1][1];
    array[prevIndex1].style.backgroundColor = "#555";
    array[prevIndex2].style.backgroundColor = "#555";
  }
}

function highlight(array, index1, index2, curIndex, switches){

  clearPrevHighlight(curIndex, switches, array);

  if (curIndex < switches.length){
    array[index1].style.backgroundColor = "rgb(0,255,0)";
    array[index2].style.backgroundColor = "rgb(255,0,0)";
  }

}

function retrieveSwitches(array){
  if (visualizerData["algorithm"] == "bubble"){
    return bubbleSort(array);
  }
  else if(visualizerData["algorithm"] == "select"){
    return selectionSort(array);
  }
  else if (visualizerData["algorithm"] == "quick"){
    var switches = [];
    quickSort(array, 0, array.length - 1, switches);
    return switches;
  }
  else if(visualizerData["algorithm"] == "merge"){
    var switches = [];
    mergeSort(array, 0, array.length -1, switches);
    return switches;
  }
  else{
    return [];
  }
}

function run(){
  var array = getListOfElements();
  var switches = retrieveSwitches(array);

  var id = setInterval(frame, visualizerData["speed"]);
  visualizerData["id"] = id;
  var curIndex = 0;
  var elements = document.getElementsByClassName("arrayElement")
  highlight(elements, switches[curIndex][0], switches[curIndex][1], curIndex, switches)
  document.getElementById("start").setAttribute("onClick", "");

  function frame() {
    if (curIndex >= switches.length) {
      clearPrevHighlight(curIndex, switches, elements);
      clearInterval(id);
    } else {
      switchElement(elements, switches[curIndex][0], switches[curIndex][1]);
      curIndex += 1;
    }
    if (curIndex < switches.length){
      highlight(elements, switches[curIndex][0], switches[curIndex][1], curIndex, switches);
    }

  }



}
