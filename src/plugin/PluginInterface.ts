interface PluginInterface {
    parse(rulesText: string, styleObject: CSSStyleSheet, styles: Array<CSSStyleSheet>): string;
}

export default PluginInterface;
