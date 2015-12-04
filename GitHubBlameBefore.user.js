// ==UserScript==
// @name           GitHub Blame Before
// @namespace      https://github.com/nvaccess/nvGrease
// @description    Enables you to drill back through the history in a GitHub blame.
// @author         James Teh <jamie@nvaccess.org>
// @copyright 2015 NV Access Limited
// @license GNU General Public License version 2.0
// @version        2015.1
// @grant GM_log
// @include https://github.com/*/*/blame/*
// ==/UserScript==

function onBeforeClick(evt) {
	var sha = evt.target.getAttribute("data-sha");
	document.location.href = document.location.href.replace(
		/^(.*github.com\/.*?\/blame\/)[^/]+(\/.*)$/,
		"$1" + sha + "%5E$2");
}

function tweak() {
	for (var blameInfo of document.querySelectorAll(".blame-commit-info")) {
		var sha = blameInfo.children[0].href;
		sha = sha.substring(sha.lastIndexOf("/") + 1);
		var before = document.createElement("a");
		before.href = "#";
		before.setAttribute("data-sha", sha);
		before.onclick = onBeforeClick;
		before.textContent = "(before)";
		blameInfo.appendChild(before);
	}
}

tweak();
