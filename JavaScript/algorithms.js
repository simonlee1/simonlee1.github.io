function swap(data, index1, index2){
  var temp = data[index1];
  data[index1] = data[index2];
  data[index2] = temp;
}

function bubbleSort(data){
  var switches = [];
  for (k = 0; k < data.length; k++){
    for (j = 0; j < data.length-k-1; j++){
      if (data[j] > data[j+1]){
        switches.push([j, j+1]);
        swap(data, j, j+1);
      }
    }
  }
  return switches;
}

function selectionSort(data){
  var switches = [];
  for (i = 0; i < data.length; i++){
    var lowest = 100000;
    var lowestIndex = -1;
    for (j = i; j < data.length; j++){
      if(data[j] < lowest){
        lowest = data[j];
        lowestIndex = j;
      }
    }
    switches.push([i,lowestIndex]);
    swap(data, i, lowestIndex);
  }

  return switches
}

function selectMedian(array, low, high){
  var midIndex = low + Math.floor((high-low)/2);
  if ((array[low] < array[midIndex] && array[low] > array[high]) || (array[low] > array[midIndex] && array[low] < array[high])){
    return low;
  }
  else if((array[midIndex] > array[low] && array[midIndex] < array[high]) || (array[midIndex] < array[low] && array[midIndex] > array[high]) ){
    return midIndex;
  }
  else{
    return high;
  }

}

function partition(array, low, high, switches){
  var pivotIndex = selectMedian(array, low, high);
  var pivot = array[pivotIndex];
  switches.push([pivotIndex, high]);
  swap(array, pivotIndex, high);

  j = low - 1;
  for (i = low; i < high; i++){
    if(array[i] < pivot){
      j++;
      switches.push([i,j]);
      swap(array, i, j);
    }
  }

  switches.push([j + 1, high]);
  swap(array, j + 1, high);
  return j + 1;
}

function quickSort(array, low, high, switches){
  if(low < high){
    var partitionIndex = partition(array, low, high, switches);
    quickSort(array, low, partitionIndex - 1, switches);
    quickSort(array, partitionIndex + 1, high, switches);
  }
}

function insert(array,index1, index2, switches){
  swap(array, index1, index2);
  switches.push([index1, index2]);

  for (i = index1 + 1; i <= index2; i++){
    swap(array,i, index2);
    switches.push([i,index2]);
  }

}

function merge(array, left, mid, right, switches){
  var i = left;
  var j = mid + 1;

  while(j < right + 1 && i < right + 1){
    if(array[i] < array[j]){
      i++;
    }
    else{
      insert(array, i, j, switches);
      j++;
    }
  }

}

function mergeSort(array, left, right, switches){
  if(left < right){
    var mid = left + Math.floor((right-left)/2);

    mergeSort(array, left, mid, switches);
    mergeSort(array,mid +1, right, switches);

    merge(array, left, mid, right, switches);
  }


}
