// libs/backend/features/src/lib/instrument/instrument.controller.ts
import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { IInstrument, ICreateInstrument, IUpdateInstrument } from '@InstrumentRental/shared/api';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get('')
  async getAll(): Promise<IInstrument[]> {
    return await this.instrumentService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IInstrument | null> {
    return await this.instrumentService.getOne(id);
  }

  @Post('')
  async create(@Body() data: ICreateInstrument & { available: boolean, ownerEmail: string }): Promise<IInstrument> {
    return await this.instrumentService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateInstrument): Promise<IInstrument> {
    return await this.instrumentService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.instrumentService.delete(id);
  }
}
