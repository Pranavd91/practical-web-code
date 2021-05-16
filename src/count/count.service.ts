import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SMS } from 'src/entities/sms.entity';
import { getMongoRepository } from 'typeorm';
import { SortDto } from './dto/filter.dto';
const dayjs = require('dayjs');
var moment = require('moment-timezone');

@Injectable()
export class CountService {

    async getCount(sortDto: SortDto): Promise<any> {
        let { startDate, endDate, timeZone } = sortDto;
        let data = []
        const manager = getMongoRepository(SMS);
        let offset = "Asia/Kolkata";
        if (timeZone == "IST") {
            startDate = moment(startDate).tz("Asia/Kolkata");
            endDate = moment(endDate).tz("Asia/Kolkata");
            offset = "Asia/Kolkata"
        } if (timeZone == "PST") {
            startDate = moment(startDate).tz("America/Los_Angeles");
            endDate = moment(endDate).tz("America/Los_Angeles");
            offset = "America/Los_Angeles"
        } if (timeZone == "EST") {
            startDate = moment(startDate).tz("America/New_York");
            endDate = moment(endDate).tz("America/New_York");
            offset = "America/New_York"
        } if (timeZone == "AKST") {
            startDate = moment(startDate).tz("America/Anchorage");
            endDate = moment(endDate).tz("America/Anchorage");
            offset = "America/Anchorage"
        }
        let res;
        try {
            res = await manager.aggregate([
                {
                "$match": {
                    "created_on": { "$gte": new Date(startDate), "$lte": new Date(endDate) }
                }},

                { "$group": {
                    "_id": {
                        "$add": [
                            { "$subtract": [
                                { "$subtract": [ "$created_on", new Date(0) ] },
                                { "$mod": [ 
                                    { "$subtract": [ "$created_on", new Date(0) ] },
                                    1000 * 60 * 60
                                ]}
                            ] },
                            new Date(0)
                        ]
                    },
                    "count": { "$sum": 1 }
                }}
            ]).toArray()
          
            res.forEach(e => {   
                if(timeZone != "UTC"){
                let tempData = {  
                    "Date": moment(e._id).tz(offset).format('YYYY-MM-DD HH:mm:ss'),
                    "Count": e.count,
                }
                data.push(tempData)
                }else{
                    let tempData = {  
                    "Date": moment(e._id).format('YYYY-MM-DD HH:mm:ss'),
                    "Count": e.count,
                    }
                    data.push(tempData)
                }
            });
        } catch (e) {
            throw new InternalServerErrorException(e);
        }

        const countSms = data.map(a => a.Count);
        const date = data.map(a => a.Date);
        const params =
        {
            title: {
                text: 'Campaign sent sms'
            },
            yAxis: {
                title: {
                    text: 'Number of sent sms'
                }
            },
            xAxis: {
                categories: date
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'Total sent sms',
                data: countSms
            },],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        return params;
    }
}


