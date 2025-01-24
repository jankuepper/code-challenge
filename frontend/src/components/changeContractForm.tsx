import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Contract } from "@/pages/ContractView";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  status: z.enum(["approved", "open", "closed"]),
  userId: z.coerce
    .number({
      invalid_type_error: "userId must be a number.",
    })
    .int()
    .optional(),
});

export function UpdateContractForm(props: { contract: Contract }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.contract.name!,
      status: props.contract.status!,
      userId: props.contract.user_id! ?? -1,
    },
  });
  async function onSubmit({
    name,
    status,
    userId,
  }: z.infer<typeof formSchema>) {
    try {
      // TODO: insert id of authenticated user once its done
      fetch(
        `http://localhost:3000/customers/${1}/contracts/${props.contract.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, status, userId: userId || null }),
        }
      )
        .then((res) => res.json())
        // TODO: show toast
        .then((data) => console.log(data));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="status" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserId</FormLabel>
                <FormControl>
                  <Input placeholder="userId" type="number" {...field} />
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
    </>
  );
}
