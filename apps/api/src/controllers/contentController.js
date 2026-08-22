import { courseQuerySchema, perkQuerySchema, projectQuerySchema, } from "../middleware/validateQuery.js";
import { contentService } from "../services/contentService.js";
const sendContent = (res, data) => {
    res.json({
        data,
        meta: {
            count: Array.isArray(data) ? data.length : 1,
        },
    });
};
export const contentController = {
    async getProjects(req, res, next) {
        try {
            const query = projectQuerySchema.parse(req.query);
            const projects = await contentService.getProjects(query);
            sendContent(res, projects);
        }
        catch (error) {
            next(error);
        }
    },
    async getCourses(req, res, next) {
        try {
            const query = courseQuerySchema.parse(req.query);
            const courses = await contentService.getCourses(query);
            sendContent(res, courses);
        }
        catch (error) {
            next(error);
        }
    },
    async getPerks(req, res, next) {
        try {
            const query = perkQuerySchema.parse(req.query);
            const perks = await contentService.getPerks(query);
            sendContent(res, perks);
        }
        catch (error) {
            next(error);
        }
    },
    async getPlacement(req, res, next) {
        try {
            const placement = await contentService.getPlacement();
            sendContent(res, placement);
        }
        catch (error) {
            next(error);
        }
    },
    async getRoadmaps(req, res, next) {
        try {
            const roadmaps = await contentService.getRoadmaps();
            sendContent(res, roadmaps);
        }
        catch (error) {
            next(error);
        }
    },
};
