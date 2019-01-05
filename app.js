var hook = false;

jQuery(document).ready(function() {

	jQuery('#result .alert-info').hide();

	jQuery('#bContinue').on('click', function(event){
		event.preventDefault();

		if (!hook) {
			window.onbeforeunload = function() {
				return 'Are you sure you want to leave this page?';
			}

			hook = true;
		}

		var i = 0;
		var html = '';
		var payload = {};

		parse_str(jQuery('#fPayload').val(), payload);

		for (var key in payload) {
			i++;
			html += '<div class="form-group">';
			html += '<label class="col-sm-3 control-label" for="f' + i + '">' + htmlspecialchars(key) + ':</label>';
			html += '<div class="col-sm-9">';
			html += '<div class="input-group">';
			html += '<input type="text" class="form-control" id="f' + i + '" name="' + htmlspecialchars(key) + '" value="' + htmlspecialchars(payload[key]) + '" />';
			html += '<span class="input-group-btn">';
			html += '<button type="button" class="btn btn-success cbx" data-field="f' + i + '">';
			html += '<span class="glyphicon glyphicon-ok"></span>';
			html += '</button>';
			html += '</span>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
		}

		jQuery('#fields').html(html);
		jQuery('#tabs a[href="#request"]').tab('show');
	});


	jQuery('#fields').on('click', '.cbx', function(event){
		event.preventDefault();

		var btn = jQuery(this);
		var input = jQuery('#' + btn.data('field'));

		if (btn.hasClass('btn-success')) {
			btn.removeClass('btn-success').addClass('btn-danger');
			btn.find('span').removeClass('glyphicon-ok').addClass('glyphicon-remove');
			input.prop('disabled', true);
		} else {
			btn.removeClass('btn-danger').addClass('btn-success');
			btn.find('span').removeClass('glyphicon-remove').addClass('glyphicon-ok');
			input.prop('disabled', false);
		}
	});


	jQuery('#bRun').on('click', function(event){
		event.preventDefault();

		var action = jQuery('#fURL').val();
		var method = jQuery('#fMethod').val();
		var target = '';

		jQuery('#result .alert').hide();

		if (jQuery('#fTarget').val() === 'iFrame') {
			target = 'ifrm' ;
			jQuery('#result iframe').show();

		} else if (jQuery('#fTarget').val() === 'New tab/window') {
			target = '_blank' ;
			jQuery('#result iframe').hide();
			jQuery('#result .alert-info').show();
		}

		jQuery('#frm')
		.attr('action', action)
		.attr('method', method)
		.attr('target', target)
		.submit();

		jQuery('#tabs a[href="#result"]').tab('show');
	});

});
