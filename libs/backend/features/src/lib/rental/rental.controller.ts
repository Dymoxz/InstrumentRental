import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import {
  ICreateRental,
  IRental,
  IUpdateRental,
  RentalStatus,
} from '@InstrumentRental/shared/api';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get('')
  async getAll(): Promise<IRental[]> {
    return await this.rentalService.getAll();
  }

  @Get('status')
  async getByStatusAndOwnerEmail(
    @Query('status') status: string,
    @Query('ownerEmail') ownerEmail: string
  ): Promise<IRental[]> {
    const rentalStatus = status as RentalStatus;
    return await this.rentalService.getByStatusAndOwnerEmail(
      rentalStatus,
      ownerEmail
    );
  }

  @Get('owner')
  async getByOwnerEmail(
    @Query('ownerEmail') ownerEmail: string
  ): Promise<IRental[]> {
    return await this.rentalService.getByOwnerEmail(ownerEmail);
  }

  @Get('renter')
  async getByRenterEmail(
    @Query('renterEmail') renterEmail: string
  ): Promise<IRental[]> {
    return await this.rentalService.getByRenterEmail(renterEmail);
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
  async update(
    @Param('id') id: string,
    @Body() data: IUpdateRental
  ): Promise<IRental> {
    return await this.rentalService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.rentalService.delete(id);
  }
}
