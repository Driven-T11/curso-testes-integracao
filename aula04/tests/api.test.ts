import supertest from "supertest";
import app from "./../src/index";

const server = supertest(app)

describe("API test", () => {
    it("should return status 200 e reponse OK! at /health", async() => {
        const response = await server.get('/health')
        expect(response.status).toBe(200)
        expect(response.text).toBe('OK!')
    })
})