// import PropTypes from 'prop-types';
// import React, { useState, useEffect, useCallback } from 'react';

// const Masonry = ({
//   children,
//   columnsCount,
//   gutter,
//   className,
//   style,
//   containerTag,
//   itemTag,
//   itemStyle,
//   sequential,
// }) => {
//   const getEqualCountColumns = useCallback((children, columnsCount) => {
//     const columns = Array.from({ length: columnsCount }, () => []);
//     let validIndex = 0;
//     const childRefs = [];

//     React.Children.forEach(children, (child) => {
//       if (child && React.isValidElement(child)) {
//         const ref = React.createRef();
//         childRefs.push(ref);
//         columns[validIndex % columnsCount].push(
//           <div
//             style={{ display: 'flex', justifyContent: 'stretch' }}
//             key={validIndex}
//             ref={ref}
//           >
//             {child}
//           </div>
//         );
//         validIndex++;
//       }
//     });
//     return { columns, childRefs };
//   }, []);

//   const [state, setState] = useState(() => ({
//     ...getEqualCountColumns(children, columnsCount),
//     children,
//     hasDistributed: false,
//   }));

//   const distributeChildren = useCallback(() => {
//     const columnHeights = Array(columnsCount).fill(0);

//     const isReady = state.childRefs.every(
//       (ref) => ref.current.getBoundingClientRect().height
//     );

//     if (!isReady) return;

//     const columns = Array.from({ length: columnsCount }, () => []);
//     let validIndex = 0;

//     React.Children.forEach(children, (child) => {
//       if (child && React.isValidElement(child)) {
//         const childHeight =
//           state.childRefs[validIndex].current.getBoundingClientRect().height;
//         const minHeightColumnIndex = columnHeights.indexOf(
//           Math.min(...columnHeights)
//         );
//         columnHeights[minHeightColumnIndex] += childHeight;
//         columns[minHeightColumnIndex].push(child);
//         validIndex++;
//       }
//     });

//     setState((prev) => ({ ...prev, columns, hasDistributed: true }));
//   }, [children, columnsCount, state.childRefs]);

//   useEffect(() => {
//     if (!state.hasDistributed && !sequential) {
//       distributeChildren();
//     }
//   }, [state.hasDistributed, sequential, distributeChildren]);

//   useEffect(() => {
//     if (children !== state.children) {
//       setState((prev) => ({
//         ...getEqualCountColumns(children, columnsCount),
//         children,
//         hasDistributed: false,
//       }));
//     }
//   }, [children, columnsCount, getEqualCountColumns]);

//   const renderColumns = () => {
//     return state.columns.map((column, i) =>
//       React.createElement(
//         itemTag,
//         {
//           key: i,
//           style: {
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'flex-start',
//             alignContent: 'stretch',
//             flex: 1,
//             width: 0,
//             gap: gutter,
//             ...itemStyle,
//           },
//         },
//         column.map((item) => item)
//       )
//     );
//   };

//   return React.createElement(
//     containerTag,
//     {
//       style: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignContent: 'stretch',
//         boxSizing: 'border-box',
//         width: '100%',
//         gap: gutter,
//         ...style,
//       },
//       className,
//     },
//     renderColumns()
//   );
// };

// Masonry.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
//   columnsCount: PropTypes.number,
//   gutter: PropTypes.string,
//   className: PropTypes.string,
//   style: PropTypes.object,
//   containerTag: PropTypes.string,
//   itemTag: PropTypes.string,
//   itemStyle: PropTypes.object,
//   sequential: PropTypes.bool,
// };

// Masonry.defaultProps = {
//   columnsCount: 3,
//   gutter: '0',
//   className: null,
//   style: {},
//   containerTag: 'div',
//   itemTag: 'div',
//   itemStyle: {},
//   sequential: false,
// };

// export default Masonry;

import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
} from 'react';

interface MasonryProps {
  children: ReactNode;
  columnsCount?: number;
  gutter?: string;
  className?: string;
  style?: React.CSSProperties;
  containerTag?: keyof JSX.IntrinsicElements;
  itemTag?: keyof JSX.IntrinsicElements;
  itemStyle?: React.CSSProperties;
  sequential?: boolean;
}

interface ColumnState {
  columns: ReactElement[][];
  childRefs: React.RefObject<HTMLDivElement>[];
  children: ReactNode;
  hasDistributed: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  children,
  columnsCount = 3,
  gutter = '0',
  className = null,
  style = {},
  containerTag = 'div',
  itemTag = 'div',
  itemStyle = {},
  sequential = false,
}) => {
  const getEqualCountColumns = useCallback(
    (children: ReactNode, columnsCount: number) => {
      const columns: ReactElement[][] = Array.from(
        { length: columnsCount },
        () => []
      );
      let validIndex = 0;
      const childRefs: React.RefObject<HTMLDivElement>[] = [];

      React.Children.forEach(children, (child) => {
        if (child && React.isValidElement(child)) {
          const ref = React.createRef<HTMLDivElement>();
          childRefs.push(ref);
          columns[validIndex % columnsCount].push(
            <div
              style={{ display: 'flex', justifyContent: 'stretch' }}
              key={validIndex}
              ref={ref}
            >
              {child}
            </div>
          );
          validIndex++;
        }
      });
      return { columns, childRefs };
    },
    []
  );

  const [state, setState] = useState<ColumnState>(() => ({
    ...getEqualCountColumns(children, columnsCount),
    children,
    hasDistributed: false,
  }));

  const distributeChildren = useCallback(() => {
    const columnHeights = Array(columnsCount).fill(0);

    const isReady = state.childRefs.every(
      (ref) => ref.current?.getBoundingClientRect().height
    );

    if (!isReady) return;

    const columns: ReactElement[][] = Array.from(
      { length: columnsCount },
      () => []
    );
    let validIndex = 0;

    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        const childHeight =
          state.childRefs[validIndex].current?.getBoundingClientRect().height ||
          0;
        const minHeightColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        );
        columnHeights[minHeightColumnIndex] += childHeight;
        columns[minHeightColumnIndex].push(child);
        validIndex++;
      }
    });

    setState((prev) => ({ ...prev, columns, hasDistributed: true }));
  }, [children, columnsCount, state.childRefs]);

  useEffect(() => {
    if (!state.hasDistributed && !sequential) {
      distributeChildren();
    }
  }, [state.hasDistributed, sequential, distributeChildren]);

  useEffect(() => {
    if (children !== state.children) {
      setState({
        ...getEqualCountColumns(children, columnsCount),
        children,
        hasDistributed: false,
      });
    }
  }, [children, columnsCount, getEqualCountColumns]);

  const renderColumns = () => {
    return state.columns.map((column, i) =>
      React.createElement(
        itemTag,
        {
          key: i,
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'stretch',
            flex: 1,
            width: 0,
            gap: gutter,
            ...itemStyle,
          },
        },
        column.map((item) => item)
      )
    );
  };

  return React.createElement(
    containerTag,
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'stretch',
        boxSizing: 'border-box',
        width: '100%',
        gap: gutter,
        ...style,
      },
      className,
    },
    renderColumns()
  );
};

export default Masonry;
