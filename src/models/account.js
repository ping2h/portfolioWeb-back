class Account {
  constructor(id, username, balance = 0) {
    this.id = id;
    this.username = username;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) throw new Error("Invalid withdraw");
    this.balance -= amount;
  }
}

export default Account;
