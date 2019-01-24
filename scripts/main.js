/* Code modified by Zinnia Farrell
 * The original code uses AMD and can be 
 * found here:
 * https://github.com/MathiasPaumgarten/spread
 */

var container = document.getElementById( "container" );
var tag = document.getElementById( "tag" );
//added
var img_index = 0;
//end added
var orientation = {
	TOP: 0,
	RIGHT: 1,
	BOTTOM: 2,
	LEFT: 3
}

var options = {
	tileSize: 100,
	color: "#4fb0ca",
	randomColor: true
}

var color = function() {

	var values = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
	var color = "#", i = 7;

	while ( --i ) color += values[ ~~( Math.random() * 16 ) ];

	return color;
}

var random = function( min, max ) {
	return min + Math.random() * ( max - min );
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

var Tile = function( x, y, color, onComplete ) {

	var div, inlay, cover;
	var neighbors = [];
	var isShown = false;
	
	

	function initUI() {

		div = document.createElement( "div" );
		div.className = "tile";
		div.style.width = options.tileSize + "px";
		div.style.height = options.tileSize + "px";
		div.style.top = y * options.tileSize + "px";
		div.style.left = x * options.tileSize + "px";
		div.setAttribute("id", String(x)+','+String(y));
		// div.style.opacity = 0.5;

		inlay = document.createElement( "div" );
		inlay.className = "inlay";
		inlay.style.backgroundColor = color;

		cover = document.createElement( "div" );
		cover.className = "cover";

		div.appendChild( inlay );
		inlay.appendChild( cover );


	}

	// ------
	// PUBLIC
	// ------

	this.isShown = function() {
		return isShown;
	}

	this.getElement = function() {
		return div;
	}

	this.addNeighbor = function( direction, neighbor ) {
		neighbors[ direction ] = neighbor;
	}

	this.fromTop = function() {
		div.classList.add( "from-top" );
		show();
	}

	this.fromBottom = function() {
		div.classList.add( "from-bottom" );
		show();
	}

	this.fromRight = function() {
		div.classList.add( "from-right" );
		show();
	}

	this.fromLeft = function() {
		div.classList.add( "from-left" );
		show();
	}

	function onTransitionEnd() {

		for ( var i = 0; i < neighbors.length; i++ ) {

			if ( neighbors[ i ] && ! neighbors[ i ].isShown() ) {

				neighbors[ i ][ getFunctionName( i ) ]();

				setTimeout( onTransitionEnd, random( 10, 200 ) );
				break;

			}

		}

	}

	// -------
	// PRIVATE
	// -------

	function getFunctionName( index ) {
		return [ "fromBottom", "fromLeft", "fromTop", "fromRight" ][ index ];
	}

	function show() {
		isShown = true;

		setTimeout( function() {

			inlay.classList.add( "show" );

			setTimeout( onTransitionEnd, random( 200, 300 ) );
			setTimeout( onComplete, 300 );

		}, 50 );
	}

	initUI();


}

var Controller = function( container, size, position ) {

	var width = Math.ceil( size.width / options.tileSize );
	var height = Math.ceil( size.height / options.tileSize );
	var tiles = [];
	var onComplete = null;
	var completeCount = 0;
	var tileColor = options.randomColor ? color() : options.color;

	function init() {
		
		fillScreen();
		//added
		console.log('pausing before snowball');
		var t = new Date().getTime();
		while (new Date().getTime() < t + 0);
		//end added
		snowball();
	}

	// ------
	// PUBLIC
	// ------

	this.onComplete = function( closure ) {
		onComplete = closure
	}

	this.getColor = function() {
		return tileColor;
	}

	// -------
	// PRIVATE
	// -------

	function fillScreen() {

		var tile;
		var length = width * height;
		//height, width
		console.log("width, height: "+String(width)+',',String(height))
		for ( var y = 0; y < height; y++ ) {
			for ( var x = 0; x < width; x++ ) {

				tile = new Tile( x, y, tileColor, tileComplete );

				container.appendChild( tile.getElement() );

				tiles.push( tile );

				//added
				console.log('stepping '+String(y)+','+String(x));
				var t = new Date().getTime();
				while (new Date().getTime() < t + 0);

				// var tmp_id = String(x)+','+String(y);
				// if (document.contains(document.getElementById(tmp_id))) {
		  //           document.getElementById(tmp_id).remove();
		  //       }
		  		//end added
			}
		}

		console.log("num tiles: "+tiles.length)
		for ( var i = 0; i < length; i++ ) {

			tile = tiles[ i ];
			// console.log("i:" + i)
			row = ~~( i / width );
			col = i % width;
			

			if ( col < width - 1 )
				tile.addNeighbor( orientation.RIGHT, tiles[ i + 1 ] );
			// console.log("right")
			if ( col > 0 )
				tile.addNeighbor( orientation.LEFT, tiles[ i - 1 ] );

			if ( row > 0 )
				tile.addNeighbor( orientation.TOP, tiles[ i - width ] );

			if ( row < height - 1 )
				tile.addNeighbor( orientation.BOTTOM, tiles[ i + width ] );
		}
	}

	function snowball() {
    
		var row = ~~( position.y / options.tileSize );
		var col = ~~( position.x / options.tileSize );
    	console.log(row,col)
		tiles[ col + row * width ].fromTop();
	}

	function tileComplete() {
		completeCount++;

		if ( completeCount === tiles.length && onComplete ) {
			onComplete();
		}
	}

	init();

}

function initListeners() {

	document.addEventListener( "click", onClick, false );
	document.addEventListener( "touchstart", onTouchEnd, false );

}

function onClick( event ) { 

	var div = document.createElement( "div" );
	//added
	div.setAttribute("id", "top-tiles");
	//end added
	var size = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	var position = {
		x: event.pageX,
		y: event.pageY
	}

	var controller = new Controller( div, size, position );

	controller.onComplete( function() {		
		document.body.style.backgroundColor = controller.getColor();
		//added start		
		if (document.contains(document.getElementById("bottom-tiles"))) {
            document.getElementById("bottom-tiles").remove();
        }
        div.setAttribute("id", "bottom-tiles");
        //end added
		// container.removeChild( div );

	} );

	container.appendChild( div );
	//added
	// Image changing
	var img_list = [
					'photo_1.png',
					'photo_2b.png',
					'photo_4.png',
					//'photo_4b.png',
					//'photo_5.png',
					'photo_6.png',
					//'photo_7b.png',
					'photo_7c.png',
					<iframe src="https://giphy.com/embed/xUA7bjoUNhwWVCfTR6" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/siliconvalleyhbo-hbo-tech-xUA7bjoUNhwWVCfTR6">via GIPHY</a></p>
					];
	// GLOBAL var img_index = 0; 
	var l = img_list.length;
	
	if (img_index < (l-1)) {
		img_index++
	}
	else {
		img_index = 0
	}
	document.getElementById("currentImage").src = 'images/'+img_list[img_index]
	// console.log(img_index)
	//end added


}

function onTouchEnd( event ) {

	var touch = event.touches[ 0 ];

	event.pageX = touch.pageX;
	event.pageY = touch.pageY;

	onClick( event );
}

function setTag() {
  tag.className = "before in";
  
  setTimeout( function() {
    tag.className = "";
  }, 300 );
}

function start() {
  var event = {
    pageX: window.innerWidth / 2,
    pageY: window.innerHeight / 2
  } 
  
  onClick( event );
}

initListeners();
setTag();

setTimeout( start, 1000 );


