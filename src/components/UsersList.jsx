import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { fetchUsers,addUsers } from '../store'
import Skeleton from './Skeleton'
import Button from './Button'
import { useCustomThunk } from '../hooks/useCustomThunk'


const UsersList = () => {

    const {doFetchUsers,isLoadingUser,isLoadingUserError} = useCustomThunk(fetchUsers)
    const {doCreateUser,isCreatingUser,isCreatingUserError} = useCustomThunk(addUsers)


    const {data} = useSelector(state => {
        return state.users
    })


    useEffect(() => {
        doFetchUsers();
      }, [doFetchUsers]);
    
      const handleUserAdd = () => {
        doCreateUser();
      };
    

    if(isLoadingUser){
        return <Skeleton times={6} className = 'h-10 w-full'/>
    }
    if(isLoadingUserError){
        return <div>Error happened while fetching data</div>
    }

    const renderedUsers = data.map(user => {
        return <div key={user.id} className = 'mb-2 border rounded'>
            <div className="flex p-2 justify-between items-center cursor-pointer">{user.name}</div>
        </div>
    })

  return (
    <div>
        <div className='flex flex-row items-center justify-between m-3'>
            <h1>Users</h1>
            {isCreatingUser ? 'creating user...' : <Button onClick = {handleUserAdd}>+ Add user</Button>}
        </div>
        {renderedUsers}
    </div>
  )
}

export default UsersList