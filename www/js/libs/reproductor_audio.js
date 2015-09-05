// Audio player
//
var my_media = null;
var mediaTimer = null;
var duracion_sonido = 0;
var position_sonido = 0;
var arrancar_de_nuevo = true;

// Play audio
//
function playAudio() {
	// Create Media object from src
	if(arrancar_de_nuevo == true){
		my_media = new Media(audio_src, onSuccess, onError);
		arrancar_de_nuevo = false;
	}
	$("#repro_play").hide();
	$("#repro_pause").show();
	// Play audio
	my_media.play();

	// Update my_media position every second
	if (mediaTimer == null) {
		mediaTimer = setInterval(function() {
			// get my_media position
			my_media.getCurrentPosition(
				// success callback
				function(position) {
					if (position > -1) {
						position_sonido = position;
						duracion_sonido = my_media.getDuration();
						setAudioPosition(position, my_media.getDuration());
					}
				},
				// error callback
				function(e) {
					console.log("Error getting pos=" + e);
					setAudioPosition("Error: " + e);
				}
			);
		}, 1000);
	}
}

// Pause audio
//
function pauseAudio() {
	$("#repro_play").show();
	$("#repro_pause").hide();
	if (my_media) {
		my_media.pause();
	}
}

// Stop audio
//
function stopAudio() {
	if (my_media) {
		my_media.stop();
	}
	clearInterval(mediaTimer);
	mediaTimer = null;
	arrancar_de_nuevo = true;
	$("#repro_play").show();
	$("#repro_pause").hide();
	$("#reproduccion_barra").width( "0%" );
}

// onSuccess Callback
//
function onSuccess() {
	console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position, duracion) {
	var porc = position * 100 / duracion;
  //  document.getElementById('audio_position').innerHTML = ;
	$("#reproduccion_barra").width( Math.ceil(porc) + "%" );
}

function adelantar_audio(){
	var perc = e.offsetX/ $(this).width() * 100;
	seconds = perc * duracion_sonido / 100;
	my_media.seekTo(seconds*1000);	
}
