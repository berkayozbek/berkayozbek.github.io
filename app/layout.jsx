import '@fontsource-variable/manrope';
import './globals.css';
import './modern.css';
import { Shell } from '../components/experience';
export const metadata = { metadataBase: new URL('https://berkayozbek.github.io'), title: {default: 'Berkay Özbek — Integrated Circuits & Bioelectronics', template: '%s | Berkay Özbek'}, description: 'Low-power integrated circuits, wireless microsystems and secure neural interfaces. Research by Berkay Özbek, Imperial College London.' };
export default function Layout({children}) { return <html lang="en"><body><Shell>{children}</Shell></body></html> }
