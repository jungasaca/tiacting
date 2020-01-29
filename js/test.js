
$(function(){
    $.datepicker.regional["ko"] = {
        closeText: "",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: ["1","2","3","4","5","6", "7","8","9","10","11","12"],
        monthNamesShort: ["1월","2월","3월","4월","5월","6월", "7월","8월","9월","10월","11월","12월"],
        dayNames: ["SUN","MON","TUE","WED","THU","FRI","SAT"],
        dayNamesShort: ["SUN","MON","TUE","WED","THU","FRI","SAT"],
        dayNamesMin: ["SUN","MON","TUE","WED","THU","FRI","SAT"],
        weekHeader: "Wk",
        dateFormat: "yymmdd",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "/"
    };
	$.datepicker.setDefaults($.datepicker.regional["ko"]);
});


 

	$(function(){ // 날짜 입력
		$(".cal_input").datepicker({  dateFormat: "yy-mm-dd" }); 
 
        //선택창 나오기

 		$(".class_category2").click(function(e) {
		e.preventDefault();
 
		$(this).parent("li").find(".select_box").slideToggle(); 
		});    


 		$(".class_count").click(function(e) {
		e.preventDefault();
		if(!$("#class_category").val()) {
          alert("먼저 클래스를 선택해주세요");
		}
		$(this).parent("li").find(".select_box").slideToggle(); 
		});    

 		$(".class_time").click(function(e) {
		e.preventDefault();

		if(!$(".class_count").val()) {
          alert("먼저 교육횟수를 선택해주세요");
		}

		$(this).parent("li").find(".select_box").slideToggle(); 
		});    




		//카테고리
		//$(document).on("change", ".class_category", function() {		
		//load_category();
		//});   

 		$(".select_category").click(function(e) {
			e.preventDefault();
			var value = $(this).data("count-value");
			var category = $(this).data("category-value");
			$(this).closest("ul").parent("li").find(".class_category2").val(value); 
			$(this).closest("ul").parent("li").find(".class_category").val(category); 
	 		$(this).closest("ul").slideToggle();
			$("#class_count").val('');
			$("#class_time").val('');

			$.post(
			g5_url+"/ajax_select_count.php",
			{ class_category: category},
			function(data) {
				$("#select_count_list").empty().html(data); 
			}
			);


		});
 

        //교육횟수
 		$(".select_count").click(function(e) {
		e.preventDefault();
		var value = $(this).data("count-value");
		var category = $(this).data("category-value");

		$(this).closest("ul").parent("li").find(".class_count").val(value); 
 		$(this).closest("ul").slideToggle();
         
		//교육횟수 변경에 따른 시간대별 클래스
		var class_count = $.trim(value); 
        var class_category = $.trim(category);


        $.post(
            "./ajax_select_time.php",
            { class_category: class_category, class_count: class_count },
            function(data) {
                $("#select_time_list"+class_category).empty().html(data); 
            }
        );
		//교육횟수 변경에 따른 시간대별 클래스


		});   

        //시간대별클래스
 		$(".select_time").click(function(e) {
		e.preventDefault();
		var value = $(this).data("time-value");
		$(this).closest("ul").parent("li").find(".class_time").val(value); 
		$(this).closest("ul").slideToggle();
		});    


		$(".slide-wrap").slick({
			dots: true,
			infinite: true,
			centerMode: true,
			slidesToShow: 5,
			slidesToScroll: 3
		  });


// 팝업 
		  $(document).on('ready', function(){
			$modal = $('.modal-frame');
			$overlay = $('.modal-overlay');
		
			/* Need this to clear out the keyframe classes so they dont clash with each other between ener/leave. Cheers. */
			$modal.bind('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
			  if($modal.hasClass('state-leave')) {
				$modal.removeClass('state-leave');
			  }
			});
		
			$('.close').on('click', function(){
			  $overlay.removeClass('state-show');
			  $modal.removeClass('state-appear').addClass('state-leave');
			});
		
			$('.open').on('click', function(){
			  $overlay.addClass('state-show');
			  $modal.removeClass('state-leave').addClass('state-appear');
			});
		
		  });


	}); 

