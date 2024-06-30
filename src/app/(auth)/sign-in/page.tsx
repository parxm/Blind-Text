import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import * as z from "zod";

const page = () => {
  const [username, setusername] = useState("");
  const [usernamemessage, setusernamemessage] = useState("");
  const [ischeckingusername, setischeckingusername] = useState(false);
  const [issubmitting, setissubmitting] = useState(false);

  const debouncedUsername = useDebounceValue(username, 300);

  const { toast } = useToast();
  const router = useRouter();

  //zod implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkusernameUnique = async () => {
      if (debouncedUsername) {
        setischeckingusername(true);
        setusernamemessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setusernamemessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setusernamemessage(
            axiosError.response?.data.message ?? "Error Checking Username"
          );
        } finally {
          setischeckingusername(false);
        }
      }
    };
    checkusernameUnique();
  }, [debouncedUsername]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setissubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
      setissubmitting(false);
    } catch (error) {
      console.error("Error in Signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "sign-up failed",
        description: errorMessage,
        variant: "destructive",
      });
      setissubmitting(false);
    }
  };

  return <div>page</div>;
};

export default page;
