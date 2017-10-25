


var total = 0;

$('#a10').click(add10);

function add10 () {
	
	total += 10;
	$('#out').html(total)

}


$('#a20').click(add20);

function add20 () {
	
	total += 20;
	$('#out').html(total)

}


$('#a30').click(add30);

function add30 () {
	
	total += 30;
	$('#out').html(total)

}

$('#n10').click(sub10);

function sub10 () {
	
	total -= 10;
	$('#out').html(total)
}

$('#n20').click(sub20);

function sub20 () {
	
	total -= 20;
	$('#out').html(total)
}

$('#n30').click(sub30);

function sub30 () {
	
	total -= 30;
	$('#out').html(total)
}

$('#red').click(colorRed);

function colorRed () {

	$('#out').css('background-color', 'red')
}


$('#blue').click(colorBlue);

function colorBlue () {

	$('#out').css('background-color', 'blue')
}


$('#out').click(reset);

function reset () {
	

$('#out').css('background-color', 'white')
$('#out').html(0)

}







