import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { IInstrument } from '@InstrumentRental/shared/api';
import { CreateInstrumentDto } from '@InstrumentRental/backend/dto';

@Controller('instrument')
export class InstrumentController {
  constructor(private instrumentService: InstrumentService) {}

  @Get('')
  getAll(): IInstrument[] {
    return this.instrumentService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IInstrument {
    return this.instrumentService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateInstrumentDto): IInstrument {
    return this.instrumentService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.instrumentService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: CreateInstrumentDto
  ): IInstrument {
    return this.instrumentService.update(id, data);
  }
}
