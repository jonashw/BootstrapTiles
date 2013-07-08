(function($){
	//utility classes
	function Grid(container,columnCount){
		this.element = $('<div></div>').addClass('BootstrapTiles row-fluid');
		this.element.appendTo(container);
		this.columns = [];
		var columnClass = (function(){
			return {
				 1: 'span12'	
				,2: 'span6'	
				,3: 'span4'	
				,4: 'span3'	
				,5: 'span3' //can't do any better than that
				,6: 'span2'	
			}[columnCount];
		})();
		for(var i=0; i<columnCount; i++){
			var columnElement = $('<ul></ul>').addClass(columnClass).addClass('BootstrapTiles-Column').appendTo(this.element);
			this.columns.push(new Column(columnElement,i+1));
		}
		this.placeTiles = function(tiles,sequentially){
			var sequentially = !!sequentially;
			var self = this;
			tiles.each(function(){
				self.placeTile($(this),sequentially);
			});
		};
		this.placeTile = function(tile,sequentially){
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
			var tile = li.addClass('BootstrapTile');
			this.element.append(tile);
			this.tiles.push(tile);
			this.height = this.element.height();
		};	
	}

	//this is the module that will be controlled by the plugin
	function BootstrapTiles(tiles,container){
		this.tiles = tiles;
		this.container = container;
		this.grid = null;
		this.arrange = function(columns,sequentially){
			if(!!this.grid) var old = this.grid.element.hide();
			this.grid = new Grid(this.container,columns);
			this.grid.placeTiles(this.tiles,!!sequentially);
			if(!!old) old.detach();
		};
	}

	var defaults = {columns:4,simple:false};
	//here's the actual jQuery plugin
	$.fn.BootstrapTiles = function(option,data){
		//it has two usage patterns:
		//	1. For initialization:
		//		$('.myTileClass').BootstrapTiles({columns: 3}) 				
		//	2. For re-arrangement, perhaps with a different number of columns:
		//		$('.myTileClass').BootstrapTiles('arrange',{columns: 4});
		//
		//	You can choose one of the following column counts: (1,2,3,4,6)
		var option = option || {};
		var data = data || {};
		var dataKey = 'bootstrapTiles';
		return this.each(function(){
			var ul = $(this);
			var bt = ul.data(dataKey);
			if(typeof bt == 'undefined'){
				var tiles = ul.find('.tile');
				var container = ul.parent();
				var settings = $.extend({}, defaults);
				if(typeof option == 'object') settings = _.extend(settings, option);
				var bt = new BootstrapTiles(tiles,container);
				bt.arrange(settings.columns, settings.simple);
				ul.data(dataKey,bt);
			} else if (option == "arrange"){
				var settings = $.extend({}, defaults);
				if(typeof data == 'object') settings = _.extend(settings, data);
				bt.arrange(settings.columns, settings.simple);
			}
		});
	};
})(jQuery);
