jQuery(document).ready(function() {

	jQuery('#bContinue').on('click', function(event){
		event.preventDefault();

		var i = 0;
		var html = '';
		var payload = {};

		parse_str(jQuery('#fPayload').val(), payload);

		for (var key in payload) {
			i++;
			html += '<div class="form-group">';
			html += '<label class="col-sm-3 control-label" for="f' + i + '">' + htmlspecialchars(key) + ':</label>';
			html += '<div class="col-sm-9">';
			html += '<input type="text" class="form-control" id="f' + i + '" name="' + htmlspecialchars(key) + '" value="' + htmlspecialchars(payload[key]) + '" />';
			html += '</div>';
			html += '</div>';
		}

		jQuery('#fields').html(html);
		jQuery('#tabs a[href="#request"]').tab('show');
	});


	jQuery('#bRun').on('click', function(event){
		event.preventDefault();

		var action = jQuery('#fURL').val();
		var method = jQuery('#fMethod').val();

		jQuery('#frm')
		.attr('action', action)
		.attr('method', method)
		.submit();

		jQuery('#tabs a[href="#result"]').tab('show');
	});

});
