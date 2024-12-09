import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { ImageDataType, PinDataType, UserDataType } from "@/lib/types";
import { Comments } from "@/modules/pin/components/Comment";
import { CommentEditor } from "@/modules/pin/components/Comment/CommentInput";
import useQueryPinDetail from "@/modules/pin/components/PinDetail/querys";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import fileDownload from "js-file-download";

import embla from "./embla.module.css";
import { cn } from "@/lib/utils";
import { SavePinButton } from "@/components/SavePinButton";
import axios from "axios";
import PinMoreButtons from "@/modules/pin/components/PinDetail/PinMoreButtons";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import xss from "xss";
import PinsList from "@/modules/home/components/PinsList";

const handleDownloadImage = async (image: ImageDataType) => {
  const { data } = await axios.get(image.url, {
    responseType: "blob",
  });

  fileDownload(data, image.img_name);
};

export default function PinDetail() {
  const { pinId } = useParams();
  const denyFirstMount = useRef(true);

  if (!pinId) return <Navigate to="/" replace />;

  const { isLoading, data } = useQueryPinDetail({
    pinId: Number(pinId),
  });

  useEffect(() => {
    if (denyFirstMount.current) {
      denyFirstMount.current = false;
      return;
    }

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pinId]);
  return (
    <div className="space-y-6">
      <div className="">
        {/* Back Button */}
        <BackButton />

        {/* Loading */}
        {isLoading && (
          <Loader2 className="mx-auto size-10 animate-spin text-primary" />
        )}

        {/* Pin Detail Layout */}
        {data && (
          <div className="mx-auto mt-20 flex max-h-[80rem] max-w-[38rem] flex-col overflow-hidden rounded-md shadow-[rgba(0,0,0,0.1)_0px_1px_20px_0px] lg:max-h-[50rem] lg:max-w-[1000px] lg:flex-row">
            {/* Pin Images */}
            <PinImages pinData={data.data} />

            <div className="flex flex-1 flex-col gap-y-4 overflow-hidden bg-white p-4 lg:max-w-[50%]">
              {/* Header Buttons */}
              <HeaderButtons pinData={data.data} />

              {/* Content */}
              <div className="space-y-2 text-black">
                <h1 className="line-clamp-3 truncate whitespace-pre-line break-words text-2xl font-semibold">
                  {data.data.name}
                </h1>
                <article
                  dangerouslySetInnerHTML={{
                    __html: xss(data.data.description),
                  }}
                ></article>
              </div>

              {/* Author */}
              <Author userData={data.data.user} />

              {/* Comments */}
              <Comments />

              {/* Comment Input */}
              <CommentEditor />
            </div>
          </div>
        )}
      </div>

      {/* New Feed */}
      <h1 className="text-center text-xl font-semibold">
        Thêm nội dung để khám phá
      </h1>
      {/* Pin list */}
      <PinsList />
    </div>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-20 z-10 flex max-w-36 cursor-pointer items-center gap-2"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="size-8" />
      <h1 className="hidden text-center text-2xl md:block">Dành cho bạn</h1>
    </div>
  );
}

function Author({ userData }: { userData: UserDataType }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <UserAvatar
          username={userData.username}
          userAvatarUrl={userData.avatar}
        />
        <div className="text-black">
          <h3 className="text-sm font-medium">{userData.full_name}</h3>
          <p className="text-xs font-normal">@{userData.username}</p>
        </div>
      </div>
      <Button>Theo dõi</Button>
    </div>
  );
}

function HeaderButtons({ pinData }: { pinData: PinDataType }) {
  const { user } = useAppSelector(selectAuth);
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-4">
        <button
          className="size-10 rounded-full p-2 text-black hover:bg-gray-200"
          title="Download all"
          onClick={() => {
            pinData.image.map((image) => {
              handleDownloadImage(image);
            });
          }}
        >
          <Download className="size-full" />
        </button>
        {user?.id === pinData.user.id && <PinMoreButtons pinData={pinData} />}
      </div>

      {user && <SavePinButton pinData={pinData} />}

      {!user && <Button className="cursor-not-allowed">Lưu</Button>}
    </div>
  );
}

function PinImages({ pinData }: { pinData: PinDataType }) {
  const emblaOptions: EmblaOptionsType = {
    // loop: true,
  };

  const [emblaRef] = useEmblaCarousel(emblaOptions);
  return (
    <div className="flex w-full flex-1">
      <div className={cn(embla.embla)}>
        <div className={embla.embla__viewport} ref={emblaRef}>
          <div className={embla.embla__container}>
            {pinData.image.map((image) => (
              <div key={image.id} className={embla.embla__slide}>
                <div
                  className={cn("group/image relative size-full")}
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="grid h-full place-items-center bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%]">
                    <img
                      src={image.url}
                      alt=""
                      className="max-h-[40rem] w-full object-cover lg:max-h-[50rem]"
                    />
                  </div>

                  {/* Button Download Image */}
                  <Button
                    className="absolute left-10 top-10 bg-white text-black opacity-0 transition-opacity hover:bg-white/80 group-hover/image:opacity-100"
                    onClick={() => {
                      handleDownloadImage(image);
                    }}
                  >
                    Tải xuống
                  </Button>

                  {/* Button View Image */}
                  <a
                    target="_blank"
                    href={image.url}
                    className="absolute bottom-10 left-10 opacity-0 transition-opacity group-hover/image:opacity-100"
                  >
                    <Button className="bg-white text-black hover:bg-white/80">
                      Xem hình ảnh
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
