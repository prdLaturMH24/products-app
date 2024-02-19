import React from 'react';


const UserProfile = ({user}) => {
    return (
        <div className="user-profile">
            {
                user ? 
                (
                    <div className='row'>
                        <div className='col-5'>
                            <img src={user.image} alt="Not Found" className='img img-thumbnail' style={{'width': '600px', 'height':'600px'}}/>
                        </div>
                        <div className='col-4'>
                            <h1>User Profile</h1>
                            <p><b>Username:</b> {user.username}</p>
                            <p><b>Name:</b> {user.firstName +' '+user.lastName}</p>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Gender:</b> {user.gender}</p>
                        </div>
                    </div>
                )
                :
                (
                    <h1>Please log in to view your profile</h1>
                )
            }
        </div>
    );
}

export default UserProfile;