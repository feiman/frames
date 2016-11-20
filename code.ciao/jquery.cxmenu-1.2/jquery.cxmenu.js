/*!
 * cxMenu 1.2
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxmenu
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2014-12-11
 */
(function(factory){
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    };
}(function($){
	$.cxMenu = function(obj, settings){
		if (obj.length < 1) {return};

		settings = $.extend({}, $.cxMenu.defaults, settings);

		obj.on(settings.events, 'li', function(e){
			e.stopPropagation();
			var li = $(this).closest('li');

			if (li.children('ul').length > 0) {
				var liSiblings = li.siblings();

				if (settings.only) {
					liSiblings.removeClass(settings.selectedClass);
					liSiblings.find('li').removeClass(settings.selectedClass);
					liSiblings.find('ul').slideUp(settings.speed);
				};

				if (li.hasClass(settings.selectedClass)) {
					li.removeClass(settings.selectedClass);
					li.find('ul').slideUp(settings.speed);
					li.find('li').removeClass(settings.selectedClass);
					return false;
				};

				li.toggleClass(settings.selectedClass);
				li.children('ul').slideToggle(settings.speed);
				return false;
			};
		});
	};

	// 默认值
	$.cxMenu.defaults = {
		events: 'click',			// 按钮事件
		selectedClass: 'selected',	// 展开时增加的 Class
		speed: 600,					// 切换速度
		only: true					// 同时只展开一个导航
	};

	$.fn.cxMenu = function(settings){
		if (this.length === 1) {
			$.cxMenu(this, settings);
		} else if (this.length > 1) {
			this.each(function(i){
				$.cxMenu($(this), settings);
			});
		};
		return this;
	};
}));