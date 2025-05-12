import { Session } from "@/stores/useSessionStore"

export const groupByTags = (sessions: Session[]) => {
    const groups: { [tag: string]: Session[] } = {}

    sessions.forEach((s) => {

        if (s.tags && s.tags.length > 0) {
            s.tags.forEach((tag) => {
                const effectiveTag = tag.toUpperCase();
                if (!groups[effectiveTag]) groups[effectiveTag] = []
                groups[effectiveTag].push(s)
            })
        } else {
            if (!groups["Autres"]) groups["Autres"] = []
            groups["Autres"].push(s)
        }
    })

    return groups
}
