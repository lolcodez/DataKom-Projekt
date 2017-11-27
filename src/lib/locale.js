class Locale {
    constructor(language, territory, variant) {
        if ((language.includes("-") || language.includes("_"))
            && territory == null && variant == null)
        {
            let parts = language.split("_");
            
            language = parts[0];
            variant = parts[1];
            
            parts = language.split("-");
            
            language = parts[0];
            territory = parts[1];

            if (!language.match(/^[a-zA-Z]{2,3}$/)) {
                const defaultLocale = Locale.getDefaultLocale();
                this.language = defaultLocale.getLanguage();
                this.territory = defaultLocale.getTerritory();
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
            
            return;
        }
        
        if (!language) {
            this.language = "en";
            this.territory = "UK";
            this.variant = undefined;
        } else {
            if (!language.match(/^[a-zA-Z]{2,3}$/)) {
                const defaultLocale = Locale.getDefaultLocale();
                this.language = defaultLocale.getLanguage();
                this.territory = defaultLocale.getTerritory();
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
    
    toString() {
        return `${
            this.language
        }${
            this.territory ? `-${this.territory}` : ""
        }${
            this.variant ? `_${this.variant}` : ""
        }`;
    }
    
    static isDefaultLocaleSet() {
        return !!Locale.defaultLocale;
    }
    
    static getDefaultLocale() {
        if (!Locale.defaultLocale) {
            Locale.setDefaultLocale(new Locale("en", "UK"))
        }
        
        return Locale.defaultLocale;
    }
    
    static setDefaultLocale(locale) {
        Locale.defaultLocale = locale;
        
        document.cookie = `locale=${ locale.toString() }`;
    }
}

document.cookie.split(";").forEach(cookie => {
    if (cookie.startsWith("locale=")) {
        Locale.defaultLocale = new Locale(cookie.substr("locale=".length));
    }
});

export { Locale };