import { Font } from '@react-pdf/renderer';

// import AnekMalayalamLight from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Light.ttf'
// import AnekMalayalamRegular from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Regular.ttf'
// import AnekMalayalamBold from '../../../assets/fonts/AnekMalayalam_SemiCondensed-Bold.ttf'


import ArimaMalayalamThin from '../../../assets/fonts/Arima-Thin.ttf'
import ArimaMalayalamExtraLight from '../../../assets/fonts/Arima-ExtraLight.ttf'
import ArimaMalayalamLight from '../../../assets/fonts/Arima-Light.ttf'
import ArimaMalayalamRegular from '../../../assets/fonts/Arima-Regular.ttf'
import ArimaMalayalamMedium from '../../../assets/fonts/Arima-Medium.ttf'
import ArimaMalayalamSemiBold from '../../../assets/fonts/Arima-SemiBold.ttf'
import ArimaMalayalamBold from '../../../assets/fonts/Arima-Bold.ttf'


Font.register({
    family: ' ArimaMalayalam',
    format: 'truetype',
    fonts: [
        { src: ArimaMalayalamThin, fontWeight: 100 },
        { src: ArimaMalayalamExtraLight, fontWeight: 200 },
        { src: ArimaMalayalamLight, fontWeight: 300 },
        { src: ArimaMalayalamRegular, fontWeight: 400 },
        { src: ArimaMalayalamMedium, fontWeight: 500 },
        { src: ArimaMalayalamSemiBold, fontWeight: 600 },
        { src: ArimaMalayalamBold, fontWeight: 700 },
    ],
});
