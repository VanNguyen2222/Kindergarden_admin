import { onValue, ref } from 'firebase/database';
import { db } from 'firebaseConfig';
import React, { createContext, useEffect, useState } from 'react';

export const ClassesContex = createContext()
function ClassesProvider({children}) {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        const dbRef = ref(db, 'classes');
        onValue(dbRef, (snapshot) => {
            let classes = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let students = []
                if(childData?.students) {
                    Object.keys(childData.students).forEach(key => {
                        students.push({
                            id: key,
                            isActive: childData.students[key].isActive
                        })
                    })
                }
                const cClass = {
                    id: childKey,
                    ...childData,
                    students
                }
                // get class not deleted only
                if(!cClass?.isDeleted)
                    classes.push(cClass)
            });
            setClasses(classes)
        });
    }, [])
    return (
        <ClassesContex.Provider value={classes}>
            {children}
        </ClassesContex.Provider>
    );
}

export default ClassesProvider;