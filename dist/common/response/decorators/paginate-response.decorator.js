"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = ApiPaginatedResponse;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiPaginatedResponse(options) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paging response',
        content: {
            'application/json': {
                schema: {
                    properties: {
                        total_records: { type: 'number' },
                        limit: { type: 'number' },
                        page: { type: 'number' },
                        total_pages: { type: 'number' },
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(options.type) },
                        },
                    },
                },
            },
        },
    }), (0, swagger_1.ApiProperty)({
        type: [options.type],
        description: 'Data array',
    }));
}
//# sourceMappingURL=paginate-response.decorator.js.map