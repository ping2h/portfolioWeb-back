import connection from '../db/db.js';
import axios from 'axios';

const getAll = async () => {
    try {
        const [data] = await connection.query('SELECT * FROM position');
        return data;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

const getStock = async () => {
    try {
        const [stock] = await connection.query('SELECT * FROM position WHERE type = 0;');
        return stock;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

const getBond = async () => {
    try {
        const [bond] = await connection.query('SELECT * FROM position WHERE type = 1;');
        return bond;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

const getCrypto = async () => {
    try {
        const [crypto] = await connection.query('SELECT * FROM position WHERE type = 2;');
        return crypto;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};

const buyPosition = async (type, symbol, shares) => {
    const conn = connection;
    try {
        // 查询当前资产信息
        const [positions] = await conn.query('SELECT * FROM position WHERE type = ? AND symbol = ?', [type, symbol]);
        if (positions.length === 0) throw new Error('Asset not found');
        const position = positions[0];

        // 查询当前现金
        const [assets] = await conn.query('SELECT cash FROM asset ORDER BY id DESC LIMIT 1');
        const cash = assets.length > 0 ? parseFloat(assets[0].cash) : 0;

        const price = parseFloat(position.current_price);
        const totalCost = price * shares;
        if (cash < totalCost) throw new Error('Insufficient cash');

        // 更新position表shares
        await conn.query('UPDATE position SET shares = shares + ? WHERE id = ?', [shares, position.id]);

        // 计算新现金
        const newCash = cash - totalCost;

        // 获取最新各类资产总额
        const stock_value = await getTotalPositionType(0);
        const bond_value = await getTotalPositionType(1);
        const crypto_value = await getTotalPositionType(2);

        // 插入asset表
        await conn.query(
            `INSERT INTO asset (cash, stock_value, bond_value, crypto_value) VALUES (?, ?, ?, ?)`,
            [newCash, stock_value, bond_value, crypto_value]
        );

        // 插入交易记录表
        await conn.query(
            `INSERT INTO transaction (symbol, trade_type, quantity, price, status) VALUES (?, 0, ?, ?, 0)`,
            [symbol, shares, price]
        );

        // 插入现金变化表
        await conn.query(
            `INSERT INTO cash_flow (type, amount) VALUES (1, ?)`,
            [totalCost]
        );

        return { success: true, newCash };
    } catch (error) {
        throw new Error('Buy failed: ' + error.message);
    }
};

const sellPosition = async (type, symbol, shares) => {
    const conn = connection;
    try {
        // 查询当前资产信息
        const [positions] = await conn.query('SELECT * FROM position WHERE type = ? AND symbol = ?', [type, symbol]);
        if (positions.length === 0) throw new Error('Asset not found');
        const position = positions[0];

        // 检查可卖份数
        if (shares <= 0 || shares > parseFloat(position.shares)) throw new Error('Invalid shares to sell');

        // 查询当前现金
        const [assets] = await conn.query('SELECT cash FROM asset ORDER BY id DESC LIMIT 1');
        const cash = assets.length > 0 ? parseFloat(assets[0].cash) : 0;

        const price = parseFloat(position.current_price);
        const totalIncome = price * shares;

        // 更新position表shares
        await conn.query('UPDATE position SET shares = shares - ? WHERE id = ?', [shares, position.id]);

        // 计算新现金
        const newCash = cash + totalIncome;

        // 获取最新各类资产总额
        const stock_value = await getTotalPositionType(0);
        const bond_value = await getTotalPositionType(1);
        const crypto_value = await getTotalPositionType(2);

        // 插入asset表
        await conn.query(
            `INSERT INTO asset (cash, stock_value, bond_value, crypto_value) VALUES (?, ?, ?, ?)`,
            [newCash, stock_value, bond_value, crypto_value]
        );

        // 插入交易记录表
        await conn.query(
            `INSERT INTO transaction (symbol, trade_type, quantity, price, status) VALUES (?, 1, ?, ?, 0)`,
            [symbol, shares, price]
        );

        // 插入现金变化表
        await conn.query(
            `INSERT INTO cash_flow (type, amount) VALUES (0, ?)`,
            [totalIncome]
        );

        return { success: true, newCash };
    } catch (error) {
        throw new Error('Sell failed: ' + error.message);
    }
};

//某类资产最新的总价值
const getTotalPositionType = async (type) => {
    try {
        let sql = '';
        if (type === 0) {
            sql = 'SELECT SUM(market_value) AS total FROM position WHERE type = 0';
        } else if (type === 1) {
            sql = 'SELECT SUM(market_value) AS total FROM position WHERE type = 1';
        } else if (type === 2) {
            sql = 'SELECT SUM(market_value) AS total FROM position WHERE type = 2';
        } else {
            throw new Error('Invalid type');
        }
        const [rows] = await connection.query(sql);
        return rows[0].total || 0;
    } catch (error) {
        throw new Error('Database query failed: ' + error.message);
    }
};



const updatePositionPrice = async (type, symbol, current_price) => {
    const conn = connection;
    try {
        if (typeof current_price !== 'number' || current_price <= 0) {
            throw new Error('Invalid current_price: must be a positive number');
        }
        // 更新position表中的当前价格
        const [result] = await conn.query(
            'UPDATE position SET current_price = ? WHERE type = ? AND symbol = ?',
            [current_price, type, symbol]
        );
        if (result.affectedRows === 0) throw new Error('Asset not found');
        // 重新计算各类资产总额
        const stock_value = await getTotalPositionType(0);
        const bond_value = await getTotalPositionType(1);
        const crypto_value = await getTotalPositionType(2);
        // 查询当前现金
        const [assets] = await conn.query('SELECT cash FROM asset ORDER BY id DESC LIMIT 1');
        const cash = assets.length > 0 ? parseFloat(assets[0].cash) : 0;
        // 插入asset表
        await conn.query(
            `INSERT INTO asset (cash, stock_value, bond_value, crypto_value) VALUES (?, ?, ?, ?)`,
            [cash, stock_value, bond_value, crypto_value]
        );
        return { success: true, stock_value, bond_value, crypto_value };
    } catch (error) {
        throw new Error('Update price failed: ' + error.message);
    }
};

export default {
    getAll,
    getStock,
    getBond,
    getCrypto,
    getTotalPositionType,
    buyPosition,
    sellPosition,
    updatePositionPrice,
};
