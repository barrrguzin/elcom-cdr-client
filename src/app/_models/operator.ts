import {ModuleTDM} from "./module-tdm";

export interface Operator {
  id: number | null;
  name: string;
  lines: ModuleTDM[];
  inputDestination: number;
  outputDestination: number;
}
