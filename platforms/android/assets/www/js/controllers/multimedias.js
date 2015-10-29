// anteponer a las funciones ac (agenda controller)

function mc_crear_tabla(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS MULTIMEDIAS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS MULTIMEDIAS (id INTEGER, entidad_id INTEGER, layer_id INTEGER, grouplayer_id INTEGER, titulo TEXT, tipo INTEGER, codigo TEXT, orden INTEGER, url_online TEXT)');
	}, mc_errorCB, mc_successCB);	
}

function mc_errorCB(err){
	console.log("error en trasaccion de multimedias: "+err);
}


function mc_add_multimedia(registro){
	dbGuiaR.transaction(function(tx) {
		console.log("test multi save: "+registro.codigo);
		tx.executeSql('INSERT INTO MULTIMEDIAS(id, entidad_id, layer_id, grouplayer_id, titulo, tipo, codigo, orden, url_online) values (?,?,?,?,?,?,?,?,?)', 
		  [registro.id, registro.entidad_id, registro.layer_id, registro.grouplayer_id, registro.titulo, registro.tipo, registro.codigo, registro.orden, registro.url_online]);	
	}, mc_errorCB, mc_successCB);						
}

function mc_grabar_multimedias(urlJson){
	$.getJSON(urlJson, function( data ) {			
		$.each( data, function( key, itemaux ) {	
			if(key == "features"){
				$.each( itemaux, function( subkey, subitem ) {
					$.each( subitem.properties.multimedias, function( subkey, multitem ) {						
						console.log("hola hdp!: "+multitem.codigo);
						var regMulti = [];								
						var punto_id = multitem.entidad_id; 
						var recorrido_id = multitem.layer_id; 	
						var nombre_multimedia = multitem.codigo; 
						regMulti['id'] = multitem.id;
						regMulti['entidad_id'] = punto_id;
						regMulti['layer_id'] = recorrido_id;
						regMulti['grouplayer_id'] = list_descargas[posicion][6];																												
						regMulti['codigo'] = nombre_multimedia;
						regMulti['titulo'] = multitem.titulo;
						regMulti['orden'] = multitem.orden;	
						regMulti['tipo'] = multitem.tipo;
						regMulti['url_online'] = multitem.url;
						dbGuiaR.transaction(function(tx) {
							console.log("test multi save: "+registro.codigo);
							tx.executeSql('INSERT INTO MULTIMEDIAS(id, entidad_id, layer_id, grouplayer_id, titulo, tipo, codigo, orden, url_online) values (?,?,?,?,?,?,?,?,?)', 
							  [regMulti.id, regMulti.entidad_id, regMulti.layer_id, regMulti.grouplayer_id, regMulti.titulo, regMulti.tipo, regMulti.codigo, regMulti.orden, regMulti.url_online]);	
						}, mc_errorCB, mc_successCB);	
					});
				});
			}
		});
	});
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