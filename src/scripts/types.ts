// third-party types
import {number, NumberSchema, SchemaOf, string, StringSchema} from "yup";
import {RequiredStringSchema} from "yup/es/string";
import {OptionalObjectSchema} from "yup/es/object";
import {RequiredNumberSchema} from "yup/es/number";
import {AnyObject} from "yup/es/types";

export interface IMatchPagesUrl {
  [namePath: string]: {
    pathname: string,
    possibleSearchValue?: {
      [searchName: string]: string
    },
    possibleHashValue?: {
      [searchName: string]: string
    }
  }
}

/*
* char - some one character;
*
* speedArr - speedArr values typing of this character(x);
*
* example: {char: "a", speedArr: [250]}
* */
export interface IDataStatisticSpeed {
  char: string,
  speedArr?: number[]
  accuracyArr: number[]
}
export interface IAdditionalDataStatistic {
  char: string,
  speed?: number,
  accuracy: number
}
export interface IAverageDataStatistic {
  char: string,
  speed: number,
  accuracy: number,
  totalNumber: number,
  countMistakes: number
}

export interface IDataStatistic {
  [timestamp: string]: IAverageDataStatistic[]
}


export interface IResponseStatistic {
  [timestamp: string]: {
    text: string,
    statistic: IAverageDataStatistic[]
  }
}

export interface IStatisticWithText {
  text: string,
  statistic: IAverageDataStatistic[]
}

export interface IDataPasswordConfirmation {
  password: string,
  repeatPassword: string
}

export interface IDataMainData {
  name: string,
  email: string
}

export interface IDataLogin {
  email: string,
  password: string
}

export interface IDataRegister {
  name: string,
  email: string,
  password: string
}

export interface IDataRecover__stageEmail {
  email: string
}
export interface IDataRecover__stageCode {
  email: string,
  code: string
}
export interface IDataRecover__stagePassword {
  email: string,
  code: string,
  password: string,
  "repeat-password": string
}

export interface IDataErrors {
  name?: string,
  email?: string,
  password?: string,
  "repeat-password"?: string
}

export interface IBackendUrls {
  login: string,
  register: string,
  refreshToken: string,
  logout: string,
  authenticate: string,
  recover: {
    stageEmail: string,
    stageCode: string,
    stagePassword: string
  },
  resetProgress: string,
  deleteAccount: string,
  changePassword: string,
  changeMainData: string,
  statistic: string
}

export interface ITabMatchTriggerContent {
  containers: {
    common?: HTMLElement,
    trigger: string,
    content: string
  },
  mainSelectors: {
  trigger: string,
  content: string,
  },
  activeClass: {
    trigger: string,
    content: string
  },
  matchesDatasetId: {
    trigger: number,
    content: number
  }[],
  defaultActiveDatasetId: number
}

export type TNameMainSchemas = "name" | "email" | "password" | "temporaryCode" | "trainingOwnChars";
export type TNameComplexSchemas = "signIn" | "register" | "passwordConfirmation" | "changeMainData" | "email" | "temporaryCode" | "trainingOwnChars";

export type TMainSchemas = {
  [nameSchema in TNameMainSchemas]: SchemaOf<string | number>
};
export type TComplexSchemas = {
  [nameSchema in TNameComplexSchemas]: any
}