// 1. Create .click() handlers for each of the thumbnails: #first, #second, #third, #fourth
// 2. Use .attr() to change the `src` attribute of #bigimage to correspond to image that was clicked
//$('#first').click(switchImage1);
// $('#second').click(switchImage2);
// $('#third').click(switchImage3);
// $('#fourth').click(switchImage4);

////function switchImage1 () {
////$('#bigimage').attr('src', 'img/1.jpg')
////}

// function switchImage2 () {
// $('#bigimage').attr('src', 'img/2.jpg')
// }

// function switchImage3 () {
// $('#bigimage').attr('src', 'img/3.jpg')
// }

// function switchImage4 () {
// $('#bigimage').attr('src', 'img/4.jpg')
// }

// $('#first').click(function () {
// $('#bigimage').attr('src', 'img/1.jpg');
// })

$('.thumb').click(changeImage);

function changeImage() {
	var newImage = $(this).attr('src');

	$('#bigimage').attr('src', newImage)
}

