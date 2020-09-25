const supertest = require("supertest");
const server = require("../src/app");
const db = require("../database/config");

beforeEach(async () => {
	// reset the db before each test to start fresh
	await db.seed.run();
});
afterAll(async () => {
	// close databse connection after tests are completed
	await db.destroy();
});

describe("Testing enpoints: /users", () => {
	// create users
	it("POST /", async () => {
		const res = await supertest(server).post("/users").send({
			username: "markanator13",
			email: "testt@gmail.com",
			password: "potatoes!@",
			userRole: "user",
		});

		expect(res.status).toBe(201);
		expect(res.type).toBe("application/json");
		expect(res.body.user.username).toBe("markanator13");
	});
	// fetch users/ID
	it("GET /id", async () => {
		const res = await supertest(server).get("/users/1");
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.username).toBe("usertest1");
	});
	// LOGIN USER
	it("POST /auth/login", async () => {
		const res = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.token).toBeTruthy();
	});
	// EDITS USER
	it("PUT /id", async () => {
		const login = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});

		const { token } = await login.body;

		const res = await supertest(server)
			.put("/users/1")
			.send({
				username: "usertest333",
				email: "userTest333@gmail.com",
				firstName: "testFirst",
				lastName: "testLast",
			})
			.set("Authorization", token);
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.username).toBe("usertest333");
		expect(res.body.email).toBe("userTest333@gmail.com");
		expect(res.body.firstName).toBe("testFirst");
		expect(res.body.lastName).toBe("testLast");
	});
	// DELETES USER
	it("DELETE /id", async () => {
		const login = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});

		const { token } = await login.body;

		const res = await supertest(server)
			.delete("/users/1")
			.set("Authorization", token);
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("✌ Goodbye friend.");
	});
});
