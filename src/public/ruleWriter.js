(function () {
	("use strict");

	function convertToJson(a_ruleConditions) {
		// base case 1: a_ruleConditions is empty
		if (a_ruleConditions === undefined) {
			return undefined;
		}

		const ruleConditionitems = a_ruleConditions.childNodes;

		// base case 2: ruleCondition has the rule
		if (
			ruleConditionitems.length === 3 &&
			ruleConditionitems[0].classList.contains("field_data")
		) {
			return {
				operator: ruleConditionitems[1].value,
				field: ruleConditionitems[0].value,
				value: ruleConditionitems[2].value,
			};
		}

		const returnObj = {
			operator: ruleConditionitems[1].value,
			conditions: [],
		};

		for (let i = 0; i < ruleConditionitems.length; i += 2) {
			let condition = convertToJson(ruleConditionitems[i]);
			returnObj.conditions.push(condition);
		}

		return returnObj;
	}

	const exportBtnOnClick = () => {
		/**
		 * TODO: when export is pressed a pop up will come up
		 * 		where user can type in a file name
		 * 		and they can press download to d
		 */

		const ruleForm = document
			.getElementsByClassName("rules_container")
			.item(0);
		const ruleConditions = ruleForm.childNodes[0];
		const rulesJson = JSON.stringify(convertToJson(ruleConditions));

		// using blob to download the data as a file
		let rulesJsonToBLOB = new Blob([rulesJson], {
			type: "application/json",
		});
		const sFileName = "ruleData.txt";
		let newLink = document.createElement("a");
		newLink.download = sFileName;

		if (window.webkitURL != null) {
			newLink.href = window.webkitURL.createObjectURL(rulesJsonToBLOB);
		} else {
			newLink.href = window.URL.createObjectURL(rulesJsonToBLOB);
			newLink.style.display = "none";
			document.body.appendChild(newLink);
		}

		newLink.click();
	};

	// export button to export the data from a json
	const exportBtn = document.getElementById("exportBtn");
	const loadBtn = document.getElementById("loadBtn");

	// file input
	const loadfileInput = document.getElementById("loadfileInput");

	// load the rules
	loadfileInput.addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = function (evt) {
				console.log(JSON.parse(evt.target.result));
			};
			reader.onerror = function (evt) {
				console.log("error reading file");
			};
		}
	});

	// open the file browser
	loadBtn.addEventListener("click", () => {
		loadfileInput.click();
	});

	exportBtn.addEventListener("click", exportBtnOnClick);
})();
