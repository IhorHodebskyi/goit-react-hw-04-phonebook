import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './contactsForm/ContactsForm';
import ContactList from './contacts/ContactsList';
import Filter from './Filter/Filter';
import { Container, Wrapper, Title, SubTitle } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  //==================================================================
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevContacts],
    }));
  };
  //=================================================================
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();
  //=============================================================
  const changeFilter = event => {
    setFilter(event.target.value);
  };
  //===============================================================
  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactsForm onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
};

export default App;

//=====================================================================
// class oldApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({
//         contacts: parseContacts,
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       console.log('Open');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = contact => {
//     const isInContacts = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (isInContacts) {
//       alert(`${contact.name} is already in contacts`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.target.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   render() {
//     const visibleContacts = this.getVisibleContacts();
//     const { filter } = this.state;

//     return (
//       <Container>
//         <Title>Phonebook</Title>

//         <ContactsForm onSubmit={this.addContact} />

//         <SubTitle>Contacts</SubTitle>
//         {this.state.contacts.length > 0 ? (
//           <Filter value={filter} onChangeFilter={this.changeFilter} />
//         ) : (
//           <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
//         )}
//         {this.state.contacts.length > 0 && (
//           <ContactList
//             contacts={visibleContacts}
//             onRemoveContact={this.removeContact}
//           />
//         )}
//       </Container>
//     );
//   }
// }
