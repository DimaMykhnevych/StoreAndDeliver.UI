export interface MapMarker {
  latitude: number;
  longtitude: number;
  labelOptions: LabelOptions;
}

export interface LabelOptions {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}
