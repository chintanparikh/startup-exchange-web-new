$(document).ready(function() {
	$(".hoverswitch").each(function(index, element) {
		$(element).hover(function() {
			switchTo = $(element).data('switch')
			$(element).data('switch', $(element).attr('src'));
			$(element).attr('src', switchTo);
			console.log($(element).attr('src'));
		});
	})
});