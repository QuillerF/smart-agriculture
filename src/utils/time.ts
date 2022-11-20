import moment from 'moment';

let time = {
    startTime: '',     //开始时间
    endTime: '',       //结束时间  
    splitTimeType: '', //时间拆分
}
//是否需要查询上一个时间维度
let prevDimensionFlag: Boolean = false;

/**
 * 时间格式转换 obj
 * @param startType 0 相对时间  1 绝对时间 必须
 * @param timeType 相对时间的周期 必须
 * @param start    绝对的开始时间 必须
 * @param end      绝对的结束时间 必须
 * @param splitTimeType 时间拆分 拆分粒度类型 Td-日/Tw-周/Tm-月/Tt-聚合 必须 
 * @param isPrevDimension 是否需要查询上一个时间维度 非必须 
 */
export function initTime(obj: any, isPrevDimension: Boolean = false) {
    const { startType, timeType, splitTimeType, start, end } = obj;
    time.splitTimeType = splitTimeType;
    prevDimensionFlag = isPrevDimension;
    //相对时间
    if (startType === 0) {
        handelTimeType(timeType)
    } else {
        time.startTime = start
        time.endTime = end
    }
    return time
}
// Y-当前年     YY-当前半年   YY2D-近2个半年 YM-本年一月到当前月
// Q-当前季度 
// M-当前月度   MW-本月所有周  MM-当前双月    MM3D-近3个双月  MM2D-近2个月 
// D-当前日     D7-近7日   D30-近30日
// W4-近四周    WD-本周所有日(取消)
function handelTimeType(timeType: String) {
    switch (timeType) {
        case 'YM':
            handelYMTime()
            break;
        case 'Y':
            handelYTime()
            break;    
        case 'YY':
            handelYYTime()
            break;
        case 'YY2D':
            handelYY2DTime()
            break;
        case 'Q':
            handelQTime()
            break;
        case 'M':
            handelMTime()
            break;
        case 'MW':
            handelMWTime()
            break;
        case 'MM':
            handelMMTime()
            break;
        case 'MM3D':
            handelMM3DTime()
            break;
        case 'MM2D':
            handelMM2DTime()
            break;
        case 'D':
            handelDTime()
            break;
        case 'D7':
            handelD7Time()
            break;
        case 'D30':
            handelD30Time()
            break;
        case 'W4':
            handelW4Time()
            break;
        default:

    }

}
//YM-本年一月到当前月
function handelYMTime() {
    time.startTime = moment().format('YYYY') + '0101000000'
    time.endTime = moment().format("YYYYMM") + '01000000'
}
//Y-当前年 维度处理
function handelYTime() {
    time.startTime = moment().format('YYYY') + '0101000000'
    time.endTime = moment().add(1, 'years').format('YYYY') + '0101000000';
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment().subtract(1, 'years').format('YYYY') + '0101000000'
    }
}
//YY-当前半年 维度处理
function handelYYTime() {
    const flag = 7;
    if (+ moment().format('MM') >= flag) {
        time.startTime = moment().format('YYYY') + '0701000000'
        time.endTime = moment().add(1, 'years').format('YYYY') + '0101000000'
    } else {
        time.startTime = moment().format('YYYY') + '0101000000'
        time.endTime = moment().format('YYYY') + '0701000000'
    }
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(6, 'months').format('YYYYMM') + '01000000'
    }
}
//YY2D-近2个半年
function handelYY2DTime() {
    const flag = 7;
    if (+moment().format('MM') >= flag) {
        time.startTime = moment().format('YYYY') + '0101000000'
        time.endTime = moment().add(1, 'years').format('YYYY') + '0101000000'
    } else {
        time.startTime = moment().subtract(1, 'years').format('YYYY') + '0701000000'
        time.endTime = moment().format('YYYY') + '0701000000'
    }
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(1, 'years').format('YYYYMM') + '01000000'
    }

}
//Q-当前季度 
function handelQTime() {
    time.startTime = moment().startOf('quarter').format("YYYYMMDD") + '000000'
    time.endTime = moment().endOf('quarter').add(1, 'days').format("YYYYMMDD") + '000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(3, 'months').format('YYYYMM') + '01000000'
    }
}
//M-当前月度
function handelMTime() {
    time.startTime = moment().format("YYYYMM") + '01000000'
    time.endTime = moment().endOf('month').add(1, 'days').format("YYYYMM") + '01000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(1, 'months').format('YYYYMM') + '01000000'
    }
}
//MW-本月所有周
function handelMWTime() {
    time.startTime = moment().format("YYYYMM") + '01000000'
    time.endTime = moment().endOf('month').add(1, 'days').format("YYYYMM") + '01000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(1, 'months').format('YYYYMM') + '01000000'
    }
}
//MM-当前双月
function handelMMTime() {
    const timeArr = [
        ['01', '02'],
        ['03', '04'],
        ['05', '06'],
        ['07', '08'],
        ['09', '10'],
        ['11', '12']
    ]
    const monthNum = String(moment().format('MM'));
    timeArr.forEach(v => {
        if (v.includes(monthNum)) {
            time.startTime = moment().format("YYYY") + v[0] + '01000000'
            time.endTime = moment(moment().format("YYYY") + v[1], 'YYYYMM').add(1, 'months').format('YYYYMM') + '01000000'
            //查询上一个周期
            if (prevDimensionFlag) {
                time.endTime = time.startTime;
                time.startTime = moment(time.startTime, 'YYYYMM').subtract(2, 'months').format('YYYYMM') + '01000000'
            }
        }
    })
}
//MM3D-近3个双月
function handelMM3DTime() {
    const timeArr = [
        ['01', '02'],
        ['03', '04'],
        ['05', '06'],
        ['07', '08'],
        ['09', '10'],
        ['11', '12']
    ]
    const monthNum = String(moment().format('MM'));
    timeArr.forEach(v => {
        if (v.includes(monthNum)) {
            time.endTime = moment(moment().format("YYYY") + v[1], 'YYYYMM').add(1, 'months').format('YYYYMM') + '01000000'
        }
    })
    time.startTime = moment(time.endTime, 'YYYYMM').subtract(6, 'months').format("YYYYMM") + '01000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(6, 'months').format('YYYYMM') + '01000000'
    }
}
//MM3D-近2个双月
function handelMM2DTime() {
    const timeArr = [
        ['01', '02'],
        ['03', '04'],
        ['05', '06'],
        ['07', '08'],
        ['09', '10'],
        ['11', '12']
    ]
    const monthNum = String(moment().format('MM'));
    timeArr.forEach(v => {
        if (v.includes(monthNum)) {
            time.endTime = moment(moment().format("YYYY") + v[1], 'YYYYMM').add(1, 'months').format('YYYYMM') + '01000000'
        }
    })
    time.startTime = moment(time.endTime, 'YYYYMM').subtract(4, 'months').format("YYYYMM") + '01000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMM').subtract(4, 'months').format('YYYYMM') + '01000000'
    }
}
//D-当前日 
function handelDTime() {
    time.startTime = moment().format('YYYYMMDD') + '000000'
    time.endTime = moment().add(1, 'days').format('YYYYMMDD') + '000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMMDD').subtract(1, 'days').format('YYYYMMDD') + '000000'
    }
}
//D7-近7日
function handelD7Time() {
    time.startTime = moment().subtract(6, 'days').format('YYYYMMDD') + '000000'
    time.endTime = moment().add(1, 'days').format('YYYYMMDD') + '000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMMDD').subtract(6, 'days').format('YYYYMMDD') + '000000'
    }
}
//D30-近30日
function handelD30Time() {
    time.startTime = moment().subtract(29, 'days').format('YYYYMMDD') + '000000'
    time.endTime = moment().add(1, 'days').format('YYYYMMDD') + '000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMMDD').subtract(29, 'days').format('YYYYMMDD') + '000000'
    }
}
//W4-近4周 (当前天+1往前推28天)
function handelW4Time() {
    time.endTime = moment().add(1, 'days').format('YYYYMMDD') + '000000'
    time.startTime = moment(time.endTime, 'YYYYMMDD').subtract(28, 'days').format('YYYYMMDD') + '000000'
    //查询上一个周期
    if (prevDimensionFlag) {
        time.endTime = time.startTime;
        time.startTime = moment(time.startTime, 'YYYYMMDD').subtract(28, 'days').format('YYYYMMDD') + '000000'
    }
}

