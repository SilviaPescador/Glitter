const getUser = async () => {
  const response = await glitterApi.get("/users");
  const user = response.data.data;
  username.value = user.username;
  email.value = user.email;
  following.value = user.following;
};
