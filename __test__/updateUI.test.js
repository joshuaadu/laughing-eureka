import { updateUI } from "../src/client/js/updateUI";
// const updateUI = require("../src/client/js/updateUI");

describe("Testing the server POST function", () => {
	test("Testing the app.post function", () => {
		expect(updateUI).toBeDefined();
	});
});
