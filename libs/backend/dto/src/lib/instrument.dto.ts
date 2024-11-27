import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate, IsNumber
} from 'class-validator';
import {
  ICreateInstrument,
  IUpdateInstrument,
  IUpsertInstrument,
  InstrumentType
} from '@InstrumentRental/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateInstrumentDto implements ICreateInstrument {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  type!: InstrumentType;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsNumber()
  @IsNotEmpty()
  pricePerDay!: number;
}

export class UpsertInstrumentDto implements IUpdateInstrument {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  type!: InstrumentType;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsNumber()
  @IsNotEmpty()
  pricePerDay!: number;
}

export class UpdateInstrumentDto implements IUpsertInstrument {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  type!: InstrumentType;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsNumber()
  @IsNotEmpty()
  pricePerDay!: number;
}
