import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../authProvider";

const formSchema = z.object({
  username: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  password: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(8, "You're password isn't long enough")
    .max(30, "You're password is to long"),
});

export function Login() {
  const { toast } = useToast();
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthData ? setAuthData(data.result) : undefined;
          navigate("/contracts");
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            description: "Something went wrong.",
          });
        }
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
