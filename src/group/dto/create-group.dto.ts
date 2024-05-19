import { ApiProperty } from "@nestjs/swagger";
import { Student } from "src/student/entities/student.entity";

export class CreateGroupDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    count: number;
    @ApiProperty()
    teacherId: number
}
