export const queryAllCustomerSQL = `SELECT * FROM user WHERE type = 'customer'`;
export const customerByIdSQL = `SELECT * FROM user WHERE id = $id AND type = 'customer'`;
export const queryAllContractsFromCustomerById = `SELECT contract.id AS 'contract_id', * FROM contract LEFT JOIN user ON contract.user_id = user.id WHERE user.id = $id`;
export const queryContractByIdFromCustomerById = `SELECT contract.id AS 'contract_id', * FROM contract
                                                  LEFT JOIN user 
                                                    ON contract.user_id = user.id AND contract_id = $contractId
                                                  WHERE user.id = $userId`;
