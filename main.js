// document.getElementById("answer_button").onclick = redirect_by_answer();
function redirect_by_answer(){
	var present_path = location.pathname.split('/').slice(-1)[0]

	var answer = document.getElementById('answer').value;

	var should_move = false
	if ( present_path == "nanpure.html" ){
		if (answer == "帽子屋" || answer == "ヤマネ"){
			create_popup(`「どうしたんだ？まさか解けないわけじゃないだろう？」
			<br>「解けるよ！君の世界には同じようなパズルはあったりしない？数字が分からなくても解けるはずだよ！」`)
		}else if (answer == "マーチヘア"){
			create_popup(`「解けないなら、自動解答してくれるサイトを使うのもありだよ！...なにを言っているんだろう」`)
		}
	}else if ( present_path == "minesweeper.html" ){
		if (answer == "チェシャ猫"){
			create_popup(`「お茶会で見た数字と、このパズルの数字、全部同じ数字だったか？そこが手がかりになるぜ。もっとヒントが欲しいなら、チェシャ猫さまって呼ぶんだな」`)
		}else if (answer == "チェシャ猫さま"){
			create_popup(`「このパズルにしかない数字が表している数がわかったら、今度は左上の数字が分かるはずだぜ。別の場所にある同じ数字も見て、どの数を表しているのかをしぼりこむんだ。うん？まだヒントが欲しい？チェシャ猫さまさまって呼んだらおしえてやるぜ。くつじょくか？」`)
		}else if (answer == "チェシャ猫さまさま"){
			create_popup(`「最後のほうは、候補の数字が全て盤面に出てくるってルールも大事になるぜ。もうヒントはおしまいだ。そろそろ解いてくれよ？」`)
		}
	}else if (present_path == "cross_rejected.html"){
		if (answer == "白うさぎ"){
			create_popup(`「パズル解けた？...ぼくにヒント？無理だよ。ぼくはあのねこに、きみにこれを解かせるように言われただけだもん。さあ、早く解いて！」`)
		}else if (answer == "チェシャ猫"){
			create_popup(`「なんだい、呼び出して。そのパズル作ったのはオレじゃないぞ？わかんないなら引き返しな。振り返ることもときには大切さ」`)
		}else if (answer == "くろねこ"){
			create_popup(`『ごめんごめんっ、白うさぎに送ったパズル間違えてたよ。これが本当のパズルだよ』<br>
			アリスが名前を呼ぶと、頭の中で声が聞こえました。そして、目の前に紙が落ちてきたのです。<br>
			<div class="text-center">
				<button type="button" class="btn btn-outline-info btn-submit" onclick="location.href='cross_use.html'">
					パズルを見る
				</button>
			</div>`)
		}

	}else if (present_path == "cross_use.html"){
		if (answer == "白うさぎ"){
			create_popup(`「だからぼくは知らないってば！じゃましないでよ！」`)
		}else if (answer == "くろねこ"){
			create_popup(`『まずは、数字がどの数を表しているのかを特定しないとね。小さい方から数字を並べたときに何か規則性があったりしないかな？何かが増えたり消えたりとか...ね。もっとヒントが欲しいならねこちゃんって呼んでよ』`)
		}else if (answer == "ねこちゃん"){
			create_popup(`『数字がわかったなら、鍵を全部数字に直すといいよ。それから、確実に分かるところから入れていくんだ』`)
		}
	}else if (present_path == "story_choice.html"){
		if (answer == "くろねこ"){
			location.href="story_kuroneko.html"
		}
	}
	if (answer == "ルイス・キャロル" || answer == "ルイスキャロル" || answer == "Lewis Carroll" ||
		answer == "チャールズ・ラトウィッジ・ドジソン" || answer == "チャールズラトウィッジドジソン" ||
		answer == "Charles Lutwidge Dodgson"){
		if (present_path == "story_choice.html"){
			location.href = "story_home.html"
		}else{
			create_popup(`ここにパパはいない`)
		}
	}

	console.log(present_path);

}


let masu = null;
function select_masu(e){
	if (masu != e.currentTarget){
		if (masu != null){
			masu.classList.remove("clicked");
		}
		masu = e.currentTarget;
		masu.classList.add("clicked");
	}else{
		masu.classList.remove("clicked");
		masu = null;
	}
}


function select_kouho(e){
	if (masu != null){
		//masu.textContent =  e.target.textContent;
		var child = masu.querySelector('img')
		if (child){
			masu.removeChild(child)
		}
		if (e.currentTarget.id != "clear_masu"){
			var img_tag = document.createElement("img");
			masu.appendChild(img_tag);
			var src=e.currentTarget.firstElementChild.getAttribute("src");
			img_tag.setAttribute("src", src);
			img_tag.setAttribute("width", "46px");
			img_tag.setAttribute("height", "46px");
		}
	}
}
function get_progress(){
	cookie = document.cookie
	if (cookie != ""){
		progress = Number(cookie.split('=')[1])
		return progress
	}
	return 0
}

function set_progress(n){
	cookie = `progress=${n}`
	document.cookie = cookie
}

function check_nanpure(){
	const answer = [[2, 8, 1, 7, 6, 4],
		[6, 4, 2, 9, 1, 5],
		[7, 3, 6, 2],
		[5, 4, 9],
		[3, 8, 9, 6, 5, 7, 4, 2, 1],
		[6, 2, 8],
		[6, 3, 4, 7],
		[1, 5, 7, 4, 6, 8],
		[9, 4, 7, 6, 8, 3]];
	var table = document.getElementById('nanpure');
	var result = check_answer(table, answer);
	console.log(result)
	if (result){
		// correct
		progress = get_progress()
		if (progress < 1){
			set_progress(1)
			console.log(progress)
		}
		location.href="story_tea_party_end.html"
	}else{
		// incorrect
		create_popup(`アリスは回答を帽子屋とマーチヘアに見せました。
			<br>しかし、彼らは笑いながら首を横に振るだけ。
			<br>どうやら間違いのようです。`)
	}
}

function check_mine(){
	const answer = [[2, 16],
		[16, 2, 3, 16, 16, 16],
		[1, 3, 16, 16],
		[2, 3, 3, 5, 16],
		[16, 16, 16, 16, 16, 4, 2],
		[16, 16, 16],
		[16, 16, 16, 16]]
	var table = document.getElementById('mine');
	var result = check_answer(table, answer);
	console.log(result)
	if (result){
		// correct
		progress = get_progress()
		if (progress < 2){
			set_progress(2)
		}
		location.href="story_escape_forest.html"
	}else{
		// incorrect
		create_popup(`アリスは回答をチェシャ猫に見せました。
			<br>「違うね。これじゃあ白うさぎの行った場所は教えられないよ」`)
	}
}

function check_cross_rejected(){
	create_popup(`アリスは白うさぎに回答を見せませんでした。<br>
		ぜったい間違っていると思ったからです。`)
}

function check_cross_use(){
	const answer = [[1, 12, 1, 0],
		[15, 3],
		[7, 4, 15],
		[15, 4, 7]]
	var table = document.getElementById('cross');
	var result = check_answer(table, answer);
	console.log(result)
	if (result){
		// correct
		progress = get_progress()
		if (progress < 3){
			set_progress(3)
		}
		location.href="story_choice.html"
	}else{
		// incorrect
		create_popup(`アリスは回答をチェシャ猫に見せました。
			<br>「違うね。これじゃあ白うさぎの行った場所は教えられないよ」`)
	}
}

function reset_story(){
	set_progress(0)
	location.href = "index.html"
}

function check_answer(table, answer){
	var rows = table.querySelectorAll('tr');
	for (let i = 0; i < rows.length; i++) {
		var tds = rows[i].getElementsByClassName('holder');
		for (let j = 0; j < tds.length; j++) {
			image = tds[j].querySelector('img')
			if (image){
				var input = image.getAttribute('src').substr(7, 3);
				var value = answer[i][j]
				if (!check_value(input, value)){
					console.log('icorrect input')
					return false
				}
			}else{
				console.log('lack input')
				return false
			}
		}
	}
	return true
}

function check_value(input, value){
	value_table = ['BBf', 'FTK', 'mi2', 'fdr',
		'Pau', 'dyT', 'xBu', 'kxj',
		'7tH', 'mZj', 'ZGS', 'rZE',
		'7ms', 'wuG', 'djY', '3Jt',
		'bla']
	return value_table[value] == input
}

function create_popup(body){
	var popup = document.getElementById('popup')
	var content = `<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="false">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<label>${body}</label>
						</div>
					</div>
				</div>
			</div>`
	console.log('popup')
	popup.innerHTML = content
	var modal = new bootstrap.Modal(document.getElementById('modal'))
	console.log(modal)
	modal.show()
}

$(function(){
	$("#footer").load("footer.html");
});

$(function(){
	$("#header").load("header.html");
});

function check_progress(){
	progress = get_progress()
	if (progress >= 1){
		document.getElementById('chapter1').style.display = "inline-block";
	}
	if (progress >= 2){
		document.getElementById('chapter2').style.display = "inline-block";
	}
	if (progress >= 3){
		document.getElementById('chapter3').style.display = "inline-block";
	}
}

function check_skip(n){
	progress = get_progress()
	if (progress >= n){
		document.getElementById('skip').style.display = "block";
	}
}

// can't escape
present_path = location.pathname.split('/').slice(-1)[0]
progress = get_progress()
if (progress == 4 && present_path != "story_kuroneko.html"){
	location.href = "story_kuroneko.html"
}
