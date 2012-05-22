/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/
//OS elements
var main = $("#main");
var taskbar = $("#taskbar");
var clock = $("#clock");
var trash = $("#trash");
var icons = $(".icon");
//Mouse status
var mouseDiffY = 0;
var mouseDiffX = 0;
var mouseActiveIcon = 0;
var mouseActiveCloneIcon = 0;
//update clock function
function updateClock(){
	var now = new Date();
	var hour = now.getHours();
	if(hour < 10) hour = "0" + hour;
    var mins = now.getMinutes();
	if(mins < 10) mins = "0" + mins;
    var secs = now.getSeconds();
	if(secs < 10) secs = "0" + secs;
	//print the current time in the clock division
	clock.html(hour + " : " + mins + " : " + secs);
	//recursive call
    setTimeout("updateClock()", 1000);
}

$(document).ready(function(){
	//cancel context menu
	$(document).bind("contextmenu",function(e){
		return false;
	});
	
	//show icons
	trash.css({'top':(main.height()) - (128 + taskbar.height()), 'left':main.width() - 128});
	icons.fadeIn(1500);
	taskbar.slideDown();
	//show current time
	updateClock();
	//mouse click
	icons.mousedown(function(e){
		//only accepts left click; all navs uses 0 but IE uses 1 lol...
		if(e.button <= 1){
			//calculate differences when user clicks the icon
			mouseDiffY = e.pageY - this.offsetTop;
			mouseDiffX = e.pageX - this.offsetLeft;
			if(mouseActiveIcon !=0){
				mouseActiveIcon.removeClass("active");
			}
			mouseActiveIcon = $(this);
			mouseActiveCloneIcon = mouseActiveIcon.clone(false).insertBefore(mouseActiveIcon);
		}
	});
	//moving mouse
	$(document).mousemove(function(e){
		if(mouseActiveIcon){
			//update position
			mouseActiveIcon.css({"top":e.pageY - mouseDiffY, "left":e.pageX - mouseDiffX, "opacity":0.35});
			var restaY = e.pageY - $(this).css("top");
			var restaX = e.pageX - $(this).css("left");
		}
	});
	//release mouse click
	$(document).mouseup(function(){
		if(mouseActiveIcon != 0){
			mouseActiveIcon.css({"opacity":1.0});
			mouseActiveIcon = 0;
			mouseActiveCloneIcon.remove();
			mouseActiveCloneIcon = 0;
		}
	});
	//mouse double click
	icons.dblclick(function(){
		alert(this.id);
	});
	//custom context menu on right click
	main.mousedown(function(e){
		if(e.button == 2){
			alert("context menu");
		}
	});

});