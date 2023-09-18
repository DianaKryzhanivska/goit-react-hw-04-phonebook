import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container, SubTitle, Info, MainTitle } from './App.styled';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // збереження даних в localStorage

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
      }));
    }
  };

  updateFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getAvailableContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const availableContacts = this.getAvailableContacts();

    return (
      <Container>
        <MainTitle>Phonebook</MainTitle>

        <ContactForm onSubmit={this.addContact} />

        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onUpdateFilter={this.updateFilter} />
        ) : (
          <Info>There are no contacts in your phonebook.</Info>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={availableContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </Container>
    );
  }
}
