import { FALaptop, FaTabletAlt, FaMobileAlt, FaLaptop } from 'react-icons/fa';
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Header = ({ title }) =>{  

    const { width } = useContext(DataContext)


    return(

        <header>
 
           <h1>{title}</h1>

           {

                width < 768 ? <FaMobileAlt/>

                    : width < 992 ? <FaTabletAlt/>

                        : <FaLaptop/>

           }

        </header>

    )

}

export default Header