// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { FutsalFieldService } from '../services/futsal-field.service';
// import { Auth } from '@auth/decorators/auth.jwt.decorator';
// import { ListPaginate } from '@common/database/types/database.type';
// import { FilterFutsalTeamDto } from '../dtos/filter.dto';
// import { FutsalTeam } from '../repository/entities/booking.entity';
// import { CreateFutsalTeamDto } from '../dtos/create.dto';
// import { UpdateFutsalTeamDto } from '../dtos/update.dto';

// @Controller('futsal-fields')
// @ApiTags('futsal-fields')
// @ApiBearerAuth('accessToken')
// export class FutsalFieldPublicController {
//   constructor(private readonly service: FutsalFieldService) {}

//   @Get()
//   @HttpCode(HttpStatus.OK)
//   async getList(
//     @Query() param: FilterFutsalTeamDto,
//   ): Promise<ListPaginate<FutsalTeam>> {
//     return await this.service.getList(param);
//   }

//   @Get(':id([0-9]+)')
//   @HttpCode(HttpStatus.OK)
//   async getById(@Param('id') id: number): Promise<FutsalTeam> {
//     return await this.service.getById(id);
//   }

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   @Auth({ permissions: '' })
//   async create(@Body() body: CreateFutsalTeamDto): Promise<void> {
//     return await this.service.create(body);
//   }

//   @Put()
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @Auth({ permissions: '' })
//   async update(@Body() body: UpdateFutsalTeamDto): Promise<void> {
//     return await this.service.update(body);
//   }

//   @Put('toggle/status/:id([0-9]+)')
//   @HttpCode(HttpStatus.OK)
//   @Auth({ permissions: '' })
//   async toggle(@Param('id') id: number): Promise<void> {
//     return await this.service.toggle(id);
//   }
// }
