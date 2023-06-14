import { Font } from '@react-pdf/renderer';
import RobotoLight from '../../../assets/fonts/RobotoCondensed-Light.ttf'
import RobotoRegular from '../../../assets/fonts/RobotoCondensed-Regular.ttf'
import RobotoBold from '../../../assets/fonts/RobotoCondensed-Bold.ttf'


Font.register({
    family: 'Roboto',
    fonts: [
        { src: RobotoLight, fontWeight: 300 },
        { src: RobotoRegular, fontWeight: 400 },
        { src: RobotoBold, fontWeight: 700 },

    ],
});
