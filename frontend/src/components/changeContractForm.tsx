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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  status: z.enum(["approved", "open", "closed"]),
  user_id: z.coerce
    .number({
      invalid_type_error: "user_id must be a number.",
    })
    .int()
    .optional(),
});

export function UpdateContractForm(props: {
  contract: Contract;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.contract.name!,
      status: props.contract.status!,
      user_id: props.contract.user_id! ?? -1,
    },
  });
  async function onSubmit({
    name,
    status,
    user_id,
  }: z.infer<typeof formSchema>) {
    // TODO: insert id of authenticated user once its done
    fetch(
      `http://localhost:3000/customers/${2}/contracts/${props.contract.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status, user_id }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            variant: "success",
            title: "Success!",
            description: "Your contract has been updated.",
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Your update failed.",
        });
      })
      .finally(() => props.onOpenChange(false));
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
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserId</FormLabel>
                <FormControl>
                  <Input placeholder="user_id" type="number" {...field} />
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
