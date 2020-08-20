import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() =>{
    api.get('foods')
    .then(response => {
      setFoods(response.data);
    })
  }, foods);

  async function handleAddFood(food) {
    try {
      // TODO ADD A NEW FOOD PLATE TO THE API
      await api.post('foods', food);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food) {
    // TODO UPDATE A FOOD PLATE ON THE API
    await api.patch(`foods/${editingFood}`, food)
    .catch(err => {
      console.log(err);
    });
  }

  async function handleDeleteFood(id) {
    // TODO DELETE A FOOD PLATE FROM THE API
    await api.delete(`foods/${id}`);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  async function handleEditFood(food) {
    // TODO SET THE CURRENT EDITING FOOD ID IN THE STATE
    setEditingFood(food.id);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              openModal={toggleEditModal}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
