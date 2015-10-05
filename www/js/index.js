var urlHost = 'http://200.58.108.122/gis/ws';

var grouplayer_id = '125';
var urlGetGroupLayer = '/layers/listar/grouplayer:';
var jsonRecorridos = "recorridos.json";

var urlGetLayer = '/entidades/listar/layer:';
var urlLayerIconos = 'http://200.58.108.122/gis/files/icons_layers/';

var urlCheckearActualizaciones = '/turismo/actualizaciondisponible/';

var clave_encriptacion = "93bt0QWJ";


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


function insertar_html(pUrl, div_id){
	$("#"+div_id).load(pUrl);		
}

var textCabecera;

function ir_a_punto(recorrido_id, punto_id){
	window.localStorage.setItem("recorrido_activo_id", recorrido_id);
	window.localStorage.setItem("punto_activo_id", punto_id);
	cambiar_contenido("views/punto.html", "Recorrido", "true", "true");
}


function cambiar_contenido(pUrl, pCabecera, pMenu, pPie){
	window.localStorage.setItem("ultima_web", pUrl);
	window.localStorage.setItem("ultima_web_menu", pPie);
	window.localStorage.setItem("ultima_web_pie", pMenu);
	window.localStorage.setItem("ultima_web_cabecera", pCabecera);	
	$("#cabecera").show();
	$("#menu").show();
	$("#pie").show();
	insertar_html(pUrl, "contenido");
	if(pCabecera != ""){
		//$("#cabecera_titulo").text("asdassd");
		textCabecera = pCabecera;
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

