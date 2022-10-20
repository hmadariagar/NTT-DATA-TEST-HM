import { useContext } from 'react';
import Context from '../../context/Context';
import './header.css'

function Header() {
    
    const {context, setContext} = useContext(Context)

    const handleSearch = async ({target}) => {
        const paramId = target.value.trim()
        setContext({...context, paramId})
    }

    return (
        <div className='card'>
            <h3> Listado de Pokemon </h3>
            <div className='header'>
                <div className="container-input container-search">
                    <i className='bx bx-search iconSearch'/>
                    <input type="search" size='small' placeholder='Buscar'  name="search" onChange={handleSearch}/>
                </div>
                <button className="button" onClick={() => setContext({...context, modalActive:true})}>
                    <i className='bx bx-plus'/>
                    <span>Nuevo</span>
                </button>    
            </div>
        </div>
    );
}

export default Header;
