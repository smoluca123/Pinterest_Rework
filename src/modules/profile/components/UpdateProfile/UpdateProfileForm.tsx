import PasswordInput from "@/components/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserDataType } from "@/lib/types";
import { profileUpdateSchema, ProfileUpdateValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForwardedRef, forwardRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

export default forwardRef(function UpdateProfileForm(
  {
    userData,
    onSubmit,
  }: {
    onSubmit: ({
      values,
    }: {
      values: ProfileUpdateValues;
      form: UseFormReturn<ProfileUpdateValues, any, undefined>;
    }) => void;
    userData: UserDataType;
  },
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const defaultValues = {
    username: userData.username,
    email: userData.email,
    fullName: userData.full_name,
    age: userData.age,
    password: "",
  };

  const form = useForm<ProfileUpdateValues>({
    defaultValues,
    resolver: zodResolver(profileUpdateSchema),
    mode: "onTouched",
  });

  const handleSubmit = (values: ProfileUpdateValues) => {
    onSubmit({ values: { ...values, username: userData.username }, form });
  };

  return (
    <div>
      <Form {...form}>
        {/* Form fields */}
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                <FormLabel>Password (Bỏ trống nếu không đổi)</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button ref={ref} type="submit"></button>
        </form>
      </Form>
    </div>
  );
});
