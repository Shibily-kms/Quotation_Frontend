import { Font } from '@react-pdf/renderer';

import AnekMalayalamLight from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Light.ttf'
import AnekMalayalamRegular from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Regular.ttf'
import AnekMalayalamBold from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Bold.ttf'


Font.register({
    family: ' AnekMalayalam',
    format: 'truetype',
    fonts: [
        { src:  AnekMalayalamLight, fontWeight: 300 },
        { src:  AnekMalayalamRegular, fontWeight: 400 },
        { src:  AnekMalayalamBold, fontWeight: 700 },

    ],
});
