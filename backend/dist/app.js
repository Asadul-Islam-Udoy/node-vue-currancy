"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers/routers"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: '.env' });
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript API!');
});
//router middleware
app.use('/api', routers_1.default);
const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map