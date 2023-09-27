import { Font } from '@react-pdf/renderer';
import RobotoLight from '../../../assets/fonts/RobotoCondensed-Light.ttf'
import RobotoRegular from '../../../assets/fonts/RobotoCondensed-Regular.ttf'
import RobotoBold from '../../../assets/fonts/RobotoCondensed-Bold.ttf'

import NotoSerifLight from '../../../assets/fonts/NotoSerifMalayalam-Light.ttf'
import NotoSerifRegular from '../../../assets/fonts/NotoSerifMalayalam-Regular.ttf'
import NotoSerifBold from '../../../assets/fonts/NotoSerifMalayalam-Bold.ttf'


Font.register({
    family: 'NotoSerif',
    format: 'truetype',
    fonts: [
        { src: NotoSerifLight, fontWeight: 300 },
        { src: NotoSerifRegular, fontWeight: 400 },
        { src: NotoSerifBold, fontWeight: 700 },

    ],
});
