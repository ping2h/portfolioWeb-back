import cron from 'node-cron';
import db from '../db/db.js';

cron.schedule('0 59 23 * * *', async () => {
    
    try {
        const [rows] = await db.query(`
      SELECT
        SUM(CASE WHEN type = 0 THEN market_value ELSE 0 END) AS stock_value,
        SUM(CASE WHEN type = 1 THEN market_value ELSE 0 END) AS bond_value,
        SUM(CASE WHEN type = 2 THEN market_value ELSE 0 END) AS crypto_value
        FROM position
    `);

        const cash = 10000; // 这里换成你真实的 cash 查询
        const { stock_value = 0, bond_value = 0, crypto_value = 0 } = rows[0] || {};

        await db.query(`
      INSERT INTO asset (cash, stock_value, bond_value, crypto_value, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `, [cash, stock_value, bond_value, crypto_value]);

        console.log("Daily asset snapshot recorded.");
    } catch (error) {
        console.error("Error running daily asset job:", error);
    }
        
});

export default cron;