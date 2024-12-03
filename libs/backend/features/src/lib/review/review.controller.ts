import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { IReview, ICreateReview, IUpdateReview } from '@InstrumentRental/shared/api';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('')
  async getAll(): Promise<IReview[]> {
    return await this.reviewService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IReview | null> {
    return await this.reviewService.getOne(id);
  }

  @Post('')
  async create(@Body() data: ICreateReview): Promise<IReview> {
    return await this.reviewService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: IUpdateReview): Promise<IReview> {
    return await this.reviewService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.reviewService.delete(id);
  }
}
