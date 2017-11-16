$(document).ready(function () {
	// console.logs the window.width
	$(window).resize(function () {
		console.log($(window).width())
	})
})

$('#burger').click(showMenu);

function showMenu ()
	{
		$('#mobile-nav').slideToggle(200);
}
