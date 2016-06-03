var matrix = [ ['A','B','C','D'] , ['E','F','G','H'] , ['I','J','K','L'], ['M','N','O','P'] ];
var solution = [ [0,0,0,0] , [0,0,0,0] , [0,0,0,0], [0,0,0,0] ];
var visitedNodes = [ ["","","",""] , ["","","",""] , ["","","",""], ["","","",""] ];
var list = [];
var FormedWord = "";
var wordlength = 7;
var g_width = 4;

var path = 1;

$(document).ready(function(){
	//searchWord(matrix)
	setMatrix($('.matrix'));

	//when matrix changes array will be set.
	$('.matrix').blur(function(){
		setMatrix($('.matrix'));
	});

	$('#matrixlength').blur(function(){
		debugger
		$('tbody').empty();
		var length = +$(this).val()+0;
		for(i=0;i<length;i++){
			debugger
			$('tbody').append(generateTD(length));
		}
	});

	$('#searchbtn').click(function(){
		debugger
		var row = +$('#row').val()+0;
		var col = +$('#col').val()+0;
		wordlength = +$('#wordlength').val()+0;
		list = [];
		visitedNodes = [ ["","","",""] , ["","","",""] , ["","","",""], ["","","",""] ];
		solution = [ [0,0,0,0] , [0,0,0,0] , [0,0,0,0], [0,0,0,0] ];
		setMatrix($('.matrix'));
		searchWord(matrix,row,col);
		updateList();
	})
});

function searchWord(matrix,row,col) {
		var N = +$('#matrixlength').val()+0;
		search(matrix, row, col, 0, N);
		return false;
}
function search( matrix, row, col, index,  N, isBacktrack) {

		// check if current cell not already used or character in it is not not

		if (solution[row][col] != 0) {
				return false;
		}

		if (index == wordlength) {
			// word is found, return true 
			solution[row][col] = path++;
			pushWord();

			//reset variables
			path--;
			index--;
			solution[row][col] = 0;
			xy1 = findXY(solution,path)
			if(xy1 != undefined)
				solution[xy1[0]][xy1[1]] = 0;
			else
				xy1 = [row,col];
			xy2 = findXY(solution,path-1);
			if(visitedNodes[row][col].indexOf(getIndex(xy2[0],xy2[1])) == -1)
				setIndex(getIndex(xy2[0],xy2[1]),xy1[0],xy1[1]);	
			return true;
		}
	
		// mark the current cell as 1
			var xy;
			solution[row][col] = path++;
			if(index != 0)
				xy = findXY(solution,index);
			if(xy != undefined)
				setIndex(getIndex(xy[0],xy[1]),row,col);			
		// check if cell is already used

		if (row + 1 < N && visitedNodes[row + 1][col].indexOf(getIndex(row,col)) == -1
			 && search(matrix, row + 1, col, index + 1, N) ) 
		{ 
			// go down
		}

		if (row - 1 >= 0 && visitedNodes[row - 1][col].indexOf(getIndex(row,col)) == -1 
				&& search(matrix, row - 1, col, index + 1, N)) 
		{ // go up
		}

		if (col + 1 < N && visitedNodes[row][col + 1].indexOf(getIndex(row,col)) == -1
				&& search(matrix, row, col + 1, index + 1, N)) 
		{ // go right
		}
		if (col - 1 >= 0 && visitedNodes[row][col - 1].indexOf(getIndex(row,col)) == -1
				&& search(matrix, row, col - 1, index + 1, N)) { 
			// go left
		}
		if (row - 1 >= 0 && col + 1 < N && visitedNodes[row - 1][col + 1].indexOf(getIndex(row,col)) == -1
			&& search(matrix, row - 1, col + 1, index + 1, N))
			 {
				// go diagonally up right
		}
		if (row - 1 >= 0 && col - 1 >= 0
				&& visitedNodes[row - 1][col - 1].indexOf(getIndex(row,col)) == -1
				&& search(matrix, row - 1, col - 1, index + 1, N)) {
			// go diagonally up left
		}
		if (row + 1 < N && col - 1 >= 0
				&& visitedNodes[row + 1][col-1].indexOf(getIndex(row,col)) == -1
				&& search(matrix, row + 1, col - 1, index + 1, N)) {
			// go diagonally down left
		}
		if (row + 1 < N && col + 1 < N
			&& visitedNodes[row + 1][col+1].indexOf(getIndex(row,col)) == -1
				&& search(matrix, row + 1, col + 1, index + 1, N)) {
			// go diagonally down right
		}



		// if none of the option works out, BACKTRACK and return false
		solution[row][col] = 0;
		path--;
		var index = getIndex(row,col) + ',';
		removeVisitedNode(index);
		return false;
	}

	function getWord(solution)
	{
		var count = 1;
		var formedWord = "";
		for(i=0;i<solution.length;i++)
		{
			for(j=0;j<solution.length;j++){
				if(solution[i][j] == count){
					formedWord += matrix[i][j];
					count++;
					i =0;
					j=0;
				}
				if(count == wordlength+1){
					return formedWord;
				}
			}
		}
	}
	function getIndex(x,y)
	{
		return x*g_width+y;
	}
	function setIndex(computedIndex,row,col)
	{
		visitedNodes[row][col] += computedIndex.toString()+',';
	}
	function findXY(solution,index)
	{
		var xy = [];
		for(i=0;i<solution.length;i++)
		{
			for(j=0;j<solution.length;j++){
					if(solution[i][j] == index){
						xy[0] = i;
						xy[1] = j;
						return xy;
					}
			}
		}
	}
	function removeVisitedNode(index)
	{
		for(i=0;i<visitedNodes.length;i++)
			{
				for(j=0;j<visitedNodes.length;j++)
				{
					if(visitedNodes[i][j].indexOf(index) != -1)
						visitedNodes[i][j] = "";
				}
			}
	}
	function setMatrix(arr)
	{
		debugger
		var count = 0;
		var length = +$('#matrixlength').val()+0;
		dynamicArray();
		for(i=0;i<length;i++){
			for(j=0;j<length;j++){
				matrix[i][j] = arr.eq(count++).val();
			}
		}
	} 
	function updateList()
	{
		var count = 1;
		$('#list').empty();
		for(i=0;i<list.length;i++){
			if(list[i] != undefined)
				$('#list').append('<strong>'+list[i]+'</strong><br/>')
		}
	}
	function pushWord(){
		var formedWord = getWord(solution);
		if(list.indexOf(formedWord) == -1)
			list.push(formedWord);
	}
	function dynamicArray(){
		var length = +$('#matrixlength').val()+0;
		if(length == 2){
			matrix = [[],[]];
			solution = [ [0,0] , [0,0]  ];
			visitedNodes = [ ["",""] , ["",""] ];
		}
		else if(length == 3){
			matrix = [[],[],[]];
			solution = [ [0,0,0] , [0,0,0] , [0,0,0]];
			visitedNodes = [ ["","",""] , ["","",""] , ["","",""]];
		}
		else if (length == 4){
			matrix = [[],[],[],[]];
			solution = [ [0,0,0,0] , [0,0,0,0] , [0,0,0,0], [0,0,0,0] ];
			visitedNodes = [ ["","","",""] , ["","","",""] , ["","","",""], ["","","",""] ];
		}
	}
	function generateTD(length)
	{
		var TR = $('<tr></tr>');
		for(j=0;j<length;j++){
			TR.append('<td width="10"><input type="text" class="matrix" maxlength="1"></td>');
		}
		return TR;
	}