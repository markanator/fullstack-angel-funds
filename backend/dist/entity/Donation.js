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
exports.Donation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Donation = class Donation extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Donation.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Donation.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Donation.prototype, "s_created", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Donation.prototype, "c_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Donation.prototype, "s_receipt_url", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], Donation.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Donation.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Donation.prototype, "projectId", void 0);
__decorate([
    type_graphql_1.Field(() => _1.User),
    typeorm_1.ManyToOne(() => _1.User, (user) => user.donos),
    __metadata("design:type", _1.User)
], Donation.prototype, "donor", void 0);
__decorate([
    type_graphql_1.Field(() => _1.Project),
    typeorm_1.ManyToOne(() => _1.Project, (project) => project.donations),
    __metadata("design:type", _1.Project)
], Donation.prototype, "project", void 0);
Donation = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Donation);
exports.Donation = Donation;
//# sourceMappingURL=Donation.js.map