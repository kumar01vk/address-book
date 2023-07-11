// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddressBook = () => {
//   const [contacts, setContacts] = useState([]);
//   const [name, setName] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/v1/contacts');
//       setContacts(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddContact = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/v1/contacts', {
//         contact: {
//           name,
//           contact_number: contactNumber,
//           address,
//           gender,
//           age,
//         },
//       });
//       setContacts([...contacts, response.data]);
//       clearForm();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/contacts/${id}`);
//       setContacts(contacts.filter((contact) => contact.id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   const clearForm = () => {
//     setName('');
//     setContactNumber('');
//     setAddress('');
//     setGender('');
//     setAge('');
//   };

//   const filteredContacts = filter
//     ? contacts.filter(
//         (contact) =>
//           contact.contact_number.includes(filter) ||
//           contact.gender === filter ||
//           contact.age === parseInt(filter)
//       )
//     : contacts;

//   return (
//     <div>
//       <h1>Address Book</h1>
//       <form onSubmit={handleAddContact}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Contact Number"
//           value={contactNumber}
//           onChange={(e) => setContactNumber(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <button type="submit">Add</button>
//       </form>
//       <input
//         type="text"
//         placeholder="Filter"
//         value={filter}
//         onChange={handleFilterChange}
//       />
//       <ul>
//         {filteredContacts.map((contact) => (
//           <li key={contact.id}>
//             {contact.name} - {contact.contact_number} - {contact.address} -{' '}
//             {contact.gender} - {contact.age}
//             <button onClick={() => handleDeleteContact(contact.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AddressBook;


import React, { useState, useEffect } from 'react';


const AddressBook = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            name,
            contact_number: contactNumber,
            address,
            gender,
            age,
          },
        }),
      });
      const data = await response.json();
      setContacts([...contacts, data]);
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await fetch(`api/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const clearForm = () => {
    setName('');
    setContactNumber('');
    setAddress('');
    setGender('');
    setAge('');
  };

  const filteredContacts = filter
    ? contacts.filter(
        (contact) =>
            contact.name === filter ||
            contact.address === filter ||
          contact.contact_number.includes(filter) ||
          contact.gender === filter ||
          contact.age === parseInt(filter)
      )
    : contacts;

  return (
    <div>
      <h1>Address Book</h1>
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.contact_number} - {contact.address} -{' '}
            {contact.gender} - {contact.age}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressBook;
