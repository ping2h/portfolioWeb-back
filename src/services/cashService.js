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