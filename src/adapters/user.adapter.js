export const createAddaptedUser = (user) => {
  const formattedUser = {
    name: user.name,
    email: user.email,
  };

  return formattedUser;
};
