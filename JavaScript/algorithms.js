function bubbleSort(visualizerData){
  var array = visualizerData["array"];
  for (i = 0; i <array.length; i++){
    for (j = 0; j < array.length-i-1;j++){
      if array[j] > array[j+1]{
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
}
