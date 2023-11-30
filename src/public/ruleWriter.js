(function () {
	"use strict";

	// export button to export the data from a json
	const exportBtn = document.getElementById("exportBtn");

	const exportBtnOnClick = () => {
		const ruleForm = document
			.getElementsByClassName("rules_container")
			.item(0);
		const rulesCollection = ruleForm.childNodes;
		const rulesCollection1 = ruleForm.childNodes[0];
		// console.log(ruleForm);
		console.log(rulesCollection);
		console.log("reutrnObject: ");
		// console.log(rulesCollection1);
		const returnObj = convertToJson(rulesCollection);

		console.log("reutrnObject: ", returnObj);
	};

	function convertToJson(ruleCollection, currTab = "") {
		console.log(currTab + "\t", "ruleCollection", ruleCollection);
		// base case 1: ruleCollection is empty
		if (ruleCollection.length === 0) {
			return;
		}
		const rulesConditions = ruleCollection[0];
		console.log(currTab + "\t", "rulesConditions", rulesConditions);
		const ruleConditionitems = rulesConditions.childNodes;
		// see the second element as that is the operator
		// const [firstNode, operator, ...rest] = [...ruleConditionitems];

		console.log(currTab + "\t", "ruleConditionitems", ruleConditionitems);
		// base case 2: ruleCondition has the rule
		if (
			ruleConditionitems.length === 3 &&
			ruleConditionitems[0].nodeName == "INPUT"
		) {
			console.log(currTab + "\tbase 1");
			return {
				operator: ruleConditionitems[1].value,
				field: ruleConditionitems[0].value,
				value: ruleConditionitems[2].value,
			};
		}

		// its rule conditions
		const returnObj = {
			operator: ruleConditionitems[1].value,
			conditions: [],
		};

		for (let i = 0; i < ruleConditionitems.length; i += 2) {
			let condition = convertToJson(
				[ruleConditionitems[i]],
				currTab + "\t"
			);
			returnObj.conditions.push(condition);
		}

		// console.log(firstNode.nodeName);
		// const firstNode = [ruleConditionitems[0]];
		// console.log(currTab + "\t", "firstNode", firstNode);
		// console.log(currTab + "\t", "operator", operator);
		// console.log(currTab + "\t", "rest", rest);
		// convertToJson([firstNode], currTab + "\t");
		// const op = ruleCollection.

		return returnObj;
	}

	exportBtn.addEventListener("click", exportBtnOnClick);
})();
