import { IsOptional } from 'class-validator';



export class SortDto {

  @IsOptional()
  startDate: any;

  @IsOptional()
  endDate: any;

  @IsOptional()
  timeZone: string;
 
}
