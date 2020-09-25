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

describe("Testing endpoints: /donations", () => {
    // fetches donations per project
    test("GET /project/id", async () => {
        const res = await supertest(server).get("/donations/projects/1");
        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toHaveLength(2);
    });

    // add donation to project
    test("POST /project/id", async () => {
        const login = await supertest(server).post("/users/auth/login").send({
            email: "test1@gmail.com",
            password: "bananas12!@",
        });

        const { token } = await login.body;

        const res = await supertest(server)
            .post("/donations/projects/1")
            .send({
                donationAmount: 456,
                projectID: 4,
                userID: 3,
            })
            .set("Authorization", token);

        // console.log(res.body);
        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body.message).toBe("Successful donation, thank you!");
    });

    // fetch specific donation
    test("GET /id", async () => {
        const login = await supertest(server).post("/users/auth/login").send({
            email: "test2@gmail.com",
            password: "bananas12!@",
        });

        const { token } = await login.body;

        const res = await supertest(server)
            .get("/donations/1")
            .set("Authorization", token);

        // console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.id).toBe(1);
        expect(res.body.donationAmount).toBe(123);
    });
});
