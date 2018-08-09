
window.onload = function () {
	document.querySelector('.left').addEventListener('touchmove',function(e){ 

	e.preventDefault();

});

document.querySelector('.right').addEventListener('touchmove',function(e){ 

	e.preventDefault();

});

new IScroll (document.querySelector('.left'),{
    scrollX:false,
    scrollY:true
});
}