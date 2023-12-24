import { ClassesContex } from "context/ClassesProvider";
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

export const useData = () => {
    const classes = useContext(ClassesContex)
    const { studentId } = useParams();
    const ownClassList = useMemo(() =>
        classes?.filter(c =>
            c.students.some(s =>
                s.id === studentId)),
        [classes, studentId]
    )
    return {
        ownClassList
    }
}