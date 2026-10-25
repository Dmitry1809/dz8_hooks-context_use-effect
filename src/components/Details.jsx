import { useState, useEffect } from 'react';

const DefaultAvatar = () => (
  <svg 
    className="avatar-placeholder" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#888" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function Details({ info }) {
  const [details, setDetails] = useState(null);
  // Инициализируем в true, так как при монтировании нового key fetch стартует сразу
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`${import.meta.env.BASE_URL}data/${info.id}.json`, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Не удалось загрузить данные пользователя');
        return response.json();
      })
      .then((data) => {
        setDetails(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [info.id]);

  if (loading) return <div className="info-msg">Загрузка данных...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!details) return null;

  return (
    <div className="details-card">
      <div className="avatar-container">
        <DefaultAvatar />
      </div>
      <h2 className="name">{details.name}</h2>
      <div className="details-info">
        <p><strong>City:</strong> {details.details.city}</p>
        <p><strong>Company:</strong> {details.details.company}</p>
        <p><strong>Position:</strong> {details.details.position}</p>
      </div>
    </div>
  );
}
