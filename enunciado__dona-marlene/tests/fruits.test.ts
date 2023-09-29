import { app } from "../src/app";
import supertest from "supertest";
import httpStatus from "http-status";
import { createFruit } from "./factory/fruits.factory";
import fruits from "../src/data/fruits";
import { Fruit } from "repositories/fruits-repository";

const api = supertest(app)

beforeEach(() => { fruits.length = 0 })

describe("Fruits API POST /fruits", () => {
    it("should return 201 when inserting a fruit", async () => {
        const body = createFruit()
        const { status } = await api.post("/fruits").send(body)
        expect(status).toBe(httpStatus.CREATED)
    })

    it("should return 409 when inserting a repeated fruit", async () => {
        const fruit1 = createFruit()
        const fruit2 = createFruit(fruit1.name)
        await api.post("/fruits").send(fruit1)
        const { status } = await api.post("/fruits").send(fruit2)
        expect(status).toBe(httpStatus.CONFLICT)
    })

    it("should return 422 when inserting an invalid body", async () => {
        const { status } = await api.post("/fruits").send({})
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    })
})

describe("Fruits API GET /fruits", () => {
    it("should return 404 when inserting a valid but inexistent id", async () => {
        const { status } = await api.get("/fruits/99999999")
        expect(status).toBe(httpStatus.NOT_FOUND)
    })

    it("should return 400 when inserting an id param that is not a valid id", async () => {
        const { status } = await api.get("/fruits/batata")
        expect(status).toBe(httpStatus.BAD_REQUEST)
    })

    it("should return a fruit and status 200 when searching for an existing fruit", async () => {
        const fruit = createFruit()
        await api.post("/fruits").send(fruit)

        const response = await api.get(`/fruits/1`)
        const fruitBody = response.body as Fruit
        expect(response.status).toBe(httpStatus.OK)
        expect(fruitBody.name).toBe(fruit.name)
    })

    it("should return a array of fruits and status 200", async () => {
        await api.post("/fruits").send(createFruit())
        await api.post("/fruits").send(createFruit())

        const { status, body } = await api.get(`/fruits`)
        expect(status).toBe(httpStatus.OK)
        expect(body).toHaveLength(2)
        expect(body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            })
        ]))
    })

})