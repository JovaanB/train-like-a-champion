import { Session } from "@/stores/useSessionStore"
import { groupByTags } from "@/utils/groupByTags"

describe("groupByTags", () => {
    it("groupe les séances par tag", () => {
        const input = [
            { id: "1", name: "A", tags: ["force"] },
            { id: "2", name: "B", tags: ["force", "cardio"] },
            { id: "3", name: "C", tags: undefined }
        ] as Session[]

        const grouped = groupByTags(input)

        expect(grouped["FORCE"].length).toBe(2)
        expect(grouped["CARDIO"].length).toBe(1)
        expect(grouped["Autres"].length).toBe(1)
    })
})