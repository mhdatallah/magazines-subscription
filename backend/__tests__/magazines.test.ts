import { createMagazine, listMagazines, getMagazineByMagazineId } from "../database/tables/magazines";

describe("Magazine Functions", () => {
  it("should create a magazine", async () => {
    const newMagazine = await createMagazine({
      title: "Test Magazine",
      description: "Test Description",
      price: 9.99,
      publicationDate: new Date(),
    });

    expect(newMagazine).toBeDefined();
  });

  it("should list magazines", async () => {
    const magazines = await listMagazines();

    expect(Array.isArray(magazines)).toBe(true);
  });

  it("should get a magazine by ID", async () => {
    const newMagazine = await createMagazine({
      title: "Test Magazine",
      description: "Test Description",
      price: 9.99,
      publicationDate: new Date(),
    });

    const magazine = await getMagazineByMagazineId(newMagazine.id);

    expect(magazine).not.toBeNull();
  });
});
