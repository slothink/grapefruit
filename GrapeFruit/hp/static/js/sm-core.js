/*
 * solme-common.js
 */
var LOAD_PAGE = LOAD_PAGE || undefined;
var SM = SM || {};

if(typeof console == "undefined") {
	console = {
		log:function() {
			
		}
	};
};
// implement JSON.stringify serialization
if(typeof JSON == "undefined") {
	JSON = {};
}
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

SM.ns=function(ns_string) {
	var parts = ns_string.split('.'), parent = SM, i;
	if(parts[0] === "SM") {
		parts = parts.slice(1);
	}
	for(i = 0; i < parts.length; i+=1) {
		if(typeof parent[parts[i]] == "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};
SM.ns('util.string');
SM.util.string = (function() {
	return {
		trim:function(str) {
			var s = $.trim(str);
			return s != "" ? s : null;
		}
	};
}());

SM.ns('ajax');
SM.ajax = (function() {
	return {
		call : function(url, data, cbFunc) {
			$.ajax({
	            dataType: 'json',
	            contentType: "application/json",
	            Accept: "application/json",
	            url: url,
	            type: 'POST',
	            data: data,
	            success: function(data) {
	                if(data.success) {
	                	cbFunc(data.data);
	                }else {
	                	alert(data.message);
	                }
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	            	console.log(arguments);
	                alert(jqXHR + " : " + textStatus + " : " + errorThrown);
	            }
	          });
		}
	};
}());

/**
 *  
 *  @date 2013-01-02
 *  @author slothink
 */
SM.ns('util.bootstrap');
SM.util.bootstrap = (function() {
	var dropdown = function() {
		console.log('init dropdown');
        $('.sm-dropdown').each(function(i, item) {
            var $item = $(item);
            var target_select_id = $item.data("select-id");

            var $selected = $('#'+target_select_id+" > option:selected");
            var selectedValue = $selected.val();
            if(SM.util.string.trim(selectedValue) != null) {
                $item.find("span:first-child").text($selected.text());
            }
            var $options = $('#'+target_select_id+" > option");
            var $labels = $item.find('ul');
            $options.each(function(i, option) {
                $option =  $(option);
                var o = '<li><a href="#" data-value="'+$option.val()+'" data-container="'+target_select_id+'">'+($option.text())+'</a></li>';
                $labels.append($(o));
                console.log(o);
            });
        });
		$(".sm-dropdown .dropdown-menu li a").click(function(){
            $this = $(this);
			var text = $this.text();
            var value = $this.data("value");
            var containerId = $this.data("container");
			$(this).parents(".btn-group").find("span:first-child").text(text);
            $('#'+containerId).val(value);
	   });
	};
	return {
		dropdown : dropdown
	};
}());

SM.ns('util.tree.JSTree');

SM.util.tree.JSTree = function(construct) {
	construct = construct || {};
//	this.onClickFunc = construct.onClickFunc;
//	this.onClickFunc = construct.onClickFunc;
};
SM.util.tree.JSTree.prototype._load = function(elementId, onClickFunc, opened, initTreeData, gotoItem, url) {
	console.log("tree._load called", arguments);
	var data = null;
	if(url) {
		data =  {
				"data" : initTreeData ? initTreeData : "",
				"ajax" : {
					"url" : url ? url : "",
			        "data" : function (n) {
			        	return { treeNodeId : n.attr ? n.attr("id").replace("vt-","") : ''};
			        }
			    }
		  };
	}else {
		data =  {
			"data" : initTreeData ? initTreeData : ""
		};
	}
	$('#'+elementId)
		.bind("loaded.jstree", function (event, data) {
			/* data is ---
	    	"inst" : /* the actual tree instance 
		    "args" : /* arguments passed to the function 
		    "rslt" : /* any data the function passed to the event 
		    "rlbk" : /* an optional rollback object - it is not always present
			*/ 
			$('#'+elementId).attr("initLoad", "true");
	    	})
	    .bind("select_node.jstree", function(event, data) {
	    	var nodeId = data.args[0];
	    	if(gotoItem && gotoItem.itemId) {
	 			if($('#'+elementId).attr("initLoad") == 'true') {
 					var openId = nodeId.substring(10);
 					if(openId == gotoItem.itemId) {
 						categoryTree.go(openId, gotoItem.containerId);
 						$('#'+elementId).attr("initLoad", "false");
 					}
 				}
	    	}
	    })
	    .bind("before.jstree", function (e, data) {
	        if(data.func === "open_node") {
	            //e.stopImmediatePropagation();
	            //return false;
	        }
	    })
    	.bind("click.jstree", function (event) {
    		var item = $(event.target);
			var itemId = item.attr('item-id');
			if(item && itemId) {
				var text = jQuery.trim(item.text());
				var type = item.attr("item-type");
				var ex = item.attr("item-ex");
				if(onClickFunc) {
    	    		onClickFunc({id:itemId, text:text, type:type, ex:ex});
    	    	}
    	    }
    	})
    	.jstree({
			plugins : [ "themes", "html_data", "ui", "types"],
			"ui" : {
				"select_limit" : 1,
				"select_multiple_modifier" : "alt",
				"selected_parent_close" : "select_parent",
				"initially_select" : opened ? opened[opened.length-1] : []
    			},
			core : { "initially_open"  : opened , animation : 0},
			html_data : data,
	        types : {
	        	type_attr : 'rel',
		        "types" : {
	                "FOLDER" : {
	                },
	                "DOCUMENT" : {
	                    "icon" : {
	                        //"image" : "${CONTEXT}/inc/doc.png"
	                    }
	                },
	                "default" : {
	                    "valid_children" : [ "default" ]
	                }
		        }
	        },
	        themes : {
	        	"theme" : "default",
	        	"dots" : true,
	        	"icons" : true
	        }
		});
};
SM.util.tree.JSTree.prototype.load = function(elementId, onClickFunc, opened, initTreeData, gotoItem) {
	this._load(elementId, onClickFunc, opened, initTreeData, gotoItem, null);
};
SM.util.tree.JSTree.prototype.loadWithURL = function(elementId, onClickFunc, opened, initTreeData, gotoItem, url) {
	this._load(elementId, onClickFunc, opened, initTreeData, gotoItem, url);
};
SM.util.tree.JSTree.prototype.go = function(itemId, containerId) {
	var top = $('#'+containerId).scrollTop();
	var to = $('a[item-id="'+itemId+'"]').position().top;
	var result = top + to + -300;
	$('#'+containerId).animate({scrollTop: result},'slow');
};

SM.ns('util.flash');
SM.util.flash = (function() {
	return {
		loadTo : function(containerId, swf, width, height, bgcolor, id, flashvars) {
			var text = FlashObject(swf, width, height, bgcolor, id, flashvars);
			console.log(text);
			$(text).appendTo($('#'+containerId));
		}
	};
}());


/*
IE Flash ActiveContent Activation Script
Author: Faisal Iqbal (chall3ng3r)
Blog: http://www.orison.biz/blog/chall3ng3r/
Feel free to modify or distribute.
*/
/*
Method: FlashObject
Param1: SWF path
Param2: Movie width
Param3: Movie height
Param4: BGColor
Param5: Flashvars (Optional)
*/
function FlashObject(swf, width, height, bgcolor, id, flashvars) {
	var strFlashTag = new String();
	if (navigator.appName.indexOf("Microsoft") != -1) {
		strFlashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
		strFlashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=version=8,0,0,0" ';
		strFlashTag += 'id="' + id + '" width="' + width + '" height="' + height + '">';
		strFlashTag += '<param name="movie" value="' + swf + '"/>';
		if(flashvars != null) {
			strFlashTag += '<param name="flashvars" value="' + flashvars + '"/>'
		};
		strFlashTag += '<param name="quality" value="best"/>';
		strFlashTag += '<param name="bgcolor" value="' + bgcolor + '"/>';
		strFlashTag += '<param name="menu" value="false"/>';
		strFlashTag += '<param name="salign" value="LT"/>';
		strFlashTag += '<param name="scale" value="noscale"/>';
		// strFlashTag += '<param name="wmode" value="transparent"/>';
		strFlashTag += '<param name="allowScriptAccess" value="sameDomain"/>';
		strFlashTag += '</object>';
	} else {
		strFlashTag += '<embed src="' + swf + '" ';
		strFlashTag += 'quality="best" ';
		strFlashTag += 'bgcolor="' + bgcolor + '" ';
		strFlashTag += 'width="' + width + '" ';
		strFlashTag += 'height="' + height + '" ';
		strFlashTag += 'menu="false" ';
		strFlashTag += 'scale="noscale" ';
		strFlashTag += 'id="' + id + '" ';
		strFlashTag += 'salign="LT" ';
		// strFlashTag += 'wmode="transparent" ';
		strFlashTag += 'allowScriptAccess="sameDomain" ';
		if(flashvars != null) {
			strFlashTag += 'flashvars="' + flashvars + '" '
		};
		strFlashTag += 'type="application/x-shockwave-flash" ';
		strFlashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
		strFlashTag += '</embed>';
	}
	return strFlashTag;
} 