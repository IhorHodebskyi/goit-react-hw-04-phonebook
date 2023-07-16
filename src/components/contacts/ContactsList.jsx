import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Button } from './ContacstList.styled';

const ContactList = ({ contacts, onRemoveContact }) => (
  <List>
    {contacts.map(({ name, number, id }) => (
      <Item key={id}>
        {name + ' : ' + number}
        {
          <Button
            type="button"
            name="delete"
            onClick={() => onRemoveContact(id)}
          >
            delete
          </Button>
        }
      </Item>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
