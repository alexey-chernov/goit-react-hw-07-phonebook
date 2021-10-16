import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactsOperations } from '../../redux/contacts';
import styles from './FormContacts.module.css';
import InputMask from 'react-input-mask';

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(contactsOperations.addContact(name, number));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <label className={styles.Label}>
        Ім'я
        <input
          className={styles.Input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може складатись лише із букв, апострофа, тире та пробілів. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan і т.д."
          required
          value={name}
          onChange={handleChange}
          placeholder="Sylvester Stalone"
        />
      </label>
      <label className={styles.Label}>
        Номер
        <InputMask
          className={styles.Input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефону може складатись з цифр і може скаладтись з пробілів, тире, круглих дужок і може починатись з +"
          required
          onChange={handleChange}
          value={number}
          placeholder="+38 (099) 999-99-99"
          mask="+38 (099) 999-99-99"

        />
      </label>
      <button className={styles.Button} type="submit">
        Додати контакт
      </button>
    </form>
  );

}

export default ContactForm;
