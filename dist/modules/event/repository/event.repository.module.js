"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./entities/event.entity");
const event_repository_1 = require("./repositories/event.repository");
const event_guest_repository_1 = require("./repositories/event-guest.repository");
let EventRepositoryModule = class EventRepositoryModule {
};
exports.EventRepositoryModule = EventRepositoryModule;
exports.EventRepositoryModule = EventRepositoryModule = __decorate([
    (0, common_1.Module)({
        providers: [
            event_repository_1.EventRepository,
            event_guest_repository_1.EventGuestRepository,
        ],
        exports: [
            event_repository_1.EventRepository,
            event_guest_repository_1.EventGuestRepository,
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                event_entity_1.Event,
            ]),
        ],
    })
], EventRepositoryModule);
//# sourceMappingURL=event.repository.module.js.map