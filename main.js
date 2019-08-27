//Cargar service worker 

if('serviceWorker' in navigator){
	console.log("si funcionan los service Worker");

/*Registrar un nuevo service worker*/
navigator.serviceWorker.register('sw.js')
					   .then(res => console.log('cargado', res))
					   .catch(err => console.log('no cargado', err));
}else{
	console.log('No puedes usar los services worker en tu navegador');
}

//scroll suavizado
$(document).ready(function(){

	$("#menu a").click(function(e){
		e.preventDefault();



		$("html,body").animate({
			scrollTop: $($(this).attr('href')).offset().top /*offset().top saca la cantidad de pixeles empezando del cero*/
		});
		return false;

	});
});