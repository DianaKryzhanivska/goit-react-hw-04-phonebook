import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Container, SubTitle, Info, MainTitle } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? defaultContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prev => [...prev, { id: nanoid(), ...contact }]);
  };

  const updateFilter = event => {
    setFilter(event.target.value);
  };

  const getAvailableContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const availableContacts = getAvailableContacts();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>

      <ContactForm onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onUpdateFilter={updateFilter} />
      ) : (
        <Info>There are no contacts in your phonebook.</Info>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={availableContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  );
};
