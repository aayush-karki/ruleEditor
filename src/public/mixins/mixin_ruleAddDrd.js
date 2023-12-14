(function () {
	("use strict");

	// load the templates for rule and operator
	const rulesFormats = document.getElementById("ruleFormats");
	const ruleConditionTemplate = rulesFormats.childNodes[0];
	const ruleOperatorTemplate = rulesFormats.childNodes[1];
	const ruleConditionsUlTemplate = document.createElement("ul");
	ruleConditionsUlTemplate.className = "rule_conditions";

	// TODO: add the events to the ruleCOnditionsTemplate add btn

	const allNewRuleBelowBtns = document.getElementsByClassName(
		"rule_addNewRuleBelow"
	);

	const newRuleBelowOnClick = (event) => {
		const clickedEle = event.target;

		// getting li element that contains the clicked element
		const ruleConditionDiv = clickedEle.parentNode.parentNode.parentNode;

		const opCode = ruleConditionDiv.nextSibling;

		// adding a new rule
		ruleConditionDiv.parentNode.insertBefore(
			ruleConditionTemplate.cloneNode(true),
			ruleConditionDiv.nextSibling
		);

		// adding a op code
		ruleConditionDiv.parentNode.insertBefore(
			opCode.cloneNode(),
			ruleConditionDiv.nextSibling
		);
	};

	// add the on click to all the buttons
	for (let ele of allNewRuleBelowBtns) {
		console.log(ele);
		ele.addEventListener("click", (event) => newRuleBelowOnClick(event));
	}
})();
