import css from './Filter.module.css';
import { setStatusFilter } from "../redux/filterSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Filter() {

    const filter = useSelector(state => state.contacts.filter);
    const dispatch = useDispatch(); 

  return (
    <>
      <label className={css.title}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={e => dispatch(setStatusFilter(e.target.value))}
        />
      </label>
    </>
  );
};