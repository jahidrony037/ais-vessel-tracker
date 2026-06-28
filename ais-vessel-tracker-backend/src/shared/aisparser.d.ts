// Type declaration for aisparser
declare module "aisparser" {
  export interface AisMessage {
    _valid: "VALID" | "INVALID" | "UNSUPPORTED";
    _errMsg: string;
    _aisType: number;
    _channel: string;

    aisType?: number;
    mmsi?: number;
    latitude?: number;
    longitude?: number;
    sog?: number;
    cog?: number;
    heading?: number;
    navStatus?: number;

    name?: string;
    shipType?: number;
    callSign?: string;
    destination?: string;
    dimToBow?: number;
    dimToStern?: number;
    dimToPort?: number;
    dimToStarboard?: number;
  }

  class AisParser {
    constructor(options?: { checksum?: boolean });
    parse(sentence: string): AisMessage;
  }

  export default AisParser;
}
