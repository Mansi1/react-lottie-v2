import {mkdirSync, readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";
import {render} from "mustache";

interface IconMustacheViewData {
    className: string;
}

interface IconAllMustacheViewData {
    imports: Array<string>;
    icons: Array<string>
}

export const iife = (fun: () => unknown) => {
    fun()
}

export const renderIcon = (viewData: IconMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-template.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}

export const renderAllIcon = (viewData: IconAllMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-all.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}

const ASSETS_PATH = join(__dirname, '..', 'assets');
const ICONS_PATH = join(__dirname, '..', 'src', 'icons');

mkdirSync(ASSETS_PATH, {recursive: true});
mkdirSync(ICONS_PATH, {recursive: true});

iife(async () => {
   const icons =  readdirSync(ASSETS_PATH)
       .filter(f => f.endsWith('.json'))
       .map(fileName => {
           const partsWithEnding = fileName.split('.');
           partsWithEnding.pop();
           const [order, ...name] = partsWithEnding.join('').split('-');

           return {
               fileName,
               path: join(ASSETS_PATH, fileName),
               order: parseInt(order),
               className: name.map(v => v.substring(0,1).toUpperCase()+ v.substring(1)).join('')
           }
       })
       .map(f => {
           const json = readFileSync(f.path).toString('utf-8');
           writeFileSync(join(ICONS_PATH, `${f.className}.json`),json);
           writeFileSync(join(ICONS_PATH, `${f.className}.tsx`),renderIcon({className: f.className}))
             return {
                   import: `import { ${f.className} } from \'./${f.className}\';`,
                   icon: `<${f.className} height={50} width={50}/>`
               };
       });

    writeFileSync(join(ICONS_PATH, `AllIcons.tsx`),renderAllIcon({
        imports: icons.map(i => i.import),
        icons: icons.map(i => i.icon)
    }));
   console.log(icons)
});
