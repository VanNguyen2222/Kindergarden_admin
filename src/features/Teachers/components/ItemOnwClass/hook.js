import { CoursesContext } from "context/CoursesProvider"
import { useContext, useMemo } from "react"

export const useData = (courseId) => {
    const courses = useContext(CoursesContext)

    const courseName = useMemo(() =>
        courses?.find(c => c.id === courseId).name,
        [courses, courseId]
    )

    return {
        courseName
    }
}