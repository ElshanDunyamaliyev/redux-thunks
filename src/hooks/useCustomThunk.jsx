import { useState,useCallback } from "react"
import { useDispatch } from "react-redux"

export  const useCustomThunk = (thunkus) => {
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    const dispatch = useDispatch()

    const runFunction = useCallback(() => {
        setIsLoading(true)
        dispatch(thunkus()).unwrap().catch(err => setError(err)).finally(() => setIsLoading(false))
    },[])

    return [runFunction,isLoading,error]

}


