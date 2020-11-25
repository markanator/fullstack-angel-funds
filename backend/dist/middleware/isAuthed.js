"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthed = void 0;
const isAuthed = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("Not Athenticated!");
    }
    return next();
};
exports.isAuthed = isAuthed;
//# sourceMappingURL=isAuthed.js.map