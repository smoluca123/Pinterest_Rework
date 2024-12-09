import LoadingButton from '@/components/LoadingButton';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PropsWithClassName } from '@/lib/types';
import { cn } from '@/lib/utils';
import { pinCreateSchema, PinCreateValues } from '@/lib/validations';
import ImagesUpload from '@/modules/pin-create/components/ImagesUpload';
import { usePinCreateMutation } from '@/modules/pin-create/components/mutations';

import PinDescriptionEditor from '@/modules/pin-create/components/PinDescriptionEditor/PinDescriptionEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

export default function PinCreateForm({ className }: PropsWithClassName) {
  const { toast } = useToast();
  const form = useForm<PinCreateValues>({
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      images: [],
    },
    resolver: zodResolver(pinCreateSchema),
    mode: 'onTouched',
  });

  const { mutate, isPending } = usePinCreateMutation();

  const handleCreatePin = (values: PinCreateValues) => {
    mutate(
      { payload: values },
      {
        onSuccess: () => {
          // Reset form values after successful pin creation
          form.reset();

          //Toast success message
          toast({
            title: 'Thành công!',
            description: 'Bài viết đã được tạo thành công',
            duration: 3000,
          });
        },
      }
    );
  };

  const handleImagesChange = useCallback(
    (images: File[]) => {
      form.setValue('images', images);
    },
    [form]
  );

  useEffect(() => {
    form.setValue(
      'slug',
      slugify(form.getValues().name, {
        lower: true,
      })
    );
  }, [form.watch('name')]);

  return (
    <div
      className={cn(
        'flex justify-center flex-col md:flex-row gap-8 max-w-[30rem] md:max-w-[50rem] mx-auto',
        className
      )}
    >
      {/* Form components */}

      {/* Images Upload */}
      <ImagesUpload
        images={form.watch('images')}
        onImagesChange={handleImagesChange}
      />

      {/* Form Input */}
      <div className="flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreatePin)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Cô gái m52" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Tiêu đề của Pin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pin Editor */}
            <PinDescriptionEditor form={form} />
            {/* Pin Editor */}

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bí danh</FormLabel>
                  <FormControl>
                    <Input placeholder="co-gai-m52" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Bí danh url của Pin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={isPending}
              className="w-full"
              type="submit"
            >
              Tạo
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
