"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransaction = getTransaction;
async function getTransaction(dataSource) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
}
//# sourceMappingURL=transactionBuilder.util.js.map