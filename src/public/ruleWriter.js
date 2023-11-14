(function () {
	"use strict";

	// load button to load the data from a json
	const loadBtn = document.getElementById("loadBtn");

	const loadBtnOnClick = () => {
		const rulesContainer =
			document.getElementsByClassName("rules_container");

		console.log(rulesContainer);
	};

	loadBtn.addEventListener("click", loadBtnOnClick);
})();
