import { useUserStore } from "../../stores/useUserStore";

describe("userUserStore", () => {
  it("should set user role", () => {
    useUserStore.getState().setRole("coach");
    expect(useUserStore.getState().role).toBe("coach");
  });
});
