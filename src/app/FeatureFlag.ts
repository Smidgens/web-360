
export class FeatureFlag {

	static isEnabled(t:FlagType):boolean {
		return Boolean(flagValues[t]);
	}
}

export const _initFlags = async () => {
	// maybe use this later for something (api?)
}

const flags = [
	""
] as const;

type FlagType = typeof flags[number];
type FlagValues = Record<FlagType,boolean>;

const DEFAULT_ENABLED:FlagType[] = [
];

const loadFlags = ():FlagValues => {
	const rawFlags = (process.env.REACT_APP_FLAGS || "").split(";");
	var r:any = {};
	flags.forEach(n => {
		if(rawFlags.includes(n)){ r[n] = true; }
		else if(r[n] == undefined){
			r[n] = DEFAULT_ENABLED.includes(n);
		}
	});
	return r;
};

const flagValues:FlagValues = loadFlags();