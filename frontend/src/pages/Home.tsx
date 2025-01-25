import { Login } from "@/components/forms/login";
import { SignUp } from "@/components/forms/signUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Home() {
  return (
    <div className="h-dvh flex flex-col place-items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account now!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignUp />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login with your credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Login />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
