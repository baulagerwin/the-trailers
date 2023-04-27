import IVideo from "../models/IVideo";

export default interface VideosDto {
  id: number;
  results: IVideo[];
}
