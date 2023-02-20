import {
    Application,
    DefaultTheme,
    DefaultThemeRenderContext,
    Options,
} from "typedoc";

export class OverrideThemeContext extends DefaultThemeRenderContext {
    constructor(theme: DefaultTheme, options: Options) {
        super(theme, options);

        const defaultContext = new DefaultThemeRenderContext(theme, options)

        this.secondaryNavigation = (props) => {
            return defaultContext.secondaryNavigation(props)
        }
    }
}

export class OverrideTheme extends DefaultTheme {
    private _contextCache?: OverrideThemeContext;

    override getRenderContext(): OverrideThemeContext {
        this._contextCache ||= new OverrideThemeContext(
            this,
            this.application.options
        );
        return this._contextCache;
    }
}

export function load(app: Application) {
    app.renderer.defineTheme("crosslab", OverrideTheme)
}