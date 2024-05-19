import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './group/group.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { Student } from './student/entities/student.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Group } from './group/entities/group.entity';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: "127.0.0.1",
      port: 3306,
      database: "nest_homework_30",
      username: "root",
      password: "",
      type: "mysql",
      synchronize: true,
      entities: [Student, Teacher, Group, Rating]
    }),
    GroupModule, StudentModule, TeacherModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
