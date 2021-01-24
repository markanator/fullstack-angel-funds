"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const type_graphql_1 = require("type-graphql");
const slugify_1 = __importDefault(require("slugify"));
const typeorm_1 = require("typeorm");
const Project_1 = require("../entity/Project");
const User_1 = require("../entity/User");
const isAuthed_1 = require("../middleware/isAuthed");
const ProjectTypes_1 = require("../types/ProjectTypes");
let ProjectResolver = class ProjectResolver {
    author(project, { userLoader }) {
        return __awaiter(this, void 0, void 0, function* () {
            return userLoader.load(project.authorId);
        });
    }
    projects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .select("project")
                .from(Project_1.Project, "project")
                .limit(10)
                .getMany();
            return projects;
        });
    }
    getProjectsByUserID(id) {
        return Project_1.Project.find({ where: { authorId: id } });
    }
    getProjectBySlug(slug) {
        return Project_1.Project.findOne({ where: { slug } });
    }
    createProject(input, { req }) {
        const slug = slugify_1.default(input.title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
        return Project_1.Project.create(Object.assign(Object.assign({}, input), { slug, authorId: req.session.userId })).save();
    }
    updateProject(id, input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const projRes = yield Project_1.Project.findOne({ id });
            if (req.session.userId !== (projRes === null || projRes === void 0 ? void 0 : projRes.authorId)) {
                return {
                    errors: [
                        {
                            field: "Error",
                            message: "You are not authorized to update this project! 👀",
                        },
                    ],
                };
            }
            try {
                const res = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Project_1.Project)
                    .set(Object.assign(Object.assign({}, input), { updatedAt: new Date() }))
                    .where("id = :id", {
                    id,
                })
                    .returning("*")
                    .execute();
                console.log("update worked: ", res.raw);
                return { project: res.raw[0] };
            }
            catch (err) {
                console.error(err);
                return {
                    errors: [
                        {
                            field: "Error",
                            message: "Uh oh! Something went wrong! 👀",
                        },
                    ],
                };
            }
        });
    }
    deleteProject(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(Project_1.Project)
                .where("id = :id and authorId = :authorId", {
                id,
                authorId: req.session.userId,
            })
                .returning("*")
                .execute();
            if ((res === null || res === void 0 ? void 0 : res.affected) < 1 || (res === null || res === void 0 ? void 0 : res.raw.length) <= 0) {
                return false;
            }
            console.log("### PROJECT DELETED!");
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Project_1.Project, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "author", null);
__decorate([
    type_graphql_1.Query(() => [Project_1.Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    type_graphql_1.Query(() => [Project_1.Project], { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectsByUserID", null);
__decorate([
    type_graphql_1.Query(() => Project_1.Project, { nullable: true }),
    __param(0, type_graphql_1.Arg("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectBySlug", null);
__decorate([
    type_graphql_1.Mutation(() => Project_1.Project),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProjectTypes_1.CreateProjectInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectTypes_1.ProjectResponse),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ProjectTypes_1.UpdateProjectInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
ProjectResolver = __decorate([
    type_graphql_1.Resolver(Project_1.Project)
], ProjectResolver);
exports.ProjectResolver = ProjectResolver;
//# sourceMappingURL=project.js.map