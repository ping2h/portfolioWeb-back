import connection from '../db/db.js';

export const getCashIncomeByRecentMonths = async (months) => {
    if (!months || isNaN(months) || months < 1) {
        throw new Error('Invalid months parameter');
    }
    try {
        const [rows] = await connection.query(
            `
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') AS month,
                SUM(amount) AS total_income
            FROM cash_flow
            WHERE type = 0
              AND created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month DESC;
            `,
            [months]
        );

        // 返回格式：[{ month: '2025-07', income: 10000.00 }, ...]
        return rows.map(row => ({
            month: row.month,
            income: parseFloat(row.total_income),
        }));
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

export const getCashOutcomeByRecentMonths = async (months) => {
    if (!months || isNaN(months) || months < 1) {
        throw new Error('Invalid months parameter');
    }
    try {
        const [rows] = await connection.query(
            `
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') AS month,
                SUM(amount) AS total_outcome
            FROM cash_flow
            WHERE type = 1
              AND created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month DESC;
            `,
            [months]
        );

        // 返回格式：[{ month: '2025-07', outcome: 5000.00 }, ...]
        return rows.map(row => ({
            month: row.month,
            outcome: parseFloat(row.total_outcome),
        }));
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

// 存钱
export const depositCash = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('Invalid amount');
    }
    const conn = connection;
    try {
        // 查询 asset 表最后一条记录
        const [assets] = await conn.query('SELECT id, cash FROM asset ORDER BY id DESC LIMIT 1');
        if (assets.length === 0) throw new Error('No asset record found');
        const { id, cash } = assets[0];
        const newCash = parseFloat(cash) + parseFloat(amount);

        // 更新 asset 表最后一条记录的 cash
        await conn.query('UPDATE asset SET cash = ? WHERE id = ?', [newCash, id]);

        // 插入 cash_flow 收入记录
        await conn.query(
            'INSERT INTO cash_flow (type, amount) VALUES (?, ?)',
            [0, amount]
        );

        return { id, newCash };
    } catch (error) {
        throw new Error('Deposit failed: ' + error.message);
    }
};

// 取钱
export const withdrawCash = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error('Invalid amount');
    }
    const conn = connection;
    try {
        // 查询 asset 表最后一条记录
        const [assets] = await conn.query('SELECT id, cash FROM asset ORDER BY id DESC LIMIT 1');
        if (assets.length === 0) throw new Error('No asset record found');
        const { id, cash } = assets[0];
        if (parseFloat(cash) < parseFloat(amount)) throw new Error('Insufficient cash');
        const newCash = parseFloat(cash) - parseFloat(amount);

        // 更新 asset 表最后一条记录的 cash
        await conn.query('UPDATE asset SET cash = ? WHERE id = ?', [newCash, id]);

        // 插入 cash_flow 支出记录
        await conn.query(
            'INSERT INTO cash_flow (type, amount) VALUES (?, ?)',
            [1, amount]
        );

        return { id, newCash };
    } catch (error) {
        throw new Error('Withdraw failed: ' + error.message);
    }
};