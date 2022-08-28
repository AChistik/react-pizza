import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(`https://62e6600ade23e263792b463f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
