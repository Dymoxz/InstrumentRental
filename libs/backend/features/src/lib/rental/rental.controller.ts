import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { RentalService } from './rental.service';
import { ICreateRental, IRental, IUpdateRental } from '@InstrumentRental/shared/api';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get('')
  async getAll(): Promise<IRental[]> {
    return await this.rentalService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IRental | null> {
    return await this.rentalService.getOne(id);
  }

  @Post('')
  async create(@Body() data: ICreateRental): Promise<IRental> {
    return await this.rentalService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateRental): Promise<IRental> {
    return await this.rentalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.rentalService.delete(id);
  }
}
