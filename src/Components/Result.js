import { t } from "i18next";
import { useTranslation } from "react-i18next";


const Result = ({inputDay,  
                 inputMonth, 
                 inputYear, 
                 inputHour,
                 inputMinute,
                 curDate, 
                 curYear,
                 leapYars,
                 inputDate, 
                 setDisplayed, 
    })=> {

    const {t, i18n} = useTranslation();

    const curMonth = curDate.getMonth()+1, //number of month starting from 1
    curDay = curDate.getDate(),      
    curHour = curDate.getHours(),
    curMinute = curDate.getMinutes();

    const second = 1000,
    minute = second * 60,
    hour = minute * 60, 
    day = hour * 24,
    year = day * 365.2425;

    // Time between two dates in miliseconds
    const timeDiff = (curDate - inputDate);

    // Years, Days, Hours, Seconds from input date to today
    const fullYears = Math.floor(timeDiff/year);
    const timeInDays = Math.floor(timeDiff/day);
    const timeInHours = Math.floor(timeDiff/hour);
    const timeInSeconds = Math.floor(timeDiff/second);

    // How many days has last month
    const prevMaxDays = ()=> {

        let prevMonth = curMonth - 1
        if(prevMonth < 1) { prevMonth = 12 };
        
        switch(true) {
            case [4, 6, 9, 11].includes(prevMonth): 
                return 30;
                break;
            case prevMonth == 2 && leapYars.includes(Number(curYear)):
                return 29;
                break;
            case prevMonth == 2:
                return 28;
                break;
            default:
                return 31;
         };  
    }
  


    // Diffrence between input and current date values
    const valuesDiff = (inpVal, curVal, curDown, maxVal)=> {

        let parentDown = false
        let outVal = 0

        if(inpVal > curVal){
            outVal = maxVal - inpVal + curVal;
            parentDown = true;
        }else{
            outVal = curVal - inpVal;
        }

        // Checking is child was < 0
        if(curDown){
            outVal -=1;
        }

        
        if(outVal < 0){
            outVal += maxVal; 
            parentDown = true; // Change parent value 
        }

        return [outVal, parentDown]

    }




    const outValues = ()=> {
        const min = valuesDiff(inputMinute, curMinute, false, 60)[0];
        const hourDown = valuesDiff(inputMinute, curMinute, false, 60)[1];

        const hour = valuesDiff(inputHour, curHour, hourDown, 24)[0];
        const dayDown = valuesDiff(inputHour, curHour, hourDown, 24)[1];

        const day = valuesDiff(inputDay, curDay, dayDown, prevMaxDays())[0];
        const monthDown = valuesDiff(inputDay, curDay, dayDown, prevMaxDays())[1];

        const month = valuesDiff(inputMonth, curMonth, monthDown, 12)[0];

        return {
            min: min,
            hour: hour,
            day: day,
            month: month
        }
    }


    const outMinutes = outValues().min;
    const outHours = outValues().hour;
    const outDays = outValues().day;
    const outMonths = outValues().month;
    



    // Date of next birthday
    const nextBDate = ()=>{

        switch(true){
            case (curMonth > inputMonth) || ((curMonth == inputMonth) && (curDay > inputDay)):
                return new Date(`${inputMonth}, ${inputDay}, ${curYear + 1}`);
            break;
            case (curMonth < inputMonth) || ((curMonth == inputMonth) && (curDay < inputDay)):
                return new Date(`${inputMonth}, ${inputDay}, ${curYear}`);
            break;
            case (curMonth == inputMonth) && (curDay == inputDay):
                return 0
            break;
        }   
    };

    // Days to next birthday
    const daysToBday = Math.floor((nextBDate() - curDate)/day) + 1
    const happyBdayAge = curYear - inputYear;




    return(
        <div className="Result flex-col-wrapper">


            <h2>{t('out.title')}</h2>

            <div className="date-form">


                <DateOut valClass = 'date-input'
                         label={t('out.years')} 
                         value={fullYears}
                         />

                <DateOut valClass = 'date-input'
                         label={t('out.months')}
                          value={outMonths}
                          />

                <DateOut valClass = 'date-input'
                         label={t('out.days')}
                         value={outDays}
                         />


            </div>


            <div className="time-form">
   
                <DateOut valClass = 'time-input'
                         label={t('out.hours')} 
                         value={outHours < 10 ? `0${outHours}` : outHours} 
                         />

                <div className="time-colon">
                    <span>:</span>
                </div>

                <DateOut valClass = 'time-input'
                         label={t('out.minutes')} 
                         value={outMinutes < 10 ? `0${outMinutes}` : outMinutes} 
                         /> 

            </div>

     
                
            { daysToBday > 0 &&

            <NextBday label={t('out.toNextBD')}
                    value={daysToBday} 
                    />

            }

            { daysToBday <= 0 &&

            <HappyBirthday label={t('out.happyBD')}
                            age={happyBdayAge}
                            />

            }


            <h2>{t('out.haveLived')}</h2>
           
            <div className="time-pass-wrapper flex-col-wrapper">

                <TimePassed label={t('out.days')} value={timeInDays}/>
                <TimePassed label={t('out.hours')} value={timeInHours}/>
                <TimePassed label={t('out.seconds')} value={timeInSeconds}/>

            </div>



            <button className="button return-button"
                    onClick={ (e)=> {setDisplayed('input')}}
                    >
                    {t('out.button')}
            </button>
        
        
        </div>

    )
}




const DateOut = ({valClass, label, value}) => {
    return(
        <div className="flex-col-wrapper">

            <div className={`${valClass} flex-col-wrapper`}>
                {value}
            </div>

            <label>{label}</label>

        </div>
    )
};

const NextBday = ({label, value})=> {
    return(
        <div className="bday-wrapper flex-row-wrapper">

            <div className="bday-label">
                <h3>
                    {label}
                </h3>
            </div>

            <div className="date-input flex-col-wrapper">
                {value}
            </div>


        </div>
    )
};


const HappyBirthday = ({label, age})=>{
    return(
        <div className="bday-wrapper flex-row-wrapper">
            <div className="bday-label">
                <h3>
                    {label}
                </h3> 
            </div>
            <div className="flex-col-wrapper">
                <span className="yellow">{age}</span>
            </div>
        </div>
    )
}


const TimePassed = ({label, value})=> {
    return(
        <div className="time-pass flex-row-wrapper">
            <div className="date-input">
                {value}
            </div>

            <h3>
                {label}
            </h3>
        </div>
    )
}



export default Result