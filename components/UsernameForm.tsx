import useUserStore from "@/hooks/useUserStore";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface UsernameFormData {
  username: string;
}

const UsernameForm = () => {
  const { setUsername } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UsernameFormData>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: UsernameFormData) => {
    setUsername(data.username);
    console.log("Username saved:", data.username);
    reset();
  };

  return (
    <Card className="w-md">
      <CardHeader>Set your Username</CardHeader>
      <CardContent>
        <form id="username" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be less than 20 characters",
                  },
                })}
                placeholder="Enter your Username"
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button form="username" type="submit">
          Submit
        </Button>
        <Button onClick={() => reset()} variant="destructive">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UsernameForm;
