import { createUser, getUserByUsername } from "../database/tables/users";

describe("User Functions", () => {
  it("should create a user", async () => {
    const newUser = await createUser({
      username: "testuser",
      email: "test@example.com",
      passwordHash: "passwordhash",
    });

    expect(newUser).toBeDefined();
  });

  it("should get a user by username", async () => {
    const username = "testuser";

    const user = await getUserByUsername(username);

    expect(Array.isArray(user)).toBe(true);
  });
});
