var grid;
(function($){
	function Grid(ul,columnCount){
		var ul = ul;
		this.element = $('<div></div>').addClass('BootstrapTiles row-fluid');
		this.element.insertAfter(ul);
		ul.detach();
		this.columns = [];
		var columnClass = (function(){
			return {
				4: 'span3'	
			}[columnCount];
		})();
		for(var i=0; i<columnCount; i++){
			var columnElement = $('<div></div>').addClass(columnClass).appendTo(this.element);
			this.columns.push(new Column(columnElement,i+1));
		}
		this.placeTile = function(tile){
			var column = _.min(this.columns, function(column){
				return column.height;
			});
			column.addTile(tile);
		};
	}
	function Column(element,n){
		this.n = n;
		this.element = element;
		this.tiles = [];
		this.height = 0;
		var self = this;
		this.addTile = function(li){
			var tile = $('<div></div>').addClass('BootstrapTile').append(li.children());
			this.element.append(tile);
			this.tiles.push(tile);
			var pre_height = this.height;
			this.height += tile.height();
			var post_height = this.height;
			console.log(tile,n,pre_height,tile.height(),post_height);
		};	
	}
	$.fn.BootstrapTiles = function(){
		//the this keyword should be a collection of ul.tiles elements
		this.each(function(){
			var ul = $(this);
			grid = new Grid(ul,4);
			ul.find('.tile').each(function(){
				grid.placeTile($(this));
			});
		});
	};
})(jQuery);
