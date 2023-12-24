import { onValue, ref } from 'firebase/database';
import { db } from 'firebaseConfig';
import React, { createContext, useEffect, useState } from 'react';

export const StudentsContext = createContext()
function StudentsProvider({children}) {
    const [students, setStudents] = useState([])
    useEffect(() => {
        const dbRef = ref(db, 'students');
        onValue(dbRef, (snapshot) => {
            let students = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // let classes = []
                // if(childData.classes) {
                //     Object.keys(childData.classes).forEach(key => {
                //         classes.push(childData.classes[key])
                //     })
                // }
                const student = {
                    id: childKey,
                    ...childData,
                    // classes
                }
                students.push(student)
            });
            setStudents(students)
        });
    }, [])
    return (
        <StudentsContext.Provider value={students}>
            {children}
        </StudentsContext.Provider>
    );
}

export default StudentsProvider;