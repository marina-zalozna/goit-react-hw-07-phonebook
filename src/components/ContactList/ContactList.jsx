import css from './ContactList.module.css';
import { deleteContacts, fetchContacts } from '../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ContactList() {
  const contacts = useSelector(state =>
    state.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(state.contacts.filter)
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.contacts}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contact__list} key={id}>
          <span className={css.contact__item}>{name}: </span>
          <span className="contact__item">{number} </span>
          <button
            className={css.contacts__button}
            type="button"
            onClick={() => dispatch(deleteContacts(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
