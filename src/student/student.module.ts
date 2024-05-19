import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Group } from 'src/group/entities/group.entity';
import { Rating } from 'src/rating/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group, Rating])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule { }
