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

describe("Testing endpoints: /projects", () => {
	// fetches all
	it("GET /", async () => {
		const res = await supertest(server).get("/projects");
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body).toHaveLength(4);
	});

	// fetches user's projects
	it("GET /users/ID", async () => {
		const res = await supertest(server).get("/projects/users/2");
		//
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body).toHaveLength(2);
	});

	// fetches specific post
	it("GET /ID", async () => {
		const res = await supertest(server).get("/projects/2");

		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.id).toBe(2);
		expect(res.body.userID).toBe(1);
		expect(res.body.projectStory).toBe("This is a story 2.");
	});

	// create projects
	it("POST /", async () => {
		const login = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});

		const { token } = await login.body;

		const res = await supertest(server)
			.post("/projects")
			.send({
				projectTitle: "my first real thing",
				projectStory: "I am a tech business person...",
				goalFunding: 35000,
				currentFunding: 0,
			})
			.set("Authorization", token);
		// console.log(res.body);
		expect(res.status).toBe(201);
		expect(res.type).toBe("application/json");
		expect(res.body.id).toBe(5);
	});

	// EDIT projects
	it("PUT /ID", async () => {
		const login = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});

		const { token } = await login.body;

		const res = await supertest(server)
			.put("/projects/1")
			.send({
				projectTitle: "My first 123132 thing",
				projectStory: "I am a tech 12312 person...",
				goalFunding: 66330,
				currentFunding: 123,
			})
			.set("Authorization", token);
		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.projectTitle).toBe("My first 123132 thing");
		expect(res.body.currentFunding).toBe(123);
	});

	// DELETE projects
	it("DELETE /ID", async () => {
		const login = await supertest(server).post("/users/auth/login").send({
			email: "test1@gmail.com",
			password: "bananas12!@",
		});

		const { token } = await login.body;

		const res = await supertest(server)
			.delete("/projects/1")
			.set("Authorization", token);

		// console.log(res.body);
		expect(res.status).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("Project deleted");
	});
});
