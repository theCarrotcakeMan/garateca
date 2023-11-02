
export default function reduceUser(User: object, asProps: boolean) {

  return {
    props: {
      users: users.map((user) => ({
        _id: user._id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        // Add other user properties as needed
      })),
    },
  };
  return User;
}
