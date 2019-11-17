import PluginInterface from "./PluginInterface";

export default class CssExtendParser implements PluginInterface {

    private styles: Array<CSSStyleSheet> = new Array<CSSStyleSheet>();

    parse(rulesText: string, styleObject: CSSStyleSheet, styles: Array<CSSStyleSheet>): string {
        this.styles = styles;
        const extendRule = this.extendRulePrepare();
        const rules: Array<any> = [...rulesText.matchAll(extendRule)];
        rules.forEach((rule: Array<string>) => {
            let newRule = this.getNewRule(styleObject, rule);
            rulesText = rulesText.replace(rule[0], newRule);
        });

        return rulesText;
    }

    private getNewRule(styleObject: CSSStyleSheet, rule: Array<string>) {
        const index = this.getIndexStyleClass(styleObject, rule[1]);
        const classBase: CSSStyleRule = <CSSStyleRule>(styleObject.rules[index]);
        let newRule = `${classBase.selectorText} {`;
        for (let className of this.getExtendClasses(rule[0])) {
            try {
                const classItem = this.getStyleClass(styleObject, className);
                newRule += [...classItem.matchAll(/{([^}]*)}/gmi)][0][1];
            } catch (e) {
                try {
                    const classItem = this.getStyleClassInAll(this.styles, className);
                    newRule += [...classItem.matchAll(/{([^}]*)}/gmi)][0][1];
                } catch (e) {
                }
            }
        }
        newRule += '}';

        return newRule;
    }

    private extendRulePrepare(): RegExp {
        const classRule = this.getClassRule();

        return new RegExp(`(${classRule}+)\\s*{\\s*(\\s*@extend\\s+${classRule}+\\s*;\\s*)+}`, 'gmi');
    }

    private getClassRule = (): string => '[\\.\\-_a-zA-Z0-9\\:\\(\\)\\+]';

    private getIndexStyleClass(style: CSSStyleSheet, className: string): number {
        const classes: CSSRuleList = this.getClasses(style);
        for (let x = 0; x < classes.length; x++) {
            const rule: any = <CSSStyleRule | CSSMediaRule>(classes[x]);
            if (!rule.selectorText) {
              //  console.log(x, rule);
                //skeep mediaquery
                continue;
            }
            const rulesList: Array<string> = rule.selectorText.split(",");
            for (let rule of rulesList) {
                if (rule.trim() === className) {
                    return x;
                }
            }
        }

        return -1;
    }

    private getExtendClasses(text: string): Array<string> {
        const classRule: string = this.getClassRule();
        const matches: IterableIterator<RegExpMatchArray> = text.matchAll(new RegExp(`@extend\\s*(${classRule}+)\\s*;`, 'gmi'));

        return [...matches].map(
            (item) => item[1]
        );
    }

    private getStyleClass(style: CSSStyleSheet, className: string) {
        const classes: CSSRuleList = this.getClasses(style);
        const index = this.getIndexStyleClass(style, className);
        const rule: CSSStyleRule = <CSSStyleRule>(classes[index]);
        if (index === -1) {
            throw "404 not found"
        }

        return rule.cssText ? rule.cssText : rule.style.cssText;
    }

    private getStyleClassInAll(styles: Array<CSSStyleSheet>, className: string) {
        let classItem: string = '';
        styles.forEach((style: CSSStyleSheet) => {
            try {
                classItem = this.getStyleClass(style, className);
            } catch (e) {
            }
        });

        return classItem;
    }

    private getClasses = (style: CSSStyleSheet): CSSRuleList => style.rules || style.cssRules;
}
