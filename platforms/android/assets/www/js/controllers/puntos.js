// anteponer a las funciones ac (agenda controller)

function pc_crear_tabla(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS PUNTOS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS PUNTOS (id INTEGER, layer_id INTEGER, grouplayer_id INTEGER, nombre TEXT, subtitulo TEXT, calle TEXT, altura TEXT, telefono TEXT, telefonodos TEXT, web TEXT, email TEXT, descripcion TEXT, wkt TEXT)');
	}, pc_errorCB, pc_successCB);	
}

function pc_errorCB(tx, err){
	console.log("error en trasaccion de puntos: "+err);
}

function pc_add_punto(punto){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('INSERT INTO PUNTOS(id, layer_id, grouplayer_id, nombre, subtitulo, calle, altura, telefono, telefonodos, web, email, descripcion, wkt) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		  [punto.entidad_id, punto.layer_id, punto.grouplayer_id, punto.nombre, punto.subtitulo, punto.calle, punto.altura, punto.telefono, punto.telefonodos, punto.web, punto.email, punto.descripcion, punto.wkt]);	
	}, pc_errorCB, pc_successCB);						
}

function pc_successCB(){
	//
}

function pc_get_top(func_success){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT * FROM PUNTOS WHERE 1 = ?', [1], func_success, ac_errorCB);
	}, ac_errorCB, ac_successCB);				
}

function pc_get_punto(pId, pLayer_id, pGrouplayer_id, func_success){
	//console.log("param: "+id+"-"+layer_id+"-"+grouplayer_id);
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT * FROM PUNTOS WHERE id = ? AND layer_id = ? AND grouplayer_id = ?', [pId,pLayer_id,pGrouplayer_id], func_success, ac_errorCB);
	}, pc_errorCB, pc_successCB);
}

function pc_get_puntos(pLayer_id, pGrouplayer_id, func_success){
	//console.log("param: "+id+"-"+layer_id+"-"+grouplayer_id);
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT * FROM PUNTOS WHERE layer_id = ? AND grouplayer_id = ? ORDER BY nombre ASC', [pLayer_id,pGrouplayer_id], func_success, ac_errorCB);
	}, pc_errorCB, pc_successCB);
}
