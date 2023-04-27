import IBackdrop from "../models/IBackdrop";
import ILogo from "../models/ILogo";
import IPoster from "../models/IPoster";

export default interface PostersDto {
  id: number;
  posters: IPoster[];
  logos: ILogo[];
  backdrops: IBackdrop[];
}
