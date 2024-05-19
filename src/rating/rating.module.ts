import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Rating, Student])
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
