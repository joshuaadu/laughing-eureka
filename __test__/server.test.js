// const app = require("../src/server");
import {app} from "../src/server"

describe("Testing the server POST function", () => {
	test("Testing the app.post function", () => {
		expect(app.post).toBeDefined();
	});
});
