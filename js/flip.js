(function () {
	var $pages = $('#book section'),
		book_width = $("#book").width(),
		$book = $("#book"),
		leftPage = 1,
		rightPage = 1,
		touch = { x : 0, y : 0 },
	 	touchStartPos = { x : 0, y : 0 },
	 	touchTarget;
	for(var i = 0, len = $pages.length; i < len; i++){
		$($pages[i]).css({
			'z-index': $pages.length - i	
		});
		rightPage++;
	}
	leftPage = $pages.length;
 
function touchMoveHandler(e) {
	 touch.x = e.targetTouches[0].pageX;
	//touch.x = e.clientX;
	 touch.y = e.targetTouches[0].pageY;
	// touch.y = e.clientY;
//	if(e.targetTouches.length === 1){
		 var percentage = 1 -touch.x / book_width;
	 	 touchTarget.css({
	 	 	'-webkit-transform': 'rotateY(-' + percentage * 180 + 'deg)'
	 	 }).data('rotation', percentage * 180);
	 	// console.log(touchTarget.data('rotation') + ' rotation');
 //	}
 }
 function touchStartHandler(e){
	console.log(e.targetTouches.length + " touches");
 	if(e.targetTouches.length < 2) { 
	 touchStartPos.x = e.targetTouches[0].pageX;
	 touchStartPos.y = e.targetTouches[0].pageY;
	 touch.id = e.targetTouches[0].identifier;
	// console.log(e.targetTouches.identifier)
	 console.log(touch.id);
	 //touchStartPos.x = e.clientX;
	 //touchStartPos.x = e.clientY;
	 touchTarget = e.targetTouches[0].target;	
	 //var touchTarget = e.target;
	}
	 if(touchTarget.nodeName === 'SECTION') {
		 console.log(touchTarget.nodeName);
	 	touchTarget = $(touchTarget);
	 	console.log(touchTarget[0] + " section touchtarget");
		
	 } else {
		 touchTarget = $(touchTarget).closest('section');
		 console.log(touchTarget[0] + " closest touchTarget");
	}
	touchTarget.css({'z-index': 1000});
	console.log(touchTarget.attr('id'));
 }
 function touchEndHandler(e){
 	if((touchTarget.data('rotation') > 90 && touchStartPos.x !== touch.x) || (touchStartPos.x > touch.x && ((touchStartPos.x - touch.x) > 30) && (Math.abs(touchStartPos.y - touch.y) < 20) )) {
 		rightPage--;
 		touchTarget.css({
 			'z-index': parseInt(leftPage),
 			'-webkit-transition': '-webkit-transform 300ms',
 			'-webkit-transform': 'rotateY(-179.9deg)'
 		});
 		leftPage++;
 		console.log(touchTarget.css("z-index") + " RTL - " + leftPage + " <-leftPage rightPage -> " + rightPage);
 	} else if(touchTarget.data('rotation') < 90 && touchStartPos.x !== touch.x || (touchStartPos.x < touch.x && ((touch.x - touchStartPos.x) > 30) && (Math.abs(touchStartPos.y - touch.y) < 20) )) {
 		leftPage--;
		touchTarget.css({
			'z-index': parseInt(rightPage),
			'-webkit-transition': '-webkit-transform 300ms',
			'-webkit-transform': 'rotateY(0deg)'
		});
 		rightPage++;
 		console.log(touchTarget.css("-webkit-transform") + " LTR - " + leftPage + " <-leftPage rightPage -> " + rightPage);
	} 
 }
	    
document.addEventListener( "touchstart", touchStartHandler, false );
document.addEventListener( "touchend", touchEndHandler, false );
$book.delegate('section > div', "touchmove", function(e){
	touchMoveHandler(e.originalEvent);
});

}())