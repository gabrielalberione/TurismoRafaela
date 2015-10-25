// anteponer a las funciones ac (agenda controller)

function lc_crear_tabla(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS LAYERS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS LAYERS (id INTEGER, grouplayer_id INTEGER, nombre TEXT, icono TEXT, descripcion TEXT, titulo TEXT, color TEXT, iconodos TEXT, iconomapa TEXT, orden INTEGER)');
	}, mc_errorCB, mc_successCB);	
}

function lc_errorCB(tx, err){
	console.log("error en trasaccion de multimedias: "+err);
}


function lc_add_layer(registro){
	dbGuiaR.transaction(function(tx) {
		console.log("test multi save: "+registro.codigo);
		tx.executeSql('INSERT INTO LAYERS(id, grouplayer_id, nombre, icono, descripcion, titulo, color, iconodos, iconomapa, orden) values (?,?,?,?,?,?,?,?,?,?)', 
		  [registro.layer_id, registro.grouplayer_id, registro.nombre, registro.icono, registro.descripcion, registro.titulo, registro.color, registro.iconodos, registro.iconomapa,registro.orden]);	
	}, mc_errorCB, mc_successCB);						
}

function lc_successCB(){
	//
}

function lc_get_layers(pGrouplayer_id, func_success){
	//console.log("param: "+id+"-"+layer_id+"-"+grouplayer_id);
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT * FROM LAYERS WHERE grouplayer_id = ?', [pGrouplayer_id], func_success, mc_errorCB);
	}, mc_errorCB, mc_successCB);
}