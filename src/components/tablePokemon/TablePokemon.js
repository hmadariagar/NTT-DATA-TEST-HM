import { useContext, useEffect, useState } from 'react';
import './tablePokemon.css'
import Context from '../../context/Context';
import { deletePokemon, getPokemonsById, getPokemonsByidAuthor } from '../../services/request';

function TablePokemon() {
    
    const {context, setContext} = useContext(Context)
    const [listPokemons, setListPokemons] = useState([])
    
    const getData = async (idAuthor) => setListPokemons(await getPokemonsByidAuthor(idAuthor))
    const searchPokemon = (paramId) => getPokemonsById(paramId).then(res => setListPokemons(res?.id?[res]:[]))

    useEffect(() => {
        context.paramId?searchPokemon(context.paramId):getData(1)
    }, [context])
    
    const hanndleActionEdit = async (idPokemon) => {
        setContext({...context, editPokemon:await getPokemonsById(idPokemon),  modalActive:true})
    }

    const hanndleActionDelete = async (data) => {
        if (window.confirm(`¿Realmente quiere eliminar al Pokemon "${data.name}" con el Id: "${data.id}"?`)) {
            await deletePokemon(data)
            getData(1)
        }
    }

    
    return (
        <div className="card">
            <table border="2" cellSpacing="0" bordercolor="#f1f1f1" width="100%" >
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Ataque</th>
                    <th>Defensa</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listPokemons.length > 0 && listPokemons.map((item) =>{
                    return(
                        <tr key={item.id}>
                            <td align='left'>{item.name}</td>
                            <td align='center'>
                                <img height={30} src={item.image} alt={item.name} /> 
                            </td>
                            <td align='left'>{item.attack}</td>
                            <td align='left'>{item.defense}</td>
                            <td>
                                <div className="table-actions">
                                    <button className="button-icon"  title={`Editar ${item.id}`}  onClick={() => hanndleActionEdit(item.id)}>
                                        <i className='bx bx-edit-alt'/>
                                    </button>
                                    <button className="button-icon" title={`Eliminar ${item.id}`} onClick={() => hanndleActionDelete(item)}>
                                        <i className='bx bx-trash-alt'/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        
    </div>
    );
}

export default TablePokemon;
