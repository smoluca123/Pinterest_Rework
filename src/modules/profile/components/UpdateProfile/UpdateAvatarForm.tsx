import Dropzone from "react-dropzone";
import Cropper from "react-easy-crop";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { coppedAreaType, UserDataType } from "@/lib/types";
import { blobToFile, getCroppedImg } from "@/lib/utils";
import { UseMutateFunction } from "@tanstack/react-query";

interface IProps {
  userData: UserDataType;
  onSubmit: UseMutateFunction<
    UserDataType,
    Error,
    {
      userId: number;
      avatarFile: File;
    },
    unknown
  >;
}

export default forwardRef(function UpdateAvatarForm(
  { userData, onSubmit }: IProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | undefined>(userData.avatar);
  const imageUrl = useRef<string>();
  const croppedImageBlob = useRef<Blob>();

  const onCropComplete = async (
    _: coppedAreaType,
    croppedAreaPixels: coppedAreaType,
  ) => {
    try {
      const blob = await getCroppedImg({
        imageSrc: image || "",
        croppedAreaPixels,
      });
      croppedImageBlob.current = blob;
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    URL.revokeObjectURL(imageUrl.current || "");
    imageUrl.current = URL.createObjectURL(acceptedFiles[0]);
    // Read the file and convert it to a data URL
    setImage(imageUrl.current);
  };

  const handleUpdateProfile = async () => {
    if (!croppedImageBlob.current) return;
    const avatarFile = blobToFile(croppedImageBlob.current);
    onSubmit({
      userId: userData.id,
      avatarFile: avatarFile,
    });
  };

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        accept={{
          "image/*": [],
        }}
        noClick
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="relative h-[500px] w-auto">
            <Cropper
              //   classes={{
              //     mediaClassName: "!my-0  object-cover",
              //     cropAreaClassName: "",
              //   }}
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round" // Crop hình tròn
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <button ref={ref} onClick={handleUpdateProfile} hidden></button>
    </div>
  );
});
