import connection from '../db/db.js';

// 通过 trade_type 查询交易记录
export const getTransactionsByType = async (trade_type) => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM transaction WHERE trade_type = ? ORDER BY created_at DESC',
            [trade_type]
        );
        return rows;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};