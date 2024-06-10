import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useTheme } from '@/components/ui/themeProvider';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ErrResponse {
  response: {
    data: {
      message: string;
    };
  };
}

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setToken } = useTheme();

  const formSchema = z.object({
    email: z
      .string()
      .min(4, { message: 'Email must be at least 4 characters.' })
      .email('Invalid email address'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('https://test.globalmove.uz/api/auth/admin/signin', values);
      const token = response.data.data;
      setToken(token);
    } catch (error) {
      const err = error as ErrResponse;
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page grid place-items-center min-h-[100vh] w-full">
      <div className="login-block w-96 border border-current rounded-xl p-7">
        <h1 className="font-bold text-3xl mb-5">
          Welcome to UzChess <br /> Platform
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <span className="text-sm mt-1 text-red-500">{errorMessage}</span>}
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait ...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
