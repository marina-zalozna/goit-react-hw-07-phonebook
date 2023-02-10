import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { addContacts } from '../redux/operations';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = evt => {
    evt.preventDefault();
    const data = {
      id: nanoid(),
      name,
      number,
    };
    const newName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    if (newName) {
      alert(`${name} is already is in contacts.`);
      return;
    }
    dispatch(addContacts(data));
    resetForm();
  };

  const handleChange = evt => {
    switch (evt.currentTarget.name) {
      case 'name':
        setName(evt.currentTarget.value);
        break;

      case 'number':
        setNumber(evt.currentTarget.value);
        break;

      default:
        return;
    }
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
          id={nameInputId}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
          id={numberInputId}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
