import ICast from "../models/ICast";
import ICrew from "../models/ICrew";

export default interface CastsDto {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}
