import { MODEL_VERSION, PS_getChildItems, AnalyzingXSD, getKEYS, KeyMode, compareKEYS } from "./functions.ts";
// import { bgBlue, bgGreen, bgRed, white } from "@std/fmt/colors";

const pathModel = MODEL_VERSION.processValidate;
PS_getChildItems(pathModel.dir);

const pDTD = JSON.parse(Deno.readTextFileSync(pathModel.xsd.dtd));
const pRNG = JSON.parse(Deno.readTextFileSync(pathModel.xsd.rng));

type tDTD = typeof pDTD;
type tRNG = typeof pRNG;

const parseModel: { dtd: tDTD; rng: tRNG; } = {
    dtd: pDTD,
    rng: pRNG
};

const XSD = new AnalyzingXSD<tDTD, tRNG>(parseModel);

//console.log(new Set(Array.from(Object.keys(XSD.DTD)).sort((a, b) =>
  //  a.localeCompare(b, undefined, { numeric: true }))));
//
//console.log(getKEYS(KeyMode.WithChildCount, XSD.DTD, `XSD.DTD`));
//console.log(getKEYS(KeyMode.WithChildCount, XSD.RNG, `XSD.RNG`));
compareKEYS(KeyMode.WithoutChildCount,{
  xsdDTD: getKEYS(KeyMode.WithoutChildCount, XSD.DTD),
  xsdRNG: getKEYS(KeyMode.WithoutChildCount, XSD.RNG)
});
compareKEYS(KeyMode.WithChildCount,{
  xsdDTD: getKEYS(KeyMode.WithoutChildCount, XSD.DTD),
  xsdRNG: getKEYS(KeyMode.WithoutChildCount, XSD.RNG)
});
//console.log(getKEYS(KeyMode.WithoutChildCount, XSD.DTD));
//console.log(getKEYS(KeyMode.WithChildCount, XSD.DTD, `XSD.DTD`));
//console.log(getKEYS(KeyMode.WithChildCount, XSD.DTD));
//console.log(getKEYS(XSD.RNG, `XSD.RNG`));

//getKEYSCount(XSD.DTD, `XSD.DTD`);

