import { PinCreateValues } from '@/lib/validations';
import { EmblaOptionsType } from 'embla-carousel';
import { useDropzone } from 'react-dropzone';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowUpCircle } from 'lucide-react';
import embla from './embla.module.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { memo, useCallback } from 'react';

export default memo(function ImagesUpload({
  images,
  onImagesChange,
}: {
  images: PinCreateValues['images'];
  onImagesChange: (images: PinCreateValues['images']) => void;
}) {
  const emblaOptions: EmblaOptionsType = {
    // loop: true,
  };
  const [emblaRef] = useEmblaCarousel(emblaOptions);
  const onDrop = (acceptedFiles: File[]) => {
    onImagesChange(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024, //5MB
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  const handleResetImages = useCallback(() => {
    onImagesChange([]);
  }, [onImagesChange]);

  return (
    <div className="w-full space-y-4 text-center md:w-96">
      {/* Images upload trigger */}
      {images.length <= 0 && (
        <div
          className="bg-[#E9E9E9] h-[25rem]  rounded-lg flex items-center justify-center cursor-pointer"
          {...getRootProps()}
        >
          <div className="space-y-2 text-center">
            <ArrowUpCircle className="mx-auto text-black size-8" />

            <p className="text-black max-w-56">
              Chọn một tệp hoặc kéo thả tệp ở đây
            </p>
          </div>
        </div>
      )}
      {/* Images upload trigger */}

      {/* Images Preview */}
      {images.length > 0 && (
        <div className=" h-[25rem] rounded-lg overflow-hidden">
          <div className={cn('h-full', embla.embla)}>
            <div className={cn(embla.embla__viewport)} ref={emblaRef}>
              <div className={embla.embla__container}>
                {images.map((file) => {
                  const imgUrl = URL.createObjectURL(file);
                  return (
                    <div
                      className={cn(
                        'relative group/img-preview grid place-items-center',
                        embla.embla__slide
                      )}
                      key={file.size * Math.random()}
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="object-cover w-full"
                      />
                      {/* Overlay */}
                      <div className="absolute top-0 bottom-0 left-0 right-0 transition-opacity opacity-0 bg-black/50 group-hover/img-preview:opacity-100"></div>
                      <Button
                        className="absolute transition-opacity -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover/img-preview:opacity-100"
                        onClick={handleResetImages}
                      >
                        Reset
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images Preview */}

      <input type="file" multiple hidden {...getInputProps()} />

      <Separator />
      <Button variant="normal">Tải lên từ URL</Button>
    </div>
  );
});
