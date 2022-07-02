// global-event-handler-portal @ npm, call an element's GlobalEventHandler as a portal function.

/*
Convention
	User can defined a GlobalEventHandler as a portal function.
	(GlobalEventHandler: refer to https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)

	Then call it later to transfer data.

Example
	<div id='myDiv'></div>

	var el = document.getElementById('myDiv');

	//define a portal
	el.onclick = function (evt) {
		if (evt === "get-options") return options;

		... //other event process code
	}

	//call the portal
	var options = el.onclick("get-options");

	//or
	var options = portal(el, "onclick", "get-options");
	//or
	var options = onclickPortal(el, "get-options");
*/

//call an element's GlobalEventHandler as a portal function.
var globalEventHandlerPortal = function (el, handlerName, arg1) {
	var func;
	if (func = el?.[handlerName]) {
		return func.apply(el, Array.prototype.slice.call(arguments, 2));
	}
}

//create tool
var createGlobalEventHandlerPortal = function (handlerName) {
	return function (el, arg1) {
		var func;
		if (func = el?.[handlerName]) {
			return func.apply(el, Array.prototype.slice.call(arguments, 1));
		}
	}
}

//shortcut for "onclick"
var onclickPortal = createGlobalEventHandlerPortal("onclick");

//module exports

module.exports =
{
	createGlobalEventHandlerPortal,
	create: createGlobalEventHandlerPortal,

	globalEventHandlerPortal,
	portal: globalEventHandlerPortal,

	onclickPortal,
};
