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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResponse = exports.UpdateProjectInput = exports.CreateProjectInput = void 0;
const type_graphql_1 = require("type-graphql");
const Project_1 = require("../entity/Project");
const UserTypes_1 = require("./UserTypes");
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
], CreateProjectInput.prototype, "category", void 0);
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
CreateProjectInput = __decorate([
    type_graphql_1.InputType()
], CreateProjectInput);
exports.CreateProjectInput = CreateProjectInput;
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
], UpdateProjectInput.prototype, "category", void 0);
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
exports.UpdateProjectInput = UpdateProjectInput;
let ProjectResponse = class ProjectResponse {
};
__decorate([
    type_graphql_1.Field(() => [UserTypes_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ProjectResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Project_1.Project, { nullable: true }),
    __metadata("design:type", Project_1.Project)
], ProjectResponse.prototype, "project", void 0);
ProjectResponse = __decorate([
    type_graphql_1.ObjectType()
], ProjectResponse);
exports.ProjectResponse = ProjectResponse;
//# sourceMappingURL=ProjectTypes.js.map