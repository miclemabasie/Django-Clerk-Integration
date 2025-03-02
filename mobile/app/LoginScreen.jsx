import { useAuth, SignIn, SignUp } from '@clerk/clerk-expo';

const LoginScreen = () => {
  const { signOut } = useAuth();

  return (
    <>
      <SignIn />
      <SignUp />
      <Button onPress={signOut} title="Sign Out" />
    </>
  );
};


export default LoginScreen