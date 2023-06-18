import glitterApi from "../api/glitterApi.js";
// import { useRouter } from 'vue-router'

const guard = async function () {
  //  Looks for the token that was created during login in the localStorage
  const token = localStorage.getItem("access_token");

  if (!token) {
    // if it can't find it, returns false
    console.log("THe Guard won't let you in without a token");
    return false;
  }

  try {
    // if there's a token, it makes an API call to verify it's valid
    const response = await glitterApi.get("/auth/verify-token");
    if (response.data.authenticated) {
      console.log("The Guard lets you in");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("The Guard has experienced issues");
    return false;
  }
};

// Not access to private routes
export const useAuthGuard = async (to, from, next) => {
  const authenticated = await guard();

  if (!authenticated) {
    console.log("You have been redirected by the Guard. Please, log in");
    next("/login");
  } else {
    next();
  }
};

// Access to public zone but with private functionalities as follow or kudos
export const isAuthenticated = async (to, from, next) => {
  const authenticated = await guard();

  if (authenticated) {
    console.log("Public area with extra functionalities for registered users");
    next("/public-plus");
  } else {
    next();
  }
};
