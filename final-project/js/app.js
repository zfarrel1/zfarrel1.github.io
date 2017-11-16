$(function(){
	$(window).scroll(function() {
		if($(window).scrollTop() >= 100) {
			$('nav').addClass('scrolled');
		}
		else {
			$('nav').removeClass('scrolled');
		}
	});
});

/*$(document).ready(function () {
	// console.logs the window.width
	$(window).resize(function () {
		console.log($(window).width())
	})
})

$('#burger').click(showMenu);

function showMenu ()
	{
		$('#mobile-nav').slideToggle(200);
}*/

