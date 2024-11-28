import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import { PinDataType, UserDataType } from '@/lib/types';
import { Pins } from '@/modules/home/components/Pin';
import { Comments } from '@/modules/pin/components/Comment';
import { CommentEditor } from '@/modules/pin/components/Comment/CommentInput';
import useQueryPinDetail from '@/modules/pin/components/PinDetail/querys';
import { ArrowLeft, Download, Ellipsis, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

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
      behavior: 'smooth',
    });
  }, [pinId]);
  return (
    <div className="space-y-6">
      <div className="">
        {/* Back Button */}
        <BackButton />

        {/* Loading */}
        {isLoading && (
          <Loader2 className="mx-auto animate-spin text-primary size-10" />
        )}

        {/* Pin Detail Layout */}
        {data && (
          <div className="flex flex-col lg:flex-row mx-auto overflow-hidden rounded-md shadow-[rgba(0,0,0,0.1)_0px_1px_20px_0px] max-w-[1000px] mt-20 max-h-[80rem] lg:max-h-[50rem]">
            {/* Pin Images */}
            <PinImages pinData={data.data} />

            <div className="flex-1 p-4 flex flex-col overflow-hidden gap-y-4 bg-white lg:max-w-[50%]">
              {/* Header Buttons */}
              <HeaderButtons />

              {/* Content */}
              <div className="space-y-2 text-black">
                <h1 className="text-2xl font-semibold break-words truncate whitespace-pre-line line-clamp-3">
                  {data.data.name}
                </h1>
                <article>{data.data.description}</article>
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
      <h1 className="text-xl font-semibold text-center">
        Thêm nội dung để khám phá
      </h1>
      {/* Pin list */}
      <Pins />
    </div>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute z-10 flex items-center gap-2 cursor-pointer top-20 max-w-36"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="size-8" />
      <h1 className="hidden text-2xl text-center md:block">Dành cho bạn</h1>
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

function HeaderButtons() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-x-4">
        <button className="p-2 text-black rounded-full size-10 hover:bg-gray-200">
          <Download className="size-full" />
        </button>
        <button className="p-2 text-black rounded-full size-10 hover:bg-gray-200">
          <Ellipsis className="size-full" />
        </button>
      </div>

      <Button className="">Lưu</Button>
    </div>
  );
}

function PinImages({ pinData }: { pinData: PinDataType }) {
  return (
    <div
      className="flex-1 w-full"
      style={{
        backgroundImage: `url(${pinData.image[0].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] h-full  grid place-items-center ">
        <img
          src={pinData.image[0].url}
          alt=""
          className=" object-cover w-full max-h-[40rem] lg:max-h-[50rem]"
        />
      </div>
    </div>
  );
}
