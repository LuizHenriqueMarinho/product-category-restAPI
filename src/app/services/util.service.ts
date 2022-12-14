import { HttpParams } from "@angular/common/http";
import { PageParams } from "../products/model/page-params";

export class UtilService {

  static pageParamsHttpParams(pageParams: PageParams): HttpParams {
    let params = new HttpParams();
    params = params.append('page', pageParams.page);
    params = params.append('linesPerPage', pageParams.linesPerPage);
    params = params.append('oerderBy', pageParams.oerderBy);
    params = params.append('direction', pageParams.direction);


    return params;
  }
}
