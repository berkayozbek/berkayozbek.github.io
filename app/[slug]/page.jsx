import ConceptFilm from '../../components/concept-film';
import {Tree} from '../../components/experience';
import ns from '../../content/neurostreamx.json';
import rf from '../../content/rf-energy.json';
import nl from '../../content/neurolock.json';
import cochlear from '../../content/cochlear.json';
import publications from '../../content/publications.json';
import about from '../../content/about.json';
const pages={neurostreamx:ns,'rf-energy':rf,neurolock:nl,cochlear,publications,about};
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;return {title:{absolute:pages[slug].title}}}
export default async function Page({params}){const {slug}=await params;return slug==='neurostreamx'?<><Tree nodes={pages[slug].children.slice(0,1)}/><div className="container project-concept"><ConceptFilm/></div><Tree nodes={pages[slug].children.slice(1)}/></>:<Tree nodes={pages[slug].children}/>}
