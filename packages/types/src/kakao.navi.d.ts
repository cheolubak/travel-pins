declare namespace Kakao {
  namespace Navi {
    type VehicleType =
      | 1  // 1st car
      | 2  // 2nd car
      | 3  // 3rd car
      | 4  // 4th car
      | 5  // 5th car
      | 6  // 6th car
      | 7; // 7th car

    type RouteOption =
      | 1  // fastest
      | 2  // free roads
      | 3  // shortest
      | 4  // no motorway
      | 5  // priority road
      | 6  // normal
      | 8; // recommended

    interface ViaPoint {
      name: string;
      x: number;
      y: number;
    }

    interface NaviLocation {
      name: string;
      x: number;
      y: number;
    }

    interface NaviStartSettings {
      name: string;
      x: number;
      y: number;
      coordType?: 'wgs84' | 'katec';
      vehicleType?: VehicleType;
      rpOption?: RouteOption;
      routeInfo?: boolean;
      sX?: number;
      sY?: number;
      sAngle?: number;
      returnUri?: string;
      viaPoints?: ViaPoint[];
    }

    interface NaviShareSettings {
      name: string;
      x: number;
      y: number;
      coordType?: 'wgs84' | 'katec';
    }

    /** Start navigation to the destination */
    function start(settings: NaviStartSettings): void;

    /** Share destination via KakaoNavi */
    function share(settings: NaviShareSettings): void;
  }
}
