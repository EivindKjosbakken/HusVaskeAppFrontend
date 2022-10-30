import React from 'react';

export const Users = ({users}) => {
  console.log('USERS LENGTH:::' + users.length);

  if (users.length === 0) return null;

  const UserRow = (user, index) => {
    return (
      <tr key={index}>
        <td {...(index + 1)}></td>
        <td {...user.firstName}></td>
        <td {...user.lastName}></td>
        <td {...user.email}></td>
      </tr>
    );
  };

  const userTable = users.map((user, index) => UserRow(user, index));

  return (
    <View>
      <Text>Users</Text>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{userTable}</tbody>
      </table>
    </View>
  );
};
