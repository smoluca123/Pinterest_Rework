import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import PinSkeleton, { randomHeight } from '@/components/PinSkeleton';
import PinItem from '@/modules/home/components/Pin/PinItem';
import { useQueryPins } from '@/modules/home/components/Pin/querys';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
// import Masonry from '@/components/Masonry';

const itemsLenght = 10;

const emptyArrayItemLenghts = Array.from({ length: itemsLenght });

// const randomHeightsSkeleton = emptyArrayItemLenghts.map(() => randomHeight());
export default function Pins() {
  const { data, isFetching, fetchNextPage, hasNextPage } = useQueryPins();

  return (
    <InfiniteScrollContainer
      isShowInViewElement={hasNextPage}
      onBottomReached={fetchNextPage}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 6 }}>
        <Masonry gutter="20px">
          {/* Render data */}
          {data &&
            data.pages.map((page) =>
              page.items.map((pin) => <PinItem key={pin.id} pinData={pin} />)
            )}

          {/* Loading */}
          {isFetching &&
            emptyArrayItemLenghts.map((_, i) => (
              <PinSkeleton
                key={new Date().getTime() + i}
                height={randomHeight()}
              />
            ))}
        </Masonry>
      </ResponsiveMasonry>

      {!hasNextPage && (
        <p className="my-10 font-normal text-center text-muted-foreground ">
          No more pins to load!
        </p>
      )}
    </InfiniteScrollContainer>
  );
}
