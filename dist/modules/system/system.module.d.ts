import { OnApplicationBootstrap } from '@nestjs/common';
import { SystemService } from './services/system.service';
export declare class SystemModule implements OnApplicationBootstrap {
    private readonly systemService;
    constructor(systemService: SystemService);
    onApplicationBootstrap(): void;
}
