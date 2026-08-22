import { readFile } from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";
class JsonContentRepository {
    async readJsonFile(segments) {
        const filePath = path.resolve(env.contentDir, ...segments);
        const fileContents = await readFile(filePath, "utf8");
        return JSON.parse(fileContents);
    }
    getProjects() {
        return this.readJsonFile([
            "projects",
            "projects.json",
        ]);
    }
    getCourses() {
        return this.readJsonFile(["courses", "courses.json"]);
    }
    getPerks() {
        return this.readJsonFile(["perks", "perks.json"]);
    }
    getPlacement() {
        return this.readJsonFile(["placement", "placement.json"]);
    }
    getRoadmaps() {
        return this.readJsonFile(["roadmaps", "roadmaps.json"]);
    }
}
export const contentRepository = new JsonContentRepository();
