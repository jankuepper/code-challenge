export const queryAllCustomerSQL = `SELECT * FROM users WHERE type = 'customer'`;

export const customerByIdSQL = `SELECT * FROM users WHERE id = $id AND type = 'customer'`;
