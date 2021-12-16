/* eslint-disable react/prop-types */
import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ActionButton from './ActionBtn';

const UserAction = ({ openBook, removeBook, openEditWindow, messageUser }) => {
    const { userId } = useGlobalContext();
    const { username, condition, owner, status } = openBook;

    return (
        <>
            <aside className='user-action'>
                <section className='action-section'>
                    <p>Dieses Buch gehört:</p>
                    <h4>{username}</h4>
                </section>
                <hr className='separation-line' />
                <section className='action-section'>
                    <p>Zustand des Buches ist:</p>
                    <h4>{condition}</h4>
                </section>
                <hr className='separation-line' />
                <section className='action-section'>
                    <p>Dieses Buch ist:</p>
                    <h4>{status}</h4>
                </section>
                <hr className='separation-line' />
                <section className='action-section'>
                    <p>Was möchtest du tun?</p>
                    {owner === userId ? (
                        <>
                            <ActionButton onClick={openEditWindow}>
                                Jetzt bearbeiten
                            </ActionButton>
                            <ActionButton onClick={removeBook}>
                                Jetzt löschen
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={messageUser}>
                            Jetzt ausleihen
                        </ActionButton>
                    )}
                </section>
            </aside>
        </>
    );
};

export default UserAction;
