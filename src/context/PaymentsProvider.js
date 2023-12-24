import { onValue, ref } from "firebase/database";
import { db } from "firebaseConfig";
import React, { createContext, useEffect, useState } from "react";

export const PaymentsContext = createContext();
function PaymentsProvider({ children }) {
  const [payments, setPayments] = useState();
  useEffect(() => {
    const dbRef = ref(db, "payments");
    onValue(dbRef, (snapshot) => {
      let payments = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        const payment = {
          id: childKey,
          ...childData,
        };

        // get course not deleted only
        payments.push(payment);
      });
      setPayments(payments);
    });
  }, []);
  console.log(payments);
  return (
    <PaymentsContext.Provider value={payments}>
      {children}
    </PaymentsContext.Provider>
  );
}

export default PaymentsProvider;
