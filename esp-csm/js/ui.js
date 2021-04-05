$(function(){
	ui.init(); // init함수
});

var ui = {
	init: function(){
		this.lnb.init();                   // lnb
		this.selectBox.init();             // select box
		this.searchBox.init();             // searchBox
		this.datePickere.init();           // 달력
		this.modalpop.init();              // modalpop
	},
	lnb: {
		init: function(){
			let $el = $(".btn_lnb");
			if($el.length) this.set($el);
		},
		set: function(el){
			let $el = $(el);
			$el.click(function(){
				let check = ($(this).parents(".sub_topBar").length)?true:false;
				let $box = $(this).closest(".lnb");
				if(check){
					$(".container").prepend($box);
					$(".sub_topBar").removeClass("full");
				}else{
					$(".sub_topBar").prepend($box).addClass("full");
				}
			})
		}
	},
	selectBox: {
		init: function(){
			let $el = $(".select_box");
			if($el.length) this.set($el);
		},
		set: function(el){
			let $el = $(el);
			$el.each(function(i,n){
				$(n).click(function(){
					let baseClass = "." + $(this).attr("class").split(" ")[0];
					let multi = ($(this).find(".multi").length)?true:false;
					let revert = ($(this).hasClass("revert"))?true:false;
					$(baseClass).not($(this)).removeClass("open");
					$(this).toggleClass("open");
					if(revert){
						let $box = $(this).children().eq(1);
						$box.css("top","-" + ($box.innerHeight()+4)+"px");
					}
				});
				let multi = ($(this).find(".multi").length)?true:false;
				if(multi){
					$(n).find("input[type = 'checkbox']").each(function(ind,node){
						$(node).change(function(e){
							let all = ($(this).parent().parent().attr("class") == "all")?true:false;
							let parent = ($(this).closest(".depth1").length)?true:false;
							let ind = $(this).closest("li").index();
							let checked = $(this).prop("checked");
							if(all){
								$(this).parents(".select_box").find("input").prop("checked",checked);
								if(checked){
									$(this).parents(".select_box").find(".depth2 > ul > li").addClass("open");
								}else{
									$(this).parents(".select_box").find(".depth2 > ul > li").removeClass("open");
								}
							}else{
								$(this).parents(".select_box").find(".depth1 > ul > li input").each(function(i2,n2){
									let = $child = $(n2).parents(".select_box").find(".depth2 > ul > li:eq("+i2+")");
									let = thisChecked = $(n2).prop("checked");
									if(thisChecked){
										$child.addClass("open");
									}else{
										$child.removeClass("open").find("input").prop("checked",thisChecked);
									}
									let max = $(this).parents(".select_box").find(".depth1 input").length;
									let checkedLen = $(this).parents(".select_box").find(".depth1 input:checked").length;
									let $all = $(this).parents(".select_box").find(".all input");
									if(max == checkedLen){
										console.log("check")
										$all.prop("checked",true);
									}else{
										console.log("check /111")
										$all.prop("checked",false);
									}
								});
							}
						});
					});
					$(n).find("input[type = 'radio']").each(function(ind,node){
						$(node).change(function(){
							$(this).closest("li").addClass("active").siblings().removeClass("active");
						});
					});
					$(this).find(".multi").click(function(e){
						e.stopPropagation();
					});
				}else{
					$(n).find("li").each(function(ind,node){
						$(node).click(function(e){
							let val = $(this).text();
							$(this).closest(".select_box").find("input:not(.mul)").val(val);
						});
					});
				}
			});
		}
	},
	searchBox: {
		init: function(){
			let $el = $(".searchBox:not(.t2)");
			if($el) this.set($el)
		},
		set: function(el){
			let $el = $(el).find("input");
			$el.focus(function(){
				$(this).closest(".searchBox").addClass("focus");
			});
			$el.blur(function(){
				$(this).closest(".searchBox").removeClass("focus");
			});
		}
	},
	datePickere: {
		init: function(){
			let that = this;
			let $el = $("input.date, .range_picker input");
			$el.datepicker({
				yearSuffix: "년", //연도 뒤에 나오는 텍스트 지정
				dateFormat: 'yy-mm-dd', //날짜 표시 형식 설정
				showOtherMonths: true, //이전 달과 다음 달 날짜를 표시
				showMonthAfterYear:true,  //년도 먼저 나오고, 뒤에 월 표시
				monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNamesMin: ['SUN','MON','TUE','WED','THU','FRI','SAT'], //달력의 요일 부분 Tooltip 텍스트
				firstDay: 1
			}).focus(function(){
				console.log($(this).closest(".range_picker").length)
				if($(this).closest(".range_picker").length == 0) return;
				let $box = $(this).closest(".multi");
				let $picker = $(".ui-datepicker");
				let top = $box.offset().top + $box.innerHeight() + 4;
				let left = $box.offset().left;
				$picker.css({top:top,left:left});
			});
		}
	},
	modalpop: {
		init: function(){
			var that = this;
			$(".modal_open_bt").each(function(i,n){
				that.open($(n));
			})
			$(".modal_close_bt").each(function(i,n){
				that.close($(n));
			});
		},
		open: function(el){
			let $el = $(el);
			$el.click(function(){	
				let options = String($(this).attr("data-option"));
				let op = JSON.parse(options);
				$(op.id).addClass("open");
			})

		},
		close: function(el){
			var $el = $(el);
			$(el).click(function(){
				$(this).closest(".modalPop_wrap").removeClass("open");
			});
		}
	},
	loading: {
		open: function(){
			let source = '<!-- loding --><div class="loading_bar"><div class="inr"><img src="../img/common/loding@2x.png" alt="">로딩중</div></div><!-- // loding -->';
			$(".wrap").append(source);
		},
		close: function(){
			$(".loading_bar").remove();
		}
	}
}