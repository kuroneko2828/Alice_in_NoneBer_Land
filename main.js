// document.getElementById("answer_button").onclick = redirect_by_answer();
function redirect_by_answer(){
	var base_url = "http://localhost:8000/";

	var answer = document.getElementById('answer').value;
	if( answer ){
		if (answer == "start"){
			var url = base_url + "number_place.html";
		}else if (answer == "home"){
			var url = base_url + "index.html";
		}
	}

	location.href = url;
};

$(function(){
    $("#footer").load("footer.html");
});
