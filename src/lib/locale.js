class Locale {
    constructor(language, territory, variant) {
        if (!language) {
            this.language = "en";
            this.territory = "uk";
            this.variant = undefined;
        } else {
            if (!language.match(/^[a-zA-Z]{2,3}$/)) {
                const defaultLocale = Locale.getDefaultLocale();
                this.language = defaultLocale.getLanguage();
                this.territory = defaultLocale.geTerritory();
                this.variant = defaultLocale.getVariant();
                return;
            }
            if (territory) {
                if (!territory.match(/^[a-zA-Z]{2}$/)) {
                    const defaultLocale = Locale.getDefaultLocale();
                    this.language = defaultLocale.getLanguage();
                    this.territory = defaultLocale.getTerritory();
                    this.variant = defaultLocale.getVariant();
                    return;
                }
            }
            
            this.language = language;
            this.territory = territory;
            this.variant = variant;
        }
    }
    
    getLanguage() {
        return this.language;
    }

    getTerritory() {
        return this.territory;
    }
    
    getVariant() {
        return this.variant;
    }
    
    getLanguageDisplayName() {
        return this.language;
    }
    
    getTerritoryDisplayName() {
        return this.territory;
    }
    
    static getDefaultLocale() {
        return new Locale("en", "UK");
    }
}

export { Locale };