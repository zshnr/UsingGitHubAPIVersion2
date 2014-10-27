$(document).ready(function () {

		$('#headeruser').load(function () {
			$(this).data('height', this.height);
			}).bind('mouseenter', function(e) {
			$(this).stop().animate({
				height: $(this).data('height') * (e.type === 'mouseenter' ? 1.5 :  1)
			  });
			});

		$('#getghusername').load(function () {
			$('#headeruser').data('height', this.height);
			}).bind('click', function(e) {
			$('#headeruser').stop().animate({
				height: $(this).data('height') * (e.type === 'click' ? 1 :  1)
			  });
			});

});
