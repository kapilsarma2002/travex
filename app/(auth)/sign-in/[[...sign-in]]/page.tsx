import { SignIn } from "@clerk/nextjs";

const SignInPage = () => <SignIn fallbackRedirectUrl={'/trip'} />;

export default SignInPage;