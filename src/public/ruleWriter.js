(function () {
	"use strict";

	// export button to export the data from a json
	const exportBtn = document.getElementById("exportBtn");

	const exportBtnOnClick = () => {
		const ruleForm = document
			.getElementsByClassName("rules_container")
			.item(0);
		const ruleConditions = ruleForm.childNodes[0];
		const returnObj = convertToJson(ruleConditions);

		console.log("reutrnObject: ", JSON.stringify(returnObj));
	};

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

	exportBtn.addEventListener("click", exportBtnOnClick);
})();
