import { useState, useEffect } from 'react';
import List from './components/List';
import Details from './components/Details';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // Инициализируем сразу в true, так как fetch стартует мгновенно
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/users.json`) // Динамический базовый URL
      .then((response) => {
        if (!response.ok) throw new Error('Ошибка загрузки списка');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectUser = (user) => {
    if (selectedUser && selectedUser.id === user.id) return;
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <div className="column">
        {loading && <div className="info-msg">Загрузка списка...</div>}
        {error && <div className="error-msg">{error}</div>}
        <List 
          items={users} 
          onSelect={handleSelectUser} 
          activeId={selectedUser?.id} 
        />
      </div>
      <div className="column">
        {selectedUser ? (
          <Details info={selectedUser} key={selectedUser.id} />
        ) : (
          <div className="placeholder">Выберите пользователя из списка</div>
        )}
      </div>
    </div>
  );
}
