$('#myForm').submit(handleSubmit);

function handleSubmit (event) {
	event.preventDefault();
	var name = $('#name-input').val();

	$('#target').html(name);
}