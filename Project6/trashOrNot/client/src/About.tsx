import { Navbar } from "./components/Navbar"

const About = () => {
  return (
    <>
      <div className="topSection">
        <Navbar></Navbar>
        <h1>Clean Berlin</h1>
      </div>
    <div className="aboutPageContainer"><div className="intro">This is a project by Haluka Maier-Borst</div>
    <img src="src/assets/haluka_cropped.jpeg"></img>
    <div className='redirect'>If you like some what you see here, check out some of the code <a href="https://github.com/HalukaMB">here </a> 
     or read my ever so mundane opinions <a href="https://twitter.com/halukamb">here.</a> </div></div>
    </>
  )
}

export default About