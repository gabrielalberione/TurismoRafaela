var urlHost = 'http://200.58.108.122/gis/ws';

var recorridos_grouplayer_id = '133'; // recorridos
var urlGetGroupLayer = '/layers/listar/grouplayer:';
var jsonRecorridos = "recorridos.json";

var urlGetAgenda = '/turismo/listaragenda/fecha:';
var jsonAgenda = "agenda.json";

var urlGetLayer = '/entidades/listar/geojson/layer:';
var urlLayerIconos = 'http://200.58.108.122/gis/files/icons_layers/';

var urlCheckearActualizaciones = '/turismo/actualizaciondisponible/';

var clave_encriptacion = "93bt0QWJ";

var recorrido_parametros = {"nombre_json":"recorridos.json","grouplayer_id":"133", 
"color_cabecera_fondo":"#00a4ba", "color_cabecera_borde":"#2e8092"};

var configuracion_parametros = {"color_cabecera_fondo":"#2a2f5c", "color_cabecera_borde":"#202142"};

var qr_parametros = {"color_cabecera_fondo":"#9a0057", "color_cabecera_borde":"#6f023f"};

var agenda_parametros = {"nombre_json":"agenda.json", "url_get_agenda":"/turismo/listaragenda/fecha:", "color_cabecera_fondo":"#ffcc00", "color_cabecera_borde":"#ff9900"};

var pois_parametros = {"nombre_json":"pois.json","grouplayer_id":"132", 
"color_cabecera_fondo":"#e64e41", "color_cabecera_borde":"#a73532"};

var dbGuiaR = window.openDatabase("guiar", "1.0", "Guiar DB", 1000000);

var mapa_hacer_zoom = false;
var mapa_punto = "";
var mapa_urlSd = "";

var cabecera_actual = "";

var app = {
    // Application Constructor
    initialize: function() {
		this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('focusout', function(e) {window.scrollTo(0, 0)});
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
		
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }		
};

function get_ultima_pagina(){
	/* Buscarmos la ultima pagina visitada, sumamos uno para q no retroceda y usar la misma funcion */	
	var ultima_historia_id = window.localStorage.getItem("ultima_historia_id");
	if(ultima_historia_id > -1){
		var nuevo_id = parseInt(ultima_historia_id) + 1;
		window.localStorage.setItem("ultima_historia_id", nuevo_id);
		onBackKeyDown();						
	}else{
		cambiar_contenido("views/saludo.html", "", false, true, true, recorrido_parametros.color_cabecera_fondo, recorrido_parametros.color_cabecera_borde);	
	}
}

// Handle the back button
//
function onBackKeyDown() {
	//alert('Backbutton key pressed');
	var historial = JSON.parse(window.localStorage.getItem("historial"));
	var ultima_historia_id = window.localStorage.getItem("ultima_historia_id");	
	var nuevo_id = parseInt(ultima_historia_id) - 1;
	if(nuevo_id > -1){
		window.localStorage.setItem("punto_activo_id", historial[nuevo_id].punto_activo_id);
		cambiar_contenido(historial[nuevo_id].url, historial[nuevo_id].cabecera, historial[nuevo_id].menu, historial[nuevo_id].pie, false, historial[nuevo_id].cabecera_color_fondo,  historial[nuevo_id].cabecera_color_borde);
		window.localStorage.setItem("ultima_historia_id", nuevo_id);
	}else{
		alert("fin, desea salir?");
	}
}

function insertar_html(pUrl, div_id){
	$("#"+div_id).load(pUrl);		
}

var textCabecera;

function ir_a_entidad(recorrido_id, punto_id, group_id){
	window.localStorage.setItem("recorrido_activo_id", recorrido_id);
	window.localStorage.setItem("layer_activo_id", recorrido_id);
	window.localStorage.setItem("punto_activo_id", punto_id);
	window.localStorage.setItem("group_activo_id", group_id);
	var titulo = "";
	var color_cabecera_fondo = "";
	var color_cabecera_borde = "";
	if(group_id == recorrido_parametros.grouplayer_id){
		titulo = "Recorrido";
		color_cabecera_fondo = recorrido_parametros.color_cabecera_fondo;
		color_cabecera_borde = recorrido_parametros.color_cabecera_borde;		
	}else if(group_id == pois_parametros.grouplayer_id){
		titulo = "Punto de Interes";
		color_cabecera_fondo = pois_parametros.color_cabecera_fondo;
		color_cabecera_borde = pois_parametros.color_cabecera_borde;		
	}
	cambiar_contenido("views/punto.html", titulo, "true", "true", true, color_cabecera_fondo, color_cabecera_borde);
}


function cambiar_contenido(pUrl, pCabecera, pMenu, pPie, pGuardarHistorial, pCabeceraColorFondo, pCabeceraColorBorde){
	if(pGuardarHistorial){
		/* Guardamos en el historial */
		var historial = JSON.parse(window.localStorage.getItem("historial"));
		var ultima_historia_id = window.localStorage.getItem("ultima_historia_id");	
		if(ultima_historia_id == null){
			ultima_historia_id = -1;
		}
		
		if(historial == null){
			var historial = [];		
		}
	
		var historia = {};	
		var nuevo_id = parseInt(ultima_historia_id) + 1;
		var punto_id =  window.localStorage.getItem("punto_activo_id");
		
		historia = {"id": nuevo_id, "url":pUrl, "pie":pPie, "menu":pMenu, 
		"cabecera": pCabecera, "punto_activo_id":punto_id, "cabecera_color_fondo":pCabeceraColorFondo, "cabecera_color_borde":pCabeceraColorBorde};
		
		historial[nuevo_id] = historia;
		window.localStorage.setItem("historial", JSON.stringify(historial));
		window.localStorage.setItem("ultima_historia_id", nuevo_id);
	}
	$("#cabecera").show();
	$("#menu").show();
	$("#pie").show();
	insertar_html(pUrl, "contenido");
	$('#cabecera_top').css('background-color', pCabeceraColorFondo);
	cabecera_actual = pCabeceraColorFondo;
	$('#cabecera_top').css('border-top', '10px solid '+pCabeceraColorBorde);	
	if(pCabecera != ""){
		$("#cabecera_titulo").html(pCabecera);
		$('#contenido').css('margin-top', 50); // lugar de la cabecera
	}else{
		$("#cabecera").hide();	
		$('#contenido').css('margin-top', 0); // lugar de la cabecera	
	}
	
	if(!pMenu){
		$("#menu").hide();
	}
	
	if(!pPie){
		$("#pie").hide();
	}
}

// cuando devuelve la pos el gps
var onSuccessGPS = function(position) {    
   /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
    
    puntoGPS(position.coords.longitude, position.coords.latitude);	
};

// onError Callback receives a PositionError object
//
function onErrorGPS(error) {
   /* alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');*/
}

function onSuccess(position) {
	  // your callback here 
}

function onError(error) { 
  // your callback here
}




