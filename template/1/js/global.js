//瀵艰埅涓嬫媺
$(function() {
	$('.win-homepage').click(function() {
		if (document.all) {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(document.URL);
		} else {
			alert("璁剧疆棣栭〉澶辫触锛岃鎵嬪姩璁剧疆锛�");
		}
	});
	$('.win-favorite').click(function() {
		var sURL = document.URL;
		var sTitle = document.title;
		try {
			window.external.addFavorite(sURL, sTitle);
		} catch (e) {
			try {
				window.sidebar.addPanel(sTitle, sURL, "");
			} catch (e) {
				alert("鍔犲叆鏀惰棌澶辫触锛岃浣跨敤Ctrl+D杩涜娣诲姞");
			}
		}
	});	

	$('#slideshow').slide({
		titCell: ".hd ul",
		mainCell: ".bd",
		effect: "fade",
		delayTime:1500,
		interTime: 5000,
		autoPlay: true,
		autoPage: true,
		trigger: "click"
	});
	$('#slideshow').mouseover(function(){
		$(this).find('.next').show();
		$(this).find('.prev').show();
	}).mouseleave(function(){
		$(this).find('.next').hide();
		$(this).find('.prev').hide();
	})
	//鎼滅储楠岃瘉
	$('#search_submit').click(function(){
		if ($('#search_text').val() == '') {
			alert('璇峰～鍐欒鎼滅储鐨勫唴瀹�');
			$('#search_text').focus();
			return false;
		};
	});


	//鍦ㄧ嚎瀹㈡湇
	var offsettop = $('#float').offset().top;
	$(window).scroll(function() {
		$('#float').animate({
			top: offsettop + $(window).scrollTop() + "px"
		}, {
			duration: 600,
			queue: false
		});
	});
	$('#float').slide({
		type: "menu",
		titCell: '.wrap',
		targetCell: '.content',
		effect: 'fade',
		delayTime: 300,
		triggerTime: 100
	});

	$('.gotop').click(function() {
		$('html,body').animate({
			scrollTop: '0px'
		}, 100);
	});		
});