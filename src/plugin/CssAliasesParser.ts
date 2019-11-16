/**
 * @aliases() {
 *      .moje-wyniki: "row";
 *      .moje-wyniki--record: "col-12 col-sm-6 col-lg-3 mx-md-n5";
 *      .moje-wyniki--record2: "col-12 col-sm-6 col-lg-3 mx-md-n5";
 * }
 */
import PluginInterface from "./PluginInterface";

export default class CssAliasesParser implements PluginInterface {
    /**
     * @param rulesText
     * @param _styleObject
     * @param _styles
     */
    parse(rulesText: string, _styleObject: CSSStyleSheet, _styles: Array<CSSStyleSheet>): string {
        const extendRule = this.extendRulePrepare();
        const rules: Array<any> = [...rulesText.matchAll(extendRule)];
        const aliasesList = this.getAllAliases(rules);
        this.setAllAliasesInDom(aliasesList);

        return rulesText;
    }

    private getAllAliases(rules: Array<any>): Array<any> {
        let aliasesList: Array<any> = new Array<any>();

        rules.forEach((rule: any) => {
            const aliasesContent: string = rule[1];
            aliasesList.push([...aliasesContent.matchAll(this.aliasesRulePrepare())]);
        });

        return aliasesList;
    }

    private setAllAliasesInDom(aliasesList: Array<any>) {
        aliasesList.forEach((aliases: Array<any>) => {
            this.setAliasesInDom(aliases);
        });
    }

    private setAliasesInDom(aliases: Array<any>) {
        aliases.forEach((alias: Array<any>) => {
            const className: string = alias[1];
            const value: string = alias[2];
            const objects: NodeListOf<any> = document.querySelectorAll<any>(className);
            objects.forEach((object: any) => {
                // object.classList.remove(className.replace('.', ''));
                object.classList.add(...value.split(' ').map((className: string) => className.trim()));
            });
        })
    }

    private extendRulePrepare(): RegExp {
        const classRule = this.getRegexRule(this.getClassRuleChars());
        const classesRule = this.getRegexRule(this.getClassesRuleChars());

        return new RegExp(`@aliases\\s*\\(\s*\\)\\s*{((\\s*${classRule}+\\s*:\\s*"\\s*${classesRule}+\\s*"\\s*;\\s*)*)}`, 'gmi');
    }

    private aliasesRulePrepare(): RegExp {
        const classRule = this.getRegexRule(this.getClassRuleChars());

        return new RegExp(`(${classRule}+)\\s*:\\s*"\\s*([^"]+)\\s*"\\s*;`, 'gmi');
    }

    private getClassRuleChars = (): string => '\\.\\-_a-zA-Z0-9\\:\\(\\)\\+';

    private getClassesRuleChars(): string {
        return this.getClassRuleChars() + ' ';
    }

    private getRegexRule = (charsRule: string): string => `[${charsRule}]`;
}
