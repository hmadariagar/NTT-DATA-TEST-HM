
export const getPokemonsByidAuthor = async (id) => {
    const response = fetch(`https://bp-pokemons.herokuapp.com/?idAuthor=${id}`)
    .then((res) => (res.json()))
    .catch(() => []);
    return(response)
}


export const getPokemonsById = async (id) => {
    const response = fetch(`https://bp-pokemons.herokuapp.com/${id}`)
    .then((res) => (res.json()))
    .catch(() => {});
    return(response)
}


export const addPokemon = async (data) => {
    data.hp = 100
    data.type = "Fuego"
    data.idAuthor = 1
    const url = 'https://bp-pokemons.herokuapp.com/?idAuthor=1'
    
    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers:{ 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    return(response)
}


export const updatePokemon = async (data) => {
    data.idAuthor = 1
    const url = `https://bp-pokemons.herokuapp.com/${data.id}`
    
    const response = fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data), 
        headers:{ 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    return(response)
}


export const deletePokemon = async (data) => {
    const url = `https://bp-pokemons.herokuapp.com/${data.id}`
    const response = fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data), 
        headers:{ 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    return(response)
}