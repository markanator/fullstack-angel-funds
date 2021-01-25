"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.DonationResolver = void 0;
const dotenv = __importStar(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
const type_graphql_1 = require("type-graphql");
const entity_1 = require("../entity");
const isAuthed_1 = require("../middleware/isAuthed");
const constants_1 = require("../utils/constants");
const stripe_helpers_1 = require("../utils/stripe-helpers");
dotenv.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});
let DonationResolver = class DonationResolver {
    createStripeSession(amount, projectID, projectTitle, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(amount >= constants_1.MIN_AMOUNT)) {
                throw new Error("Invalid amount.");
            }
            const session = yield stripe.checkout.sessions.create({
                success_url: `${process.env.CORS_ORIGIN}/success?id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CORS_ORIGIN}/cancel`,
                submit_type: "donate",
                payment_method_types: ["card"],
                line_items: [
                    {
                        amount: stripe_helpers_1.formatAmountForStripe(amount, "usd"),
                        name: `Donation Pledge for ${projectTitle}`,
                        currency: "USD",
                        quantity: 1,
                    },
                ],
                metadata: {
                    projectID,
                    userID: req.session.userId,
                },
            });
            return session.id;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuthed_1.isAuthed),
    __param(0, type_graphql_1.Arg("amount", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("projectID", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("projectTitle")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], DonationResolver.prototype, "createStripeSession", null);
DonationResolver = __decorate([
    type_graphql_1.Resolver(entity_1.Donation)
], DonationResolver);
exports.DonationResolver = DonationResolver;
//# sourceMappingURL=donation.js.map