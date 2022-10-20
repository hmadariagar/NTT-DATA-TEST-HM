import { useState } from 'react';
import './App.css';
import TablePokemon from './components/tablePokemon/TablePokemon';
import ModalPokemon from './components/modalPokemon/ModalPokemon';
import Header from './components/Header/Header';
import Context from './context/Context';

function App() {
    const [context, setContext] = useState({paramId:"", modalActive:false})

    return (
        <Context.Provider value={{context, setContext}}>
            <div className="App">   
                <Header/>
                <TablePokemon/>
                {context.modalActive && <ModalPokemon/>}
            </div>
        </Context.Provider>
    );
}

export default App;
