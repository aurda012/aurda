export type CustomCircleChartSingleData = {
  value: number;
  label: string;
};

export type CustomCircleChartDataType =
  | [CustomCircleChartSingleData]
  | [CustomCircleChartSingleData, CustomCircleChartSingleData]
  | [
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
    ]
  | [
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
    ]
  | [
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
      CustomCircleChartSingleData,
    ];

export type CircleTextType = 'percentage' | 'value';
export type NthType = 1 | 2 | 3 | 4 | 5;

export const COLORS = {
  CYAN: '#477DFF',
  VIOLET: '#6741D9',
  PINK: '#FF7272',
  ORANGE: '#FFBC75',
  BLUE: '#4A3AFF',
};

const colorsArray = Object.values(COLORS);

export function getCircleStyles(
  nth: NthType,
  dataLen: number,
  direction: string
) {
  const isLtr = direction === 'ltr';
  switch (dataLen) {
    case 1:
      return {
        top: '50%',
        insetInlineStart: '50%',
        transform: isLtr ? 'translate(-50%,-50%)' : 'translate(50%,-50%)',
        fontSize: '36px',
        backgroundColor: colorsArray[nth - 1],
      };
    case 2:
      if (nth === 1) {
        return {
          bottom: '0',
          insetInlineStart: 0,
          fontSize: '36px',
          backgroundColor: colorsArray[nth - 1],
        };
      } else {
        return {
          top: 0,
          insetInlineEnd: 0,
          fontSize: '18px',
          backgroundColor: colorsArray[nth - 1],
        };
      }
    case 3:
      if (nth === 1) {
        return {
          bottom: '0',
          insetInlineStart: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '18px',
        };
      } else if (nth === 2) {
        return {
          top: 0,
          insetInlineEnd: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '18px',
        };
      } else {
        return {
          bottom: '5%',
          insetInlineEnd: '13.5%',
          backgroundColor: colorsArray[nth - 1],
          fontSize: '18px',
        };
      }
    case 4:
      switch (nth) {
        case 1:
          return {
            top: 0,
            insetInlineStart: 0,
            backgroundColor: colorsArray[nth - 1],
            fontSize: '24px',
          };
        case 2:
          return {
            bottom: 0,
            insetInlineEnd: 0,
            backgroundColor: colorsArray[nth - 1],
            fontSize: '20px',
          };
        case 3:
          return {
            top: 0,
            insetInlineEnd: 0,
            backgroundColor: colorsArray[nth - 1],
            fontSize: '18px',
          };
        case 4:
          return {
            bottom: 0,
            insetInlineStart: 0,
            backgroundColor: colorsArray[nth - 1],
          };
        default:
          break;
      }
    default:
      if (nth === 1) {
        return {
          top: 0,
          insetInlineStart: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '24px',
        };
      } else if (nth === 2) {
        return {
          bottom: 0,
          insetInlineEnd: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '20px',
        };
      } else if (nth === 3) {
        return {
          top: 0,
          insetInlineEnd: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '18px',
        };
      } else if (nth === 4) {
        return {
          bottom: 0,
          insetInlineStart: 0,
          backgroundColor: colorsArray[nth - 1],
          fontSize: '16px',
        };
      } else {
        return {
          top: '50%',
          insetInlineEnd: '50%',
          transform: 'translate(50%,-50%)',
          backgroundColor: colorsArray[nth - 1],
          fontSize: '12px',
        };
      }
  }
}
