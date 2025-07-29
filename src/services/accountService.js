import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import Account from '../models/account.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = join(__dirname, '../../mock_DB/accounts.json');

class AccountService {
  constructor() {
    this.accounts = this.loadAccounts();
  }

  loadAccounts() {
    const raw = readFileSync(dataPath);
    const data = JSON.parse(raw);
    return data.map(d => new Account(d.id, d.username, d.balance));
  }

  saveAccounts() {
    const data = this.accounts.map(a => ({ id: a.id, username: a.username, balance: a.balance }));
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
  }

  findById(id) {
    return this.accounts.find(a => a.id === id);
  }

  deposit(id, amount) {
    const acc = this.findById(id);
    console.log(acc);
    if (!acc) throw new Error("Not found");
    acc.deposit(amount);
    this.saveAccounts();
    return acc;
  }

  withdraw(id, amount) {
    const acc = this.findById(id);
    if (!acc) throw new Error("Not found");
    acc.withdraw(amount);
    this.saveAccounts();
    return acc;
  }
}

export default new AccountService();
