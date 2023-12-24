import { onValue, ref } from 'firebase/database';
import { db } from 'firebaseConfig';
import React, { createContext, useEffect, useState } from 'react';

export const TeachersContext = createContext()
function TeachersProvider({children}) {
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        const dbRef = ref(db, 'teachers');
        onValue(dbRef, (snapshot) => {
            let teachers = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                // let classes = []
                // if(childData.classes) {
                //     Object.keys(childData.classes).forEach(key => {
                //         classes.push(childData.classes[key])
                //     })
                // }
                const teacher = {
                    id: childKey,
                    ...childData,
                    // classes
                }
                teachers.push(teacher)
            });
            setTeachers(teachers)
        });
    }, [])
    return (
        <TeachersContext.Provider value={teachers}>
            {children}
        </TeachersContext.Provider>
    );
}

export default TeachersProvider;