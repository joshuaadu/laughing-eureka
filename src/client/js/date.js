const dateInput = document.getElementById("date");

// Set the max, min, and value attribute of the date input element
const setDateInputAttributes = () => {
	dateInput.setAttribute("min", today());
	dateInput.setAttribute("max", "2100-01-01");
	dateInput.setAttribute("pattern", "d{4}-d{2}-d{2}");
	dateInput.value = today();
	console.log("custom date set");
};

// Use Constraint Validation API
const checkDateInput = () => {
	dateInput.addEventListener("input", () => {
		destination.setCustomValidity("");
		destination.checkValidity();
		console.log("date valid");
	});
};

// Date Countdowm
const dateCountdown = (tripDate) => {
	const dateOfTrip = new Date(tripDate).getTime();
	const todayDate = new Date(today()).getTime();
	let diff = dateOfTrip - todayDate;
	diff = (diff / (1000 * 60 * 60 * 24)).toFixed(0);
	console.log("Countdown", diff);
	if (diff >= 0) {
		switch (diff) {
			case "0":
				return "Today";
			case "1":
				return "Tomorrow";
			default:
				return `in ${diff} days`;
		}
	}
};

// Get today's full date
const today = () => {
	let date = new Date();
	const [day, month, year] = [
		String(date.getDate()).padStart(2, 0),
		String(date.getMonth() + 1).padStart(2, 0),
		date.getFullYear(),
	];
	return `${year}-${month}-${day}`;
};

export { setDateInputAttributes, checkDateInput, dateCountdown };
