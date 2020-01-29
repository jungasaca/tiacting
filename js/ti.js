$(function(){
    //family-site(드롭다운)
    $('.family-site>a').click(function (e) { 
       e.preventDefault();
       $(this).toggleClass('active');
       $(this).next().slideToggle();
    });

})



$(window).scroll(function(){
    var scrollTop=$(window).scrollTop();
    // console.log('현재스크롤 y의 위치',scrollTop);
    
    if(scrollTop > 0){//스크롤을 함
       $('body').addClass('scroll');
    }else{//가장 위쪽에 스크롤이 있는 상태
       $('body').removeClass('scroll');
    }
})