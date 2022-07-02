
//global variable, for html page, refer tpsvr @ npm.
global_event_handler_portal = require("../global-event-handler-portal.js");

module.exports = {

	"global_event_handler_portal": function (done) {
		//if (typeof window !==/=== "undefined") throw "disable for browser/nodejs";

		document.getElementById('divResult2').innerHTML = "<div id='myDiv'>myDiv</div>";

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
	},

	"check exports": function (done) {
		for (var i in global_event_handler_portal) {
			if (typeof global_event_handler_portal[i] === "undefined") {
				done("undefined: " + i);
				return;
			}
		}
		console.log(global_event_handler_portal);
		console.log("export list: " + Object.keys(global_event_handler_portal).join(", "));
		done(false);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('global_event_handler_portal', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
