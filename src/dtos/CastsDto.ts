import ICast from "../models/ICast";
import ICrew from "../models/ICrew";

export default interface CastsDto {
  id: number;
  casts: ICast[];
  crew: ICrew[];
}
