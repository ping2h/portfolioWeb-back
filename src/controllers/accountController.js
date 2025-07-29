import accountService from '../services/accountService.js';

export function deposit(req, res) {
  try {
    const { id, amount } = req.body;
    const acc = accountService.deposit(id, amount);
    res.json(acc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export function withdraw(req, res) {
  try {
    const { id, amount } = req.body;
    const acc = accountService.withdraw(id, amount);
    res.json(acc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
