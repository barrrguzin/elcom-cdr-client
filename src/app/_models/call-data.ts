import {ModuleTDM} from "./module-tdm";
import {DatePipe} from "@angular/common";
import {Operator} from "./operator";

export interface CallData {
  id: number;
  sourceModule: ModuleTDM;
  destinationModule: ModuleTDM;
  callStartDate: Date;
  callDurationSeconds: number;
  numberA: string;
  numberB: string;
  connectionType: number;
  callDurationMinutes: number;
  inputDestinationNumber: number;
  outputDestinationNumber: number;
  ssCode: number;
  callingNumberCategory: number;
  callDurationMinutesAndSeconds: string;
  fromOperator: Operator;
  toOperator: Operator;
}
