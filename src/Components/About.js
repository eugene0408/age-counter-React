import ArrowButton from "./ArrowButton";

const About = ({displayed, setDisplayed, aboutButton, setAboutButton})=> {

    const returnHandler = ()=> {
        setDisplayed('input');
        setAboutButton(true);
    }

    return(

        <div className="About flex-col-wrapper">

            <h1>Age Counter</h1>
            
            <div className="flex-col-wrapper">
                <h3>GitHub Repository:</h3> 
                <a className="yellow" href="https://github.com/eugene0408/age-couter-React">https://github.com/eugene0408/age-couter-React</a>
            </div>

            <div className="flex-col-wrapper">
                <h3>My Portfolio Website:</h3>
                <a className="yellow" href="https://eugenelemak.netlify.app/">https://eugenelemak.netlify.app/</a>
            </div>


            <ArrowButton className={'return-button'} handler={returnHandler}/>

            <div className="copyright">©2022</div>

        </div>

    )
}

export default About 