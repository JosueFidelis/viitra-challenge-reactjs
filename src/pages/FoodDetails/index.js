import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import { Container, FoodContainer } from './styles';
import { FoodsContainer } from '../Dashboard/styles';

const FoodDetails = () => {
  const [food, setFood] = useState();
  const query = useParams();

  useEffect(() => {
    getFood();
  }, []);

  async function getFood() {
    api.get(`foods/?id=${query.id}`)
    .then( response => {
        setFood(response.data[0]);
    });
  }

  return (
    <>
    <Container>
      <header>
        <Link to="/" className='text-link'>
          <h1>Viitra restaurant</h1>
        </Link>
      </header>
    </Container>
    <FoodsContainer>
      { food &&
        <FoodContainer>
          <header>
            <img src={food.image} alt={food.name} />
          </header>
          <section className="body">
            <h2>{food.name}</h2>
            <p>{food.description}</p>
            <p>Tempo para cozinhar: {food.timeToCook}</p>
            <p>Quantidade disponível: {food.quantity} </p>
            <p className="price">
              R$ <b>{food.price}</b>
            </p>
          </section>
        </FoodContainer>
      }
    </FoodsContainer>
    </>
  );

}

export default FoodDetails;