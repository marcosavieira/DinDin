import './styles.css'
import Logo1 from "../../Assets/Polygon 1.svg";
import Logo2 from "../../Assets/Polygon 2.svg";
import backgroundImage from '../../Assets/background 1.png';

function Main() {
  return (
    <div className='container-main'>
      <img id='background-img' src={backgroundImage} alt="imagem-office" />
      <div className='container-logo'>
        <img id='polygon1' src={Logo1} alt="Polygon1" />
        <img id='polygon2' src={Logo2} alt="Polygon2" />
        <h2>Dindin</h2>
      </div>
      
    </div>
  )
}

export default Main;