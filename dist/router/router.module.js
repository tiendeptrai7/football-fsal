"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RouterModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const routes_admin_module_1 = require("./routes/routes.admin.module");
const routes_organizer_module_1 = require("./routes/routes.organizer.module");
const routes_public_module_1 = require("./routes/routes.public.module");
let RouterModule = RouterModule_1 = class RouterModule {
    static forRoot() {
        const imports = [];
        if (process.env.HTTP_ENABLE === 'true') {
            imports.push(routes_public_module_1.RoutesPublicModule, routes_admin_module_1.RoutesAdminModule, routes_organizer_module_1.RoutesOrganizerModule, auth_module_1.AuthModule, core_1.RouterModule.register([
                {
                    path: '',
                    module: routes_public_module_1.RoutesPublicModule,
                },
                {
                    path: '/admin',
                    module: routes_admin_module_1.RoutesAdminModule,
                },
                {
                    path: '/organizer',
                    module: routes_organizer_module_1.RoutesOrganizerModule,
                },
                {
                    path: '/auth',
                    module: auth_module_1.AuthModule,
                },
            ]));
        }
        return {
            module: RouterModule_1,
            providers: [],
            exports: [],
            controllers: [],
            imports,
        };
    }
};
exports.RouterModule = RouterModule;
exports.RouterModule = RouterModule = RouterModule_1 = __decorate([
    (0, common_1.Module)({})
], RouterModule);
//# sourceMappingURL=router.module.js.map