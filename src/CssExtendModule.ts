import StylesProvider from "./StylesProvider";
import PluginInterface from "./plugin/PluginInterface";

export default class CssExtendModule {

    private plugins: Array<PluginInterface> = new Array<PluginInterface>();

    constructor(private stylesProvider: StylesProvider) {
    }

    public addPlugin(plugin: PluginInterface) {
        this.plugins.push(plugin);
    }

    public run() {
        const styles: Array<CSSStyleSheet> = Array<any>(...this.stylesProvider.styles());
        styles.forEach((styleObject: CSSStyleSheet) => {
            const ownerNode: Node = styleObject.ownerNode;
            let rulesText: string = <string>ownerNode.textContent;
            this.plugins.forEach((plugin: PluginInterface) => rulesText = plugin.parse(rulesText, styleObject, styles));
            ownerNode.textContent = rulesText;
        });
    }
}
