//jshint esversion:6
module.exports.date = date;

// Define y devuelve la fecha actual en un formato personalizado
function date(){
	let today = new Date();
	let options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	};
	let fullDate = today.toLocaleDateString("es-US",options);
	return fullDate;
}


