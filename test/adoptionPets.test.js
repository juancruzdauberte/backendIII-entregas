import supertest from "supertest";
import { app } from "../src/config/app.js";
import { UserModel } from "../src/models/Mocking.model.js";
import { PetModel } from "../src/models/Pets.model.js";
import { expect } from "chai";

const request = supertest(app);

describe("Pruebas funcionales en /api/pets", () => {
  let petId;

  before(async () => {
    await PetModel.deleteMany({});
    const pet = await PetModel.create({
      name: "Firulais",
      race: "Perro",
      owner: null,
      isAdopted: false,
    });
    petId = pet._id.toString();
  });

  after(async () => {
    await PetModel.deleteMany({});
  });

  describe("Casos de éxito", () => {
    it("Debería obtener todas las mascotas (200)", async () => {
      const res = await request.get("/api/pets");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    it("Debería obtener una mascota (200)", async () => {
      const res = await request.get(`/api/pets/${petId}`);
      expect(res.status).to.equal(200);
      expect(res.body._id).to.equal(petId);
    });

    it("Debería insertar una mascota (201)", async () => {
      const res = await request.post("/api/pets").send({
        name: "Mishi",
        race: "Gato",
      });
      expect(res.status).to.equal(201);
      expect(res.body.pet.name).to.equal("Mishi");
      expect(res.body.pet._id).to.exist;
    });

    it("Debería adoptar una mascota (200)", async () => {
      const user = await UserModel.create({
        role: "user",
        password: "123456",
        first_name: "Juan",
        last_name: "Cruz",
        pets: [],
      });

      const res = await request.post(`/api/pets/${petId}/user/${user._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Mascota adoptada con éxito");

      const updatedPet = await PetModel.findById(petId);
      expect(updatedPet.isAdopted).to.equal(true);
      expect(updatedPet.owner.toString()).to.equal(user._id.toString());
    });

    it("Debería eliminar una mascota (200)", async () => {
      const pet = await PetModel.create({
        name: "Nano",
        race: "Perro",
        owner: null,
        isAdopted: false,
      });
      const res = await request.delete(`/api/pets/${pet._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.pet.name).to.equal("Nano");
      expect(res.body.pet._id).to.exist;
    });
  });

  describe("Casos de error", () => {
    it("No debería obtener mascotas (404)", async () => {
      await PetModel.deleteMany({});
      const res = await request.get("/api/pets");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.match(/no hay mascotas/i);
    });
    it("No debería obtener una mascota (404)", async () => {
      const res = await request.get("/api/pets/64f0c7f11111111111111111");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.match(/no encontrada/i);
    });

    it("No debería crear una mascota (400)", async () => {
      const res = await request.post("/api/pets").send({});
      expect(res.status).to.equal(400);
      expect(res.body.message).to.match(/faltan datos/i);
    });

    it("No debería adoptar una mascota ya adoptada (400)", async () => {
      const user = await UserModel.create({
        role: "user",
        password: "123456",
        first_name: "Maria",
        last_name: "Lopez",
        pets: [],
      });

      const pet = await PetModel.create({
        name: "Mishi",
        race: "Gato",
        owner: null,
        isAdopted: true,
      });

      const res = await request.post(`/api/pets/${pet._id}/user/${user._id}`);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.match(/ya fue adoptada/i);
    });

    it("No debería eliminar una mascota (404)", async () => {
      const res = await request.delete(`/api/pets/64f0c7f11111111111111111`);
      expect(res.status).to.equal(404);
      expect(res.body.message).to.match(/no encontrada/i);
    });
  });
});
