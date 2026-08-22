import { contentRepository } from "../repositories/contentRepository.js";
const includesText = (value, searchTerm) => {
    if (!searchTerm) {
        return true;
    }
    return value.toLowerCase().includes(searchTerm.toLowerCase());
};
class ContentService {
    async getProjects(query = {}) {
        const catalog = await contentRepository.getProjects();
        const projects = catalog.projects.filter((project) => {
            if (query.category && project.category !== query.category)
                return false;
            if (typeof query.featured === "boolean" &&
                project.featured !== query.featured)
                return false;
            if (typeof query.openSource === "boolean" &&
                project.openSource !== query.openSource)
                return false;
            if (!includesText(project.title, query.search) &&
                !includesText(project.description, query.search))
                return false;
            return true;
        });
        return {
            ...catalog,
            projects,
        };
    }
    async getCourses(query = {}) {
        const courses = await contentRepository.getCourses();
        return courses.filter((course) => {
            if (query.category && course.category !== query.category)
                return false;
            if (query.level && course.level !== query.level)
                return false;
            if (typeof query.featured === "boolean" &&
                course.featured !== query.featured)
                return false;
            if (!includesText(course.title, query.search) &&
                !includesText(course.description, query.search) &&
                !includesText(course.provider, query.search))
                return false;
            return true;
        });
    }
    async getPerks(query = {}) {
        const perks = await contentRepository.getPerks();
        return perks.filter((perk) => {
            if (query.category && perk.category !== query.category)
                return false;
            if (typeof query.verified === "boolean" &&
                perk.verified !== query.verified)
                return false;
            if (!includesText(perk.title, query.search) &&
                !includesText(perk.company, query.search) &&
                !includesText(perk.description, query.search))
                return false;
            return true;
        });
    }
    getPlacement() {
        return contentRepository.getPlacement();
    }
    getRoadmaps() {
        return contentRepository.getRoadmaps();
    }
}
export const contentService = new ContentService();
