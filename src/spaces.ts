const requireSpace = require.context(
  '@bonustrack/snapshot-spaces/spaces/',
  true,
  /[\w-]+\.json$/
);
const requireSkin = require.context(
  '@bonustrack/snapshot-spaces/spaces/',
  true,
  /[\w-]+\.scss$/
);

requireSkin.keys().map(file => requireSkin(file));

type Space = {
  key: string;
  symbol: string;
  name: string;
  defaultView: string;
  address: string;
  token: string;
  core: string[];
  min: number;
  invalid: any;
  showOnlyCore: boolean;
  strategies: any[];
};

export default Object.fromEntries(
  requireSpace
    .keys()
    .filter(
      file =>
        !['./domains.json', './homepage.json', './example/index.json'].includes(
          file
        )
    )
    .map(file => {
      const space = requireSpace(file);

      return [space.key, space];
    })
) as Record<string, Space>;
