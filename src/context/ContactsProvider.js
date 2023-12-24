import { onValue, ref } from "firebase/database";
import { db } from "firebaseConfig";
import React, { createContext, useEffect, useState } from "react";
export const ContactsContext = createContext();
const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const dbRef = ref(db, "contacts");
    onValue(dbRef, (snapshot) => {
      let contacts = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        const contact = {
          id: childKey,
          ...childData,
        };

         contacts.push(contact);
      });
      setContacts(contacts);
    });
  }, []);
  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
