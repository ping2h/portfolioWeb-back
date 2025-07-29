import connection from '../db/db.js';

export const getMonthlyAssets = async (months) => {
    try {
        const [rows] = await connection.query(
            `
            SELECT 
                DATE_FORMAT(a.created_at, '%Y-%m') AS month,
                a.total_asset,
                a.created_at
            FROM asset a
            JOIN (
                SELECT 
                    DATE_FORMAT(created_at, '%Y-%m') AS month,
                    MAX(created_at) AS max_created_at
                FROM asset
                WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
                GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ) b ON DATE_FORMAT(a.created_at, '%Y-%m') = b.month
               AND a.created_at = b.max_created_at
            ORDER BY a.created_at DESC
            `,
            [months]
        );
        return rows;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

export const getLatestAsset = async () => {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM asset ORDER BY id DESC LIMIT 1;'
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};
