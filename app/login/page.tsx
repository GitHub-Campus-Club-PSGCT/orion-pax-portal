import { login } from "./actions";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return <LoginForm loginAction={login} />;
}
