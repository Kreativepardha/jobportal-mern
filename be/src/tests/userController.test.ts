
import { app } from "..";
import { User } from "../models/userModel"
import request from "supertest";


jest.mock("../models/userModel")


describe("User Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register a new user successfully", async () => {
        jest.spyOn(User, "findOne").mockResolvedValue(null)
        jest.spyOn(User, "create").mockResolvedValue({
            fullname:"Test User",
            email:"test@examplw.com",
            phoneNumber: "1234567890",
            role: "student",
        })

        const response = await request(app)
        .post("/api/v1/users/register")
        .send({
            fullname:"Test User",
            email:"test@examplw.com",
            phoneNumber: "1234567890",
            role: "student",
        })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Accounted created successfully")
    })
})

