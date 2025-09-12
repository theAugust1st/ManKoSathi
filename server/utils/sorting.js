const getValue = (item, sortBy) =>{
    const value = item[sortBy];
    if(typeof value === 'string'){
        return value.toLowerCase();
    }
    if(value instanceof Date){
        return value.getTime();
    }
    return item[sortBy]
}
const swap = (arr,a,b) =>[arr[a],arr[b]] = [arr[b],arr[a]]; 

function quickSort(arr, left = 0, right = arr.length - 1,sortBy) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right,sortBy);
        quickSort(arr, left, pivotIndex - 1,sortBy);
        quickSort(arr, pivotIndex + 1, right,sortBy);
    }
    return arr;
}

function partition(arr, start, end,sortBy) {
    const pivot = getValue(arr[start],sortBy)
    let s = start + 1;
    let e = end;

    while (s<e) {
        while (s <= end && getValue(arr[s],sortBy)<= pivot) {
            s++;
        }
        while (e >= start && getValue(arr[e],sortBy) > pivot) {
            e--;
        }
        if(s<e)
            swap(arr,s,e)

    }

        swap(arr,start,e)
        return e;
}

function sortArray(feature, sortBy, order = "asc") {

    const sorted = quickSort(feature.slice(), 0, feature.length - 1,sortBy);
    if(!sortBy){
        return sorted.reverse();
    }
    return order === 'asc' ? sorted : sorted.reverse();
}

module.exports = sortArray