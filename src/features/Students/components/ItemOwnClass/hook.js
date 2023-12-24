import { CoursesContext } from "context/CoursesProvider"
import { useContext, useMemo } from "react"
import { useParams } from "react-router-dom"

export const useData = (courseId, students, isFinished) => {
    const courses = useContext(CoursesContext)
    const { studentId } = useParams();

    const classState = useMemo(() =>
        isFinished ? "finished" :
            students.some(s =>
                s.id === studentId &&
                s.isActive) ? 
                "unfinished" : "lock",
        [isFinished, students, studentId]
    )

    const courseName = useMemo(() =>
        courses?.find(c => c.id === courseId)?.name,
        [courses, courseId]
    )


    return {
        courseName,
        classState
    }
}