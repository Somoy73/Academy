export const validUser = (user) => {
  try {
    if (user.username?.length > 0 && user.id && user.email?.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
