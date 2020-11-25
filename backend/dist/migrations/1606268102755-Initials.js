"use strict";
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
exports.Initials1606268102755 = void 0;
class Initials1606268102755 {
    constructor() {
        this.name = 'Initials1606268102755';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "upvote" ("value" integer NOT NULL, "userId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_66c37738b8d1a0cfdef603830af" PRIMARY KEY ("userId", "projectId"))`);
            yield queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "fund_target" integer NOT NULL, "publish_date" TIMESTAMP NOT NULL, "target_date" TIMESTAMP NOT NULL, "total_donation_sum" integer NOT NULL DEFAULT '0', "view_count" integer NOT NULL DEFAULT '0', "vote_points" integer NOT NULL DEFAULT '0', "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "upvote" ADD CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "upvote" ADD CONSTRAINT "FK_1754de76e3ac4f921ba5583e256" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e89415fe16e98680d18ec760358" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e89415fe16e98680d18ec760358"`);
            yield queryRunner.query(`ALTER TABLE "upvote" DROP CONSTRAINT "FK_1754de76e3ac4f921ba5583e256"`);
            yield queryRunner.query(`ALTER TABLE "upvote" DROP CONSTRAINT "FK_3abd9f37a94f8db3c33bda4fdae"`);
            yield queryRunner.query(`DROP TABLE "project"`);
            yield queryRunner.query(`DROP TABLE "upvote"`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.Initials1606268102755 = Initials1606268102755;
//# sourceMappingURL=1606268102755-Initials.js.map