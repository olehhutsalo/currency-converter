import { configure } from 'enzyme';
import { PixelRatio } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';

PixelRatio.roundToNearestPixel = (value) => value;
configure({ adapter: new Adapter() })

// ensures that the test occurs with prod config
global.__DEV__ = false;
// global.requestAnimationFrame = callback => setTimeout(callback, 0);

global.createCombinations = (a) => {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got.reduce((agg, item) => ({ ...agg, ...item }), {});
      }
      return;
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
  };
  const all = [];
  for (let i = 1; i < a.length; i++) {
    fn(i, a, [], all);
  }

  all.push(a.reduce((agg, item) => ({ ...agg, ...item }), {}));
  return all;
};
