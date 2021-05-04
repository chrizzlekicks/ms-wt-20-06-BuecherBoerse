import React from 'react';
import { useGlobalContext } from '../context/OverallContext';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const { userName } = useGlobalContext();
  return (
    <>
      <section className='dashboard'>
        <h2 className='title'>Das sind deine Bücher, {userName}!</h2>
        <p>
          Hier siehst du alle Bücher, die du hochgeladen hast. Du kannst ganz
          einfach bestehende Bücher entfernen und bearbeiten, um immer den
          besten Überblick zu haben. Bald findest du hier auch eine Merkliste,
          in der alle deine Favoriten gespeichert sind.
        </p>
      </section>
    </>
  );
};

export default UserDashboard;
