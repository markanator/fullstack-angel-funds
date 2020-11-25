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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Project_1 = require("../entity/Project");
const User_1 = require("../entity/User");
const isAuthed_1 = require("../middleware/isAuthed");
const user_1 = require("./user");
let CreateProjectInput = class CreateProjectInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateProjectInput.prototype, "fundTarget", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "publishDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "targetDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateProjectInput.prototype, "authorId", void 0);
CreateProjectInput = __decorate([
    type_graphql_1.InputType()
], CreateProjectInput);
let UpdateProjectInput = class UpdateProjectInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], UpdateProjectInput.prototype, "fundTarget", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "publishDate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "targetDate", void 0);
UpdateProjectInput = __decorate([
    type_graphql_1.InputType()
], UpdateProjectInput);
let ProjectResponse = class ProjectResponse {
};
__decorate([
    type_graphql_1.Field(() => [user_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ProjectResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Project_1.Project, { nullable: true }),
    __metadata("design:type", Project_1.Project)
], ProjectResponse.prototype, "project", void 0);
ProjectResponse = __decorate([
    type_graphql_1.ObjectType()
], ProjectResponse);
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
                .select("*")
                .from(Project_1.Project, "project")
                .getMany();
            return projects;
        });
    }
    getProjectById(id) {
        return Project_1.Project.findOne(id);
    }
    createProject(input, { req }) {
        return Project_1.Project.create(Object.assign(Object.assign({}, input), { authorId: req.session.userId })).save();
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
            try {
                yield Project_1.Project.delete({ id, authorId: req.session.userId });
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
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
    type_graphql_1.Mutation(() => Project_1.Project, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "getProjectById", null);
__decorate([
    type_graphql_1.Mutation(() => Project_1.Project),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProjectInput, Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    type_graphql_1.Mutation(() => ProjectResponse),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateProjectInput, Object]),
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