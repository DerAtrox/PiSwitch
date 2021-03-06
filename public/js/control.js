$(document).ready(() => {	
	loadControls();	
});

async function loadControls() {
	const template = await $.get('/templates/control.html');
	
	const res = await $.getJSON('/controls.json');
	
	$.each(res.controls, (i, data) => {	
		
		
		let buttonsTmp = [];
		
		$.each(data.buttons, (i, button) => {
			button.actions = JSON.stringify(button.actions);
			buttonsTmp.push(button);
		});
	
		$('#controls').append(Mustache.render(template, data));
	});
	
	
	$('.control-button').on('click', function() {
		const actions = JSON.parse($(this).attr('actions'));
		
		$.each(actions, (i, action) => {	
			$.ajax({
				url: '/api/action', 
				type: 'POST', 
				contentType: 'application/json', 
				data: JSON.stringify({ action: action.action, data: action.data })
			});
		
			/*$.post('/api/action', , null, 'application/json').done((res) => {
				console.log(res);
			});*/
		});
		
		/*$.each(res.controls, (i, data) => {		
			$('#controls').append(Mustache.render(template, data));
		});
		

		
		$.get('/api/sendcode/' + $(this).attr('code'), (res) => {
			console.log(res);
		});*/
	});
}

	