import css from './ContactList.module.css';
import { deleteContacts, fetchContacts } from '../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ContactList() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.status);
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  return (
    <ul className={css.contacts}>
      {getContacts.map(({ id, name, phone }) => (
        <li className={css.contact__list} key={id}>
          <span className={css.contact__item}>{name}: </span>
          <span className="contact__item">{phone} </span>
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
