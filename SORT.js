/**
* SORT 
* The MIT License - Copyright (c) Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/sack.git
* info: 插入排序:直接插入排序insertSort(),希尔排序shellSort()
*       交换排序:冒泡排序bubbleSort(),快速排序quickSort()
*       选择排序:直接选择排序selectSort()
*/
(function(name,factory){
	if(typeof define === 'function' && define.amd) define(factory);//AMD
	else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
	else this[name] = factory();//Global
})('SORT',function(){
	function insertSort(arr,d){
		var length = arr.length,d = !d?1:d;
		for(var i = d;i < length;i += d){
			var temp = arr[i];
			if(temp < arr[i-d]){
				var j = i - d;
				while(j >= 0 && temp < arr[j]){
					arr[j+d] = arr[j];
					j -= d;
				}
				arr[j+d] = temp;
			}
		}
		return arr;
	}
	function shellSort(arr){
		var d = parseInt(arr.length/2);
		while(d != 0){
			d = (d%2 == 0?d+1:d);
			insertSort(arr,d);
			d = parseInt(d/2);
		}
		return arr;
	}

	function bubbleSort(arr){
		var length = arr.length;
		for(var i = 0;i < length;i++){
			var left = length - i;
			for(var j = 0;j<left-1;j++){
				var temp = arr[j];
				if(temp > arr[j+1]){
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
			
		}
		return arr;
	}
	function quickSort(arr,l,h){
		var l = (!l?0:l),h = (!h?arr.length - 1:h),base;
		if(l < h){
			var i = l,j = h,base = arr[i];
			while(i != j){
				while(i != j && arr[j] >= base)    j--;
				if(i != j)    arr[i++] = arr[j]; 
				while(i != j && arr[i] <= base)    i++;
				if(i != j)    arr[j--] = arr[i];
			}
			arr[i] = base;
			
			if(l < i-1) quickSort(arr,l,i-1);
			if(i+1 < h) quickSort(arr,i+1,h);
		}else{
			return;
		}
		return arr;
	}

	function selectSort(arr){
		var length = arr.length;
		for(var i = 0;i<length;i++){
			var j = i,base = arr[j],index = j;
			while(j<length-1){
				if(base > arr[j+1]){
					base = arr[j+1];
					index = j+1;
				}
				j++;
			}
			arr[index] = arr[i];
			arr[i] = base;
		}
		return arr
	}

	return{
		insertSort:insertSort,
		shellSort:shellSort,
		bubbleSort:bubbleSort,
		quickSort:quickSort,
		selectSort:selectSort
	}
})
