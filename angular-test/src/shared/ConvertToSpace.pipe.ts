import { stringify } from "@angular/compiler/src/util";
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: 'convertToSpace'
})
export class ConvertToSpacePipe implements PipeTransform {

  transform(value:string, character: string): string {
    return value.replace(character, ' ');
  }
  
}