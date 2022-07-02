# global-event-handler-portal
call an element's GlobalEventHandler as a portal function.

# Install
```
npm install global-event-handler-portal
```

# Convention
```
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

```

# Usage & Api
```javascript

var global_event_handler_portal = require("global-event-handler-portal");

var el = document.getElementById('myDiv');

var myOptions = { a: 1 };

el.onclick = function (evt) {
	if (evt === "get-options") return myOptions;
}
el.onchange = function (evt) {
	if (evt === "get-options2") return myOptions;
}

//.create(handlerName)		//create tool
var onchangePortal = global_event_handler_portal.create("onchange");

done(!(
	//.portal(el, handlerName, arg1, ...)	//call an element's GlobalEventHandler as a portal function.
	global_event_handler_portal.portal(el, "onclick", "get-options") === myOptions &&

	//.onclickPortal(el, arg1, ...)		//shortcut for "onclick"
	global_event_handler_portal.onclickPortal(el, "get-options") === myOptions &&

	onchangePortal(el, "get-options2") === myOptions &&
	typeof onchangePortal(el, "get-options") === "undefined" &&

	true
));

```
