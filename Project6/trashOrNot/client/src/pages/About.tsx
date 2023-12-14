import { Navbar } from "../components/Navbar"
import { TopSection } from "../components/topSection"
import checkedin from "../utils/checkedin"

const About = () => {
  checkedin()

  return (
    <>
         <TopSection></TopSection>
    <div className="aboutPageContainer"><div className="intro">This is a project by Haluka Maier-Borst</div>
    <img src="src/assets/haluka_cropped.jpeg"width="100%"></img>
    <div className='redirect'>If you like some what you see here, check out some of the code <a href="https://github.com/HalukaMB">here </a> 
     or read my ever so mundane opinions <a href="https://twitter.com/halukamb">here.</a> </div></div>
    </>
  )
}

export default About