import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [country, setCountry] = useState("");
  const [isColored, setIsColored] = useState(false);
  const [copy, setCopy] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((body) => {
        setUsers(body.results);
        setCopy(body.results);
      });
  }, []);

  function deleteUser(email) {
    const newUsers = users.filter((value) => value.email !== email);
    setUsers(newUsers);
  }
  function orderByCountry() {
    const copy = [...users];
    copy.sort((a, b) => a.location.country.localeCompare(b.location.country));
    setUsers(copy);
  }

  function orderByName() {
    const copy = [...users];
    copy.sort((a, b) => a.name.first.localeCompare(b.name.first));
    setUsers(copy);
  }

  function orderByLastname() {
    const copy = [...users];
    copy.sort((a, b) => a.name.last.localeCompare(b.name.last));
    setUsers(copy);
  }

  function changeCountry({nativeEvent: {target: { value }}}){
    setCountry(value);
  }

  const matchedUsers = users.filter(user => user.location.country.toLowerCase().includes(country.toLowerCase()));

  return (
    <>
      <div className='header'>
        Lista de usuarios
      </div>
      <div className='menu'>
        <div className='child'>
          <button onClick={() => setIsColored(!isColored)}>
            Colorear filas
          </button>
        </div>
        <div className='child'>
          <button onClick={() => {
            console.log(copy)
            setUsers(copy)
          }}>
            Restaurar al estado inicial
          </button>
        </div>
        <div className='child'>
          <button onClick={orderByCountry}>
            Ordenar por país
          </button>
        </div>
        <div className='child'>
          <input type="text" placeholder='Filtrar por país' onChange={changeCountry} />
        </div>
      </div>
      <div className='center-table'>
        <table className={isColored ? 'colored' : ''}>
          <thead>
            <tr>
              <th>Foto</th>
              <th onClick={orderByName}>Nombre</th>
              <th onClick={orderByLastname}>Apellido</th>
              <th onClick={orderByCountry}>Pais</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              matchedUsers.map(person =>
                <tr key={person.email}>
                  <td>
                    <img src={person.picture.thumbnail} alt="Girl in a jacket" width="50" height="50"></img>
                  </td>
                  <td>
                    {person.name.first}
                  </td>
                  <td>
                    {person.name.last}
                  </td>
                  <td>
                    {person.location.country}
                  </td>
                  <td>
                    <button onClick={() => deleteUser(person.email)}>Eliminar</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
