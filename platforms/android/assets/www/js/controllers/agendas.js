function ac_crear_tabla(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS AGENDA');
		tx.executeSql('CREATE TABLE IF NOT EXISTS AGENDA (id unique, titulo, categoria, lugar, horario, resumen, fecha_inicio, fecha_inicio_int INTEGER)');
	}, ac_errorCB, ac_successLimpio(succes_act));		
}

// anteponer a las funciones ac (agenda controller)
function ac_copiar_json_a_bd(succes_act){
	/*if (localStorage.getItem("act_agenda") === null) {
		ac_crear_tabla();
	}else{
		ac_successLimpio(succes_act);
	}*/
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS AGENDA');
		tx.executeSql('CREATE TABLE IF NOT EXISTS AGENDA (id unique, titulo, categoria, lugar, horario, resumen, fecha_inicio, fecha_inicio_int INTEGER)');
	}, ac_errorCB, ac_successLimpio(succes_act));	
}

function ac_errorCB(tx, err){
	console.log("error en trasaccion de agenda: "+err);
}

function ac_successLimpio(succes_act){
	console.log("okok");
	$.getJSON(urlSd + agenda_parametros.nombre_json, function( data ) {	
		if (data.length) {
			$.each( data, function( key, item ) {
				dbGuiaR.transaction(function(tx) {				
					var fecha_inicio_int = fecha_convertir_to_time(item.FInicio);	
					tx.executeSql('INSERT INTO AGENDA(id, titulo, categoria, lugar, horario, resumen, fecha_inicio, fecha_inicio_int) values (?,?,?,?,?,?,?,?)', 
					  [item.Id, item.Titulo, item.Categoria, item.Lugar, item.Horario, item.Resumen, item.FInicio, fecha_inicio_int]);	
				}, ac_errorCB, succes_act);						
			});	
		}else {
			succes_act();
		}													
	});		
}

function ac_successCB(succes_act){
	//
}

function ac_vacio(){
	//
}

function ac_get_top(func_success){
	dbGuiaR.transaction(function(tx) {
		//var fecha_from = new Date().getTime();
		var fecha_from = new Date("2015-10-02").getTime();
		tx.executeSql('SELECT * FROM AGENDA where fecha_inicio_int >= ? ORDER BY fecha_inicio ASC', [fecha_from], func_success, ac_errorCB);
	}, ac_errorCB, ac_vacio);				
}

function ac_test_bd(){
	dbGuiaR.transaction(function(tx) {
		tx.executeSql('SELECT id, titulo FROM AGENDA where 1 = ?', [1], function(tx, rs) {
			var len = rs.rows.length;
			for (var i=0; i<len; i++){
				console.log(rs.rows.item(i).id + ' ' + rs.rows.item(i).titulo);
			}
		}, ac_errorCB);
	}, ac_errorCB, ac_vacio);				
}