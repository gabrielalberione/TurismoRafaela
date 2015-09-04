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

function cambiar_contenido(pUrl, pCabecera, pMenu, pPie){
	$("#cabecera").show();
	$("#menu").show();
	$("#pie").show();
	insertar_html(pUrl, "contenido");
	if(pCabecera != ""){
		$("#cabecera_titulo").html(pCabecera);
	}else{
		$("#cabecera").hide();		
	}
	
	if(!pMenu){
		$("#menu").hide();
	}
	
	if(!pPie){
		$("#pie").hide();
	}
}

