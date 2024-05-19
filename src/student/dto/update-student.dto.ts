import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    surname: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    groupId: number
}
