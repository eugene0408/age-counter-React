import { useState, useRef, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { useTranslation } from 'react-i18next';


// Icons
import sunIcon from './img/sun.svg';
import moonIcon from './img/moon.svg';
import engIcon from './img/eng.svg';
import ukrIcon from './img/ukr.svg';
import rusIcon from './img/rus.svg';
// Components
import InputForm from './Components/InputForm';
import './Fonts.css'
import './App.css';
import Result from './Components/Result';



function App() {

  // Themes change
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = ()=> {
    const newTheme = theme === 'light' ? 'dark': 'light';
    setTheme(newTheme);
  };



  // States
  const [displayed, setDisplayed] = useState('input')  //display input/result
  const [inputDay, setInputDay] = useState();
  const [inputMonth, setInputMonth] = useState();
  const [inputYear, setInputYear] = useState();
  const [inputHour, setInputHour] = useState();
  const [inputMinute, setInputMinute] = useState();
  const [inputDate, setInputDate] = useState();
  

  const curDate = new Date();
  const curYear = curDate.getFullYear();

  // Save to local storage
  const [saveDay, setSaveDay] = useLocalStorage('day', null)
  const [saveMonth, setSaveMonth] = useLocalStorage('month', null)
  const [saveYear, setSaveYear] = useLocalStorage('year', null)
  const [saveHour, setSaveHour] = useLocalStorage('hour', null)
  const [saveMinute, setSaveMinute] = useLocalStorage('minute', null)


  useEffect(()=> {
    setSaveDay(inputDay);
    setSaveMonth(inputMonth);
    setSaveYear(inputYear);
    setSaveHour(inputHour);
    setSaveMinute(inputMinute);
  }, [inputDay, inputMonth, inputYear, inputHour, inputMinute])

  useEffect(()=> {
    saveDay ? setInputDay(saveDay) : setInputDay(1);
    saveMonth ? setInputMonth(saveMonth) : setInputMonth(1);
    saveYear ? setInputYear(saveYear) : setInputYear(1900);
    saveHour ? setInputHour(saveHour) : setInputHour('00');
    saveMinute ? setInputMinute(saveMinute) : setInputMinute('00');
  }, [])


  
  // Leap years
  let leapYars = [];

  const setLeapYears = ()=> {
      for(let i = 1900;  i <= curYear; i = i+4){
          leapYars.push(i)
      }
  }

  setLeapYears()



  return (

   
    <div className = "App"
         data-theme = {theme}  
    >

       <LangSelect />


        {/* Change theme */}
        <button className='switch-theme-btn'  onClick={switchTheme}>
          <img src={theme === 'light' ?  sunIcon : moonIcon} alt="light/dark" />
        </button>

 


        { displayed === 'input' && 
            <InputForm
              inputDay = {inputDay}
              setInputDay = {setInputDay}
              inputMonth = {inputMonth}
              setInputMonth = {setInputMonth}
              inputYear = {inputYear}
              setInputYear = {setInputYear}
              inputHour = {inputHour}
              setInputHour = {setInputHour}
              inputMinute = {inputMinute}
              setInputMinute = {setInputMinute}
              saveDay = {saveDay}
              setSaveDay = {setSaveDay}
              saveMonth = {saveMonth}
              setSaveMonth = {setSaveMonth}
              saveYear = {saveYear}
              setSaveYear = {setSaveYear}
              saveHour = {saveHour}
              setSaveHour = {setSaveHour}
              saveMinute = {saveMinute}
              setSaveMinute = {setSaveMinute}
              curDate = {curDate}
              curYear = {curYear}
              leapYars = {leapYars}
              inputDate = {inputDate}
              setInputDate = {setInputDate}
              displayed = {displayed}
              setDisplayed = {setDisplayed}
    
            />
          }

          { displayed === 'result' && 
              <Result 
                inputDay = {inputDay}
                inputMonth = {inputMonth}
                inputYear = {inputYear}
                inputHour = {inputHour}
                inputMinute = {inputMinute}
                curDate = {curDate}
                curYear = {curYear}
                leapYars = {leapYars}
                inputDate = {inputDate}
                displayed = {displayed}
                setDisplayed = {setDisplayed}
              />
          }



    </div>


  );
}


const LangSelect = ()=> {

   const {t, i18n} = useTranslation();


   const changeLanguage = (lng) => {
     i18n.changeLanguage(lng);
   };
 
   const langSwitch = useRef(), 
        engButton = useRef(),
        ukrButton = useRef(), 
        rusButton = useRef();
 
   const displayCurLangIcon = () => {
     switch (true) {
       case ["en", "en-US", "en-GB", "en-AU", "en-CA", "en-NZ"].includes(i18n.language):
         return {backgroundImage: `url(${engIcon})`}
 
       case ["uk", "uk-UA"].includes(i18n.language):
         return {backgroundImage: `url(${ukrIcon})`}
 
       case ["ru", "ru-RU"].includes(i18n.language):
         return {backgroundImage: `url(${rusIcon})`}
 
     } 
   }

   const langClickHandler = ()=> {
      langSwitch.current.classList.toggle('hide');
      langSwitch.current.classList.toggle('show');

      [ukrButton, engButton, rusButton].forEach((el)=> {
        el.current.classList.toggle('show')
        el.current.classList.toggle('hide')
      })

   }

   const langSelectorBlur = () => {
     if (langSwitch.current.classList.contains('hide')) {
      langClickHandler();
     };
   }

   return(

     <div className = 'language-selector' 
          onBlur={langSelectorBlur}
           >

      <div className = 'language-button__current language-button show'
          style = {displayCurLangIcon()}
          ref = {langSwitch}
          onClick = {langClickHandler}
          ></div>

      <button className = 'language-button hide'
              style = {{backgroundImage: `url(${engIcon})`}}
              onClick = { ()=> {changeLanguage('en');
                                langClickHandler();
                        }}
              ref = {engButton}
              >
      </button>

      <button className = 'language-button hide'
              style = {{backgroundImage: `url(${ukrIcon})`}}
              onClick = { ()=> {changeLanguage('uk');
                                langClickHandler();
                        }}
              ref = {ukrButton} 
              >
      </button>

      <button className = 'language-button hide'
              style={{backgroundImage: `url(${rusIcon})`}}
              onClick = { ()=> {changeLanguage('ru');
                                langClickHandler();
                        }}
              ref = {rusButton}
              >
      </button>



   </div>
   )
 
}



export default App;
