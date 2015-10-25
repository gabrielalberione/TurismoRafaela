// anteponer a las funciones ac (agenda controller)

function mc_crear_tabla(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS MULTIMEDIAS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS MULTIMEDIAS (id INTEGER, entidad_id INTEGER, layer_id INTEGER, grouplayer_id INTEGER, titulo TEXT, tipo INTEGER, codigo TEXT, orden INTEGER, url_online TEXT)');
	}, mc_errorCB, mc_successCB);	
}

function mc_errorCB(tx, err){
	console.log("error en trasaccion de multimedias: "+err);
}


function mc_add_multimedia(registro){
	dbGuiaR.transaction(function(tx) {
		console.log("test multi save: "+registro.codigo);
		tx.executeSql('INSERT INTO MULTIMEDIAS(id, entidad_id, layer_id, grouplayer_id, titulo, tipo, codigo, orden, url_online) values (?,?,?,?,?,?,?,?,?)', 
		  [registro.id, registro.entidad_id, registro.layer_id, registro.grouplayer_id, registro.titulo, registro.tipo, registro.codigo, registro.orden, registro.url_online]);	
	}, mc_errorCB, mc_successCB);						
}

function mc_successCB(){
	//
}

function mc_get_multimedias(pEntidadId, pLayer_id, pGrouplayer_id, func_success){
	//console.log("param: "+id+"-"+layer_id+"-"+grouplayer_id);
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT * FROM MULTIMEDIAS WHERE entidad_id = ? AND layer_id = ? AND grouplayer_id = ?', [pEntidadId,pLayer_id,pGrouplayer_id], func_success, mc_errorCB);
	}, mc_errorCB, mc_successCB);
}