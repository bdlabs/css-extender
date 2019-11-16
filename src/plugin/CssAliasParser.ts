/**
 * .m2oje-wyniki { @as "row"; }
 * .m2oje-wyniki--record { @as "col-12 col-sm-6 col-lg-3 mx-md-n5"; }
 * .moje-wyniki--record {
 *      background: yellowgreen;
 * }
 */
import PluginInterface from "./PluginInterface";

export default class CssAliasParser implements PluginInterface {

    private styles: Array<CSSStyleSheet> = new Array<CSSStyleSheet>();

    /**
     * @param rulesText
     * @param _styleObject
     * @param _styles
     */
    parse(rulesText: string, _styleObject: CSSStyleSheet, _styles: Array<CSSStyleSheet>): string {
        const extendRule = this.extendRulePrepare();
        const rules: Array<any> = [...rulesText.matchAll(extendRule)];

        rules.forEach((rule: any) => {
                const className: string = rule[1];
                const lassesList: string = rule[2];
                const objects: NodeListOf<any> = document.querySelectorAll<any>(className);
                objects.forEach((object: any) => {
                    // object.classList.remove(className.replace('.', ''));
                    object.classList.add(...lassesList.split(' ').map((className: string) => className.trim()));
                });
            }
        );

        return rulesText;
    }

    private extendRulePrepare(): RegExp {
        const classRule = this.getRegexRule(this.getClassRuleChars());
        const classesRule = this.getRegexRule(this.getClassesRuleChars());

        return new RegExp(`(${classRule}+)\\s*{\\s*@as\\s+"\\s*(${classesRule}+)\\s*"\\s*;\\s*}`, 'gmi');
    }

    private getClassRuleChars = () => '\\.\\-_a-zA-Z0-9\\:\\(\\)\\+';

    private getClassesRuleChars() {
        return this.getClassRuleChars() + ' ';
    }

    private getRegexRule = (charsRule: string): string => `[${charsRule}]`;
}
