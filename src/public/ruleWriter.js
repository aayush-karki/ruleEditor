(function () {
	("use strict");

	// load the templates for rule and operator
	const rulesFormats = document.getElementById("ruleFormats");
	const ruleConditionTemplate = rulesFormats.childNodes[0];
	const ruleOperatorTemplate = rulesFormats.childNodes[1];
	const ruleConditionsUlTemplate = document.createElement("ul");
	ruleConditionsUlTemplate.className = "rule_conditions";

	function convertHTMLToJson(a_ruleConditions) {
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
			let condition = convertHTMLToJson(ruleConditionitems[i]);
			returnObj.conditions.push(condition);
		}

		return returnObj;
	}

	function convertJsonToHtml(a_ruleConditions) {
		// base case: it is a rule
		if (a_ruleConditions.hasOwnProperty("field")) {
			const rule = ruleConditionTemplate.cloneNode(true);
			const ruleChildNodes = rule.childNodes;

			// updating the the nodes value
			ruleChildNodes[0].value = a_ruleConditions.field;
			ruleChildNodes[1].value = a_ruleConditions.operator;
			ruleChildNodes[2].value = a_ruleConditions.value;

			return rule;
		}
		// chekcing for ruleConditions
		if (!a_ruleConditions.hasOwnProperty("conditions")) {
			console.debug("Error!!!!");
			return;
		}

		const rules = ruleConditionsUlTemplate.cloneNode(true);

		// the operator node that we will clone to add to the rule
		const ruleOpNode = ruleOperatorTemplate.cloneNode(true);
		ruleOpNode.value = a_ruleConditions.operator;

		const rulesConditions = a_ruleConditions.conditions;

		for (let i = 0; i < rulesConditions.length; ++i) {
			const returnVal = convertJsonToHtml(rulesConditions[i]);

			// check if the return is valid or not
			if (returnVal === undefined) {
				return;
			}
			rules.appendChild(returnVal);

			// add the rule operator if the i < length - 1
			if (i < rulesConditions.length - 1) {
				rules.appendChild(ruleOpNode.cloneNode(true));
			}
		}

		return rules;
	}

	// currently it downloads the button as a json file in the downloads folder
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
		const rulesJson = JSON.stringify(convertHTMLToJson(ruleConditions));

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

	exportBtn.addEventListener("click", exportBtnOnClick);

	const loadBtn = document.getElementById("loadBtn");

	// file input
	const loadfileInput = document.getElementById("loadfileInput");

	// load the rules
	loadfileInput.addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (!file) {
			console.debug("Error!!! Can not read file");
			return;
		}

		let reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			const returnVal = convertJsonToHtml(JSON.parse(evt.target.result));

			if (returnVal !== undefined) {
				const ruleContainer =
					document.getElementsByClassName("rules_container")[0];
				// clear all the data
				ruleContainer.innerHTML = "";
				ruleContainer.appendChild(returnVal);
			}
		};
		reader.onerror = function (evt) {
			console.debug("error reading file");
		};
	});

	// open the file browser
	loadBtn.addEventListener("click", () => {
		loadfileInput.click();
	});
})();
