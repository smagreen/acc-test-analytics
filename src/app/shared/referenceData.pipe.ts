import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'refDataPipe'
})
export class ReferenceDataPipe implements PipeTransform {
    transform(key: string, refData: {key: string, value: string}[]): any {
        const filter = refData.find(r => r.key === key);
        return filter ? filter.value : 'Invalid Key';
    }
}
