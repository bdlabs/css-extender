import StylesProvider from "./StylesProvider";
import CssExtendModule from "./CssExtendModule";
// import CssAliasParser from "./plugin/CssAliasParser";
// import CssExtendParser from "./plugin/CssExtendParser";
import CssAliasesParser from "./plugin/CssAliasesParser";

const cssExtendModule = new CssExtendModule(new StylesProvider());
// cssExtendModule.addPlugin(new CssAliasParser());
// cssExtendModule.addPlugin(new CssExtendParser());
cssExtendModule.addPlugin(new CssAliasesParser());
//cssExtendModule.run();

export default cssExtendModule;
