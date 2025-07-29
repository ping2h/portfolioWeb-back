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

        // 查询 asset 表中最后一条记录的 cash
        const [assetRows] = await db.query(`SELECT cash FROM asset ORDER BY id DESC LIMIT 1`);
        const cash = assetRows.length > 0 ? assetRows[0].cash : 0;
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