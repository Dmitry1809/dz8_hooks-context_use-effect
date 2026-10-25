export default function List({ items, onSelect, activeId }) {
  return (
    <ul className="user-list">
      {items.map((user) => (
        <li
          key={user.id}
          className={`user-item ${user.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}
