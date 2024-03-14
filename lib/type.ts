export type Terminal = {
    name: string;
    details: string;
    passengers_rate: {
      passengers_num: number;
      interval_sec: number;
    };
};