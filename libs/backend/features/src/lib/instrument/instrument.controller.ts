import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { IInstrument, ICreateInstrument, IUpdateInstrument } from '@InstrumentRental/shared/api';

@Controller('instruments')
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
  create(@Body() data: ICreateInstrument): Promise<IInstrument> {
    return this.instrumentService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: IUpdateInstrument): Promise<IInstrument> {
    return this.instrumentService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.instrumentService.delete(id);
  }
}
