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
exports.CreateDonoInput = void 0;
const type_graphql_1 = require("type-graphql");
let CreateDonoInput = class CreateDonoInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateDonoInput.prototype, "p_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateDonoInput.prototype, "cust_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateDonoInput.prototype, "s_created", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateDonoInput.prototype, "s_receipt_url", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateDonoInput.prototype, "amount", void 0);
CreateDonoInput = __decorate([
    type_graphql_1.InputType()
], CreateDonoInput);
exports.CreateDonoInput = CreateDonoInput;
//# sourceMappingURL=CreateDonoInput.js.map