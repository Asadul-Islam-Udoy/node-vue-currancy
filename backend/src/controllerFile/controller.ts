import express, { Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from "path";
const DATA_FILE_PATH = path.join(__dirname, "data.json");
interface Expenses {
  amount: number;
  description: string;
  currency: string;
}


const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.91,
  BDT: 109.5,
  JPY: 140,
};

class ExpenseController {

  //store data item
  static readData(): Expenses[] {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }

    const rawData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(rawData) as Expenses[];
  }

  static writeData(data: Expenses[]): void {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  static addData(newData: Expenses): void {
    const currentData = ExpenseController.readData();
    currentData.push(newData);
    ExpenseController.writeData(currentData);
  }



  ///create item
  addExpenses = async (req: Request, res: Response) => {
    try {
      console.log('ami server')
      const { description, amount, currency }: Expenses = req.body;
      if (!exchangeRates[currency]) {
        res.status(400).json({ message: "Currency not supported" });
        return;
      }
      const newData: Expenses = { description, amount, currency };
      ExpenseController.addData(newData);
      res.status(200).json({ message: "Expense added successfully", newData });
    } catch (err) {
      res.status(400).json({ message: err });
      return;
    }
  };

  ///get all item
  allExpenses = async (req: Request, res: Response) => {
    try {
      const allExpenses = await ExpenseController.readData();
      res.status(200)
        .json({ message: "Expense get successfully", allExpenses });
    } catch (err) {
      res.status(400).json({ message: err });
      return;
    }
  };

  ///get summary item
  getSummaryExpenses = async (req: Request, res: Response) => {
    try {
      const baseCurrency = (req.query.baseCurrency as string) || "USD";
      if (!exchangeRates[baseCurrency]) {
        res.status(400).json({ message: "Unsupported base currency" });
        return;
      }

      let total = 0;
        await ExpenseController.readData().forEach((expense) => {
        const rate = exchangeRates[expense.currency];
        if (rate) {
          total += (expense.amount / rate) * exchangeRates[baseCurrency];
        }
      });
      // Handle currency decimal precision for non-decimal currencies (e.g., JPY)
      total = Math.round(total);

      res.status(200).json({ total, baseCurrency });
    } catch (err) {
      res.status(400).json({ message: err });
      return;
    }
  };
}

export default new ExpenseController();
