"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controllerFile/controller"));
const router = express_1.default.Router();
router.post('/expense', controller_1.default.addExpenses);
router.get('/expense', controller_1.default.allExpenses);
router.get('/summary', controller_1.default.getSummaryExpenses);
exports.default = router;
//# sourceMappingURL=routers.js.map