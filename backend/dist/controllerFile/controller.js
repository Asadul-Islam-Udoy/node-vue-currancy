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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_FILE_PATH = path_1.default.join(__dirname, "data.json");
const exchangeRates = {
    USD: 1,
    EUR: 0.91,
    BDT: 109.5,
    JPY: 140,
};
class ExpenseController {
    constructor() {
        ///create item
        this.addExpenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('ami server');
                const { description, amount, currency } = req.body;
                if (!exchangeRates[currency]) {
                    res.status(400).json({ message: "Currency not supported" });
                    return;
                }
                const newData = { description, amount, currency };
                ExpenseController.addData(newData);
                res.status(200).json({ message: "Expense added successfully", newData });
            }
            catch (err) {
                res.status(400).json({ message: err });
                return;
            }
        });
        ///get all item
        this.allExpenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allExpenses = yield ExpenseController.readData();
                res.status(200)
                    .json({ message: "Expense get successfully", allExpenses });
            }
            catch (err) {
                res.status(400).json({ message: err });
                return;
            }
        });
        ///get summary item
        this.getSummaryExpenses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const baseCurrency = req.query.baseCurrency || "USD";
                if (!exchangeRates[baseCurrency]) {
                    res.status(400).json({ message: "Unsupported base currency" });
                    return;
                }
                let total = 0;
                yield ExpenseController.readData().forEach((expense) => {
                    const rate = exchangeRates[expense.currency];
                    if (rate) {
                        total += (expense.amount / rate) * exchangeRates[baseCurrency];
                    }
                });
                // Handle currency decimal precision for non-decimal currencies (e.g., JPY)
                total = Math.round(total);
                res.status(200).json({ total, baseCurrency });
            }
            catch (err) {
                res.status(400).json({ message: err });
                return;
            }
        });
    }
    //store data item
    static readData() {
        if (!fs_1.default.existsSync(DATA_FILE_PATH)) {
            return [];
        }
        const rawData = fs_1.default.readFileSync(DATA_FILE_PATH, "utf-8");
        return JSON.parse(rawData);
    }
    static writeData(data) {
        fs_1.default.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    }
    static addData(newData) {
        const currentData = ExpenseController.readData();
        currentData.push(newData);
        ExpenseController.writeData(currentData);
    }
}
exports.default = new ExpenseController();
//# sourceMappingURL=controller.js.map