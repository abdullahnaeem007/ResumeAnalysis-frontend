import { supabase } from "../supabase.js";

export const Login = async (jwt) => {
  const { data, error } = await supabase.auth.getUser(jwt);
  if (error) {
      console.error(error);
      return {
          user: null,
          id: null,
          status: 404
      };
  } else if (data?.user) {
      return {
          email: data.user.email,
          name: data.user.email,
          id: data.user.id,
          status: 200
      };
  }
  else {
      return {
          user: null,
          id: null,
          status: 404
      };
  }
}