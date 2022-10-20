import { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import {addPokemon, updatePokemon} from '../../services/request'
import './modalPokemon.css'

function ModalPokemon() {
    
    const dataDefault = {name:"", attack:"0", image:"", defense:"0"} 
    const {context, setContext} = useContext(Context)
    const [dataPoke, setDataPoke] = useState(dataDefault)

    const handleChange = ({target}) => {
        const {name, value} = target
        setDataPoke({...dataPoke, [name]:value})
    }

    useEffect(() => {
      setDataPoke(context.editPokemon?context.editPokemon:dataDefault)
      document.getElementById("cardInsert").scrollIntoView()
    }, [context])
    

    const isValid = () => !!dataPoke.name && !!dataPoke.image
    
    const closeModal = () => {
        setContext({...context, modalActive:false, editPokemon:false})
    }

    const handleSubmit = async () => {
        const response = context.editPokemon? await updatePokemon(dataPoke):await addPokemon(dataPoke)
        if(response){
            setDataPoke(dataDefault)
            closeModal()
        }
    }


    return (
        <div className={`modal ${context.editPokemon?'':'contents'}`} >
            <div className='card border' id='cardInsert'>
                <h3 className="center"> {context.editPokemon?"Editar":"Nuevo"} Pokemon </h3>
                <div className="grid">
                    <div className="grid-item">
                        <span>Nombre:</span>
                        <div className="container-input">
                            <input size='small' value={dataPoke.name} name="name" onChange={handleChange} required={!dataPoke.name}/>
                        </div>
                    </div>
                    <div className="grid-item">
                        <span>Ataque:</span>
                        <div className="container-input">
                            <span> 0 </span>
                            <input type="range" title='change' value={dataPoke.attack} name="attack" onChange={handleChange}/>
                            <span >100</span>
                        </div>
                    </div>
                    <div className="grid-item">
                        <span>Imagen:</span>
                        <div className="container-input">
                            <input size='small' placeholder='URL' value={dataPoke.image}  name="image" onChange={handleChange} required={!dataPoke.image}/>
                        </div>
                    </div>
                    <div className="grid-item">
                        <span>Defensa:</span>
                        <div className="container-input">
                            <span> 0 </span>
                            <input type="range"  name="defense" value={dataPoke.defense}  onChange={handleChange}/>
                            <span >100</span>
                        </div>
                    </div>
                </div>
                <div className='modal-actions'>
                    <button className="button" disabled={!isValid()} onClick={handleSubmit}>
                        <i className='bx bx-save'/>
                        <span>{context.editPokemon?"Actualizar":"Guardar"}</span>
                    </button>
                    <button className="button" onClick={closeModal}>
                        <i className='bx bx-x'/>
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalPokemon;
