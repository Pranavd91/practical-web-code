import { Controller, Get, Query, Render } from '@nestjs/common';
import { CountService } from './count.service';
import { SortDto } from './dto/filter.dto';

@Controller('count')
export class CountController {

    constructor(
        private countService: CountService,
    ) { }

    @Get('getcount')
    getCount(@Query() sortDto: SortDto) {
        return this.countService.getCount(sortDto);
    }
}
