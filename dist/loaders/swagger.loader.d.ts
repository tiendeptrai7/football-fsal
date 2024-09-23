import { NestExpressApplication } from '@nestjs/platform-express';
declare const swaggerLoader: (app: NestExpressApplication) => Promise<void>;
export default swaggerLoader;
