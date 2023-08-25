import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "tableFilter",
  pure: false
})
export class TableFilterPipe implements PipeTransform {
  public transform(items: any[], fields: string[], value: string): any {
    if (!items || !fields || fields.length === 0 || !value) return items;

    let its = items.filter(f => {
      for (let c of fields) {
        // if (StringLib.inVns(value, String(f[c]))) return true;
      }

      return false;
    });

    return its;
  }
}
