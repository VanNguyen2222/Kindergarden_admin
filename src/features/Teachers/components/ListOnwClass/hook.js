import { ClassesContex } from "context/ClassesProvider"
import { useContext, useMemo } from "react"
import { useParams } from "react-router-dom";

export const useData = () => {
    const classes = useContext(ClassesContex)
    const { teacherId } = useParams();
    const ownClassList = useMemo(() =>
        classes?.filter(c => c.teacherId === teacherId),
        [classes, teacherId]
    )
    return {
        ownClassList
    }
}